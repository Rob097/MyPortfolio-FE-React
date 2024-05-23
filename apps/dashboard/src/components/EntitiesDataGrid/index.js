import { EntityTypeEnum } from "@/models/categories.model";
import { EntitiesStatus } from "@/models/enums";
import { EntityService } from "@/services/entity.service";
import { DATE_TO_DISPLAY_FORMAT_EN, DATE_TO_DISPLAY_FORMAT_IT } from '@/utilities';
import { Add, Delete, DesignServices, Edit, Public } from '@mui/icons-material';
import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';
import { Box, Button, Chip, Divider, Fab, Tooltip, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { DataGrid, GridActionsCellItem, getGridDateOperators, getGridNumericOperators, getGridSingleSelectOperators, getGridStringOperators } from '@mui/x-data-grid';
import { itIT } from '@mui/x-data-grid/locales';
import moment from 'moment';
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { trackPromise } from "react-promise-tracker";
import { Link, useNavigate } from 'react-router-dom';
import { useDashboardStore } from "shared/stores/DashboardStore";
import { Criteria, Operation, Sort, View } from "shared/utilities/criteria";

const EntitiesDataGrid = forwardRef((props, ref) => {
    const { t, i18n } = useTranslation("dashboard");
    const [store, dispatch] = useDashboardStore();
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const entitiesType = props.entitiesType;
    const [entities, setEntities] = useState([]);
    const [totalNumberOfEntities, setTotalNumberOfEntities] = useState(0);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lastPage, setLastPage] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [filterModel, setFilterModel] = useState({ items: [] });
    const [sortModel, setSortModel] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const dateFormat = useMemo(() => i18n.language === 'it' ? DATE_TO_DISPLAY_FORMAT_IT : DATE_TO_DISPLAY_FORMAT_EN, [i18n.language]);
    const gridLanguage = useMemo(() => i18n.language === 'it' ? itIT.components.MuiDataGrid.defaultProps.localeText : null, [i18n.language]);


    /////////////////////
    ////  FUNCTIONS  ////
    /////////////////////

    useImperativeHandle(ref, () => ({
        handleSearchChange,
        setFilterModel
    }));

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        props.debouncedSetFilterModel(value);
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleStatusChange = (entity) => {
        setIsLoading(true);
        entity.status = entity.status === EntitiesStatus.PUBLISHED ? EntitiesStatus.DRAFT : EntitiesStatus.PUBLISHED;
        EntityService.update(entitiesType, entity).then((response) => {
            console.debug(response);
        }).catch((error) => {
            console.error(error);
            entity.status = entity.status === EntitiesStatus.PUBLISHED ? EntitiesStatus.DRAFT : EntitiesStatus.PUBLISHED;
        }).finally(() => setIsLoading(false));
    };

    const handleDelete = (entity) => {
        setIsLoading(true);
        EntityService.delete(entitiesType, entity.id).then(() => {
            setEntities(entities.filter(p => p.id !== entity.id));
        }).catch((error) => {
            console.error(error);
        }).finally(() => setIsLoading(false));
    };

    const stringFilterOperators = getGridStringOperators().filter(({ value }) =>
        ['equals', 'contains'].includes(value)
    );
    const numericFilterOperators = getGridNumericOperators().filter(({ value }) =>
        ['!=', '=', '>', '<'].includes(value)
    );
    const dateFilterOperators = getGridDateOperators().filter(({ value }) =>
        ['is', 'after', 'before'].includes(value)
    );
    const statusFilterOperators = getGridSingleSelectOperators().filter(({ value }) =>
        ['is', 'not'].includes(value)
    );

    const columns = [
        {
            field: entitiesType === EntityTypeEnum.PROJECTS || entitiesType === EntityTypeEnum.EXPERIENCES ? 'title' : 'field',
            headerName: entitiesType === EntityTypeEnum.PROJECTS || entitiesType === EntityTypeEnum.EXPERIENCES ? t('entities.list.datagrid.columns.title') : t('entities.list.datagrid.columns.field'),
            type: 'string',
            flex: 1,
            filterable: true,
            filterOperators: stringFilterOperators,
            minWidth: 300,
            renderCell: (params) => (
                <Tooltip title={params.value} placement='top' arrow>
                    <Link
                        to={`/dashboard/${entitiesType}/${params.row.slug}`}
                        className="!text-primary-main font-semibold"
                    >
                        {params.value}
                    </Link>
                </Tooltip>
            )
        },
        {
            field: 'fromDate',
            headerName: t('entities.list.datagrid.columns.from-date'),
            type: 'date',
            flex: 1,
            filterable: true,
            filterOperators: dateFilterOperators,
            minWidth: 175,
            valueGetter: (params) => new Date(params),
            renderCell: (params) => (
                params?.value ? moment(params.value).format(dateFormat) : null
            )
        },
        {
            field: 'toDate',
            headerName: t('entities.list.datagrid.columns.to-date'),
            type: 'date',
            flex: 1,
            filterable: true,
            filterOperators: dateFilterOperators,
            minWidth: 175,
            valueGetter: (params) => params ? new Date(params) : undefined,
            renderCell: (params) => (
                params?.value ? moment(params.value).format(dateFormat) : t('labels.present')
            )
        },
        {
            field: 'stories',
            headerName: t('entities.list.datagrid.columns.stories'),
            type: 'number',
            flex: 1,
            filterable: true,
            filterOperators: numericFilterOperators,
            align: 'center',
            headerAlign: 'center',
            minWidth: 100,
            valueGetter: (params) => params?.length,
            renderCell: (params) => (
                <Typography variant='body2' className="flex h-full justify-center items-center !text-info-main" >{params.value}</Typography>
            )
        },
        {
            field: 'status',
            headerName: t('entities.list.datagrid.columns.status'),
            type: 'singleSelect',
            flex: 1,
            filterable: true,
            valueOptions: [...Object.values(EntitiesStatus)]?.map((status) => ({ value: status, label: status })),
            filterOperators: statusFilterOperators,
            minWidth: 100,
            renderCell: (params) => (
                <Chip
                    icon={<TripOriginRoundedIcon fontSize="small" className={params.value === EntitiesStatus.PUBLISHED ? 'text-success-main' : 'text-gray-400'} />}
                    label={t(`labels.status.${params.value.toLowerCase()}`)}
                    variant="outlined"
                    color={params.value === EntitiesStatus.PUBLISHED ? 'success' : 'default'}
                    sx={{ borderWidth: { xs: 0, md: 1 } }}
                    classes={{
                        label: 'hidden md:block'
                    }}
                />
            )
        },
        {
            field: 'actions',
            headerName: t('entities.list.datagrid.columns.actions'),
            type: 'actions',
            flex: 1,
            filterable: false,
            minWidth: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={params.row.status === EntitiesStatus.PUBLISHED ? <DesignServices color="gray" /> : <Public color="success" />}
                    label={params.row.status === EntitiesStatus.PUBLISHED ? t('labels.status.set-as', { status: t('labels.status.draft') }) : t('labels.status.set-as', { status: t('labels.status.published') })}
                    color={params.row.status === EntitiesStatus.PUBLISHED ? 'gray' : 'success'}
                    showInMenu
                    onClick={() => handleStatusChange(params.row)}
                />,
                <GridActionsCellItem
                    icon={<Edit color="primary" />}
                    label={t('labels.edit')}
                    color="primary"
                    showInMenu
                    onClick={() => navigate(`/dashboard/${entitiesType}/${params.row.slug}`)}
                />,
                <GridActionsCellItem
                    label=""
                    disabled
                    component={Divider}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<Delete color="error" />}
                    label={t('labels.delete')}
                    color="error"
                    showInMenu
                    onClick={() => {
                        setSelectedEntity(params.row);
                        handleDialogOpen();
                    }}
                />,
            ],
        },
    ];

    if (entitiesType === EntityTypeEnum.EDUCATIONS) {
        const schoolCol = {
            field: 'school',
            headerName: t('entities.list.datagrid.columns.school'),
            type: 'string',
            flex: 1,
            filterable: true,
            filterOperators: stringFilterOperators,
            minWidth: 200
        };

        // push the schoolCol in the columns array in the second position:
        columns.splice(1, 0, schoolCol);
    }

    if (entitiesType === EntityTypeEnum.EXPERIENCES) {
        const companyCol = {
            field: 'companyName',
            headerName: t('entities.list.datagrid.columns.company'),
            type: 'string',
            flex: 1,
            filterable: true,
            filterOperators: stringFilterOperators,
            minWidth: 200
        };

        // push the companyCol in the columns array in the second position:
        columns.splice(1, 0, companyCol);
    }

    useEffect(() => {
        const sortBy = sortModel && sortModel.length > 0 ? new Sort(sortModel[0]?.field, sortModel[0]?.sort.toUpperCase()) : null;
        let criterias = [];
        if (filterModel.items && filterModel.items.length > 0) {
            for (let filter of filterModel.items) {
                if (!filter.operator || !filter.field || !filter.value) continue;
                let operation;
                switch (filter.operator) {

                    // Equals
                    case "contains":
                    case "equals":
                    case "is":
                    case "=":
                    default:
                        operation = Operation.equals;
                        break;

                    // Not Equals
                    case "!=":
                        operation = Operation.notEquals;
                        break;

                    // Greater Than
                    case ">":
                    case "after":
                        operation = Operation.greaterThan;
                        break;

                    // Less Than
                    case "<":
                    case "before":
                        operation = Operation.lessThan;
                        break;

                }

                let value;
                if (filter.field === 'title' || filter.field === 'companyName' || filter.field === 'school' || filter.field === 'field') {
                    value = filter.operator === "contains" ? "*" + filter.value?.replace(" ", "*") + "*" : filter.value;
                } else if (filter.field === 'fromDate' || filter.field === 'toDate') {
                    value = moment(filter.value).format(DATE_TO_DISPLAY_FORMAT_IT);
                } else {
                    value = filter.value;
                }

                criterias.push(new Criteria(filter.field, operation, value));

            };
        }
        if (!criterias || criterias.length <= 0) {
            criterias = null;
        }
        const filtersClass = EntityTypeEnum.getFilters(entitiesType);
        const filters = new filtersClass(criterias, View.verbose, paginationModel.page, paginationModel.pageSize, sortBy);

        const fetchEntities = () => EntityService.getByCriteria(entitiesType, filters, true).then((response) => {
            setEntities([...response.content]);
            setLastPage(response.headers['is-last'] === 'true');
            setTotalNumberOfEntities(parseInt(response.headers['number']));
        }).catch((error) => {
            console.error(error);
        }).finally(() => setIsLoading(false));

        setIsLoading(true);

        if (isFirstRender.current) {
            trackPromise(fetchEntities());
            isFirstRender.current = false;
        } else {
            fetchEntities();
        }

    }, [paginationModel, sortModel, filterModel]);

    return (
        <>
            <div className="flex w-full overflow-x-auto overflow-y-hidden">
                {/* max height is header (56) + 10 elements (52) plus the footer (52) */}
                <div style={{ maxHeight: '628px', width: '100%', minWidth: '800px' }}>
                    <DataGrid
                        autoHeight={entities?.length < 10}
                        rows={entities}
                        columns={columns}
                        rowCount={totalNumberOfEntities}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        pageSizeOptions={[2, 5, 10, 25]}
                        pagination
                        sortingMode="server"
                        filterMode="server"
                        paginationMode="server"
                        onPaginationModelChange={setPaginationModel}
                        onSortModelChange={setSortModel}
                        onFilterModelChange={setFilterModel}
                        slots={{
                            loadingOverlay: LinearProgress,
                            noRowsOverlay: CustomNoRowsOverlay
                        }}
                        slotProps={{
                            noRowsOverlay: { entitiesType: entitiesType }
                        }}
                        filterDebounceMs={500}
                        loading={isLoading}
                        getRowClassName={(params) =>
                            `striped-row-${params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}`
                        }
                        classes={{
                            footerContainer: 'bg-white'
                        }}
                        localeText={gridLanguage}
                    />
                </div>
            </div>

            <Dialog
                open={openDialog}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`${t('labels.delete')} ${EntityTypeEnum.getLabel(entitiesType, false, true, t)}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t(`labels.check-delete-${entitiesType === EntityTypeEnum.PROJECTS ? '1' : '2'}`, { item: EntityTypeEnum.getLabel(entitiesType, false, true, t) })}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        {t('labels.cancel')}
                    </Button>
                    <Button onClick={() => { handleDelete(selectedEntity); handleDialogClose(); }} color="primary" autoFocus>
                        {t('labels.delete')}
                    </Button>
                </DialogActions>
            </Dialog>

            <Tooltip title={t(`entities.list.add-new-${entitiesType}`)} placement='top' arrow>
                <span className='fixed bottom-6 right-6' style={{ zIndex: 9 }}>
                    <Link to={`/dashboard/${entitiesType}/new`}>
                        <Fab color="primary" aria-label="create" >
                            <Add className='text-white' />
                        </Fab>
                    </Link>
                </span>
            </Tooltip>
        </>
    );

});

export default EntitiesDataGrid;

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
        fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
    },
}));

function CustomNoRowsOverlay({ entitiesType }) {
    const { t } = useTranslation("dashboard");

    const translationType = useMemo(() => entitiesType === EntityTypeEnum.PROJECTS ? '1' : '2', [entitiesType]);

    return (
        <StyledGridOverlay>
            <svg
                width="120"
                height="100"
                viewBox="0 0 184 152"
                aria-hidden
                focusable="false"
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(24 31.67)">
                        <ellipse
                            className="ant-empty-img-5"
                            cx="67.797"
                            cy="106.89"
                            rx="67.797"
                            ry="12.668"
                        />
                        <path
                            className="ant-empty-img-1"
                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                            className="ant-empty-img-2"
                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                            className="ant-empty-img-3"
                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                    </g>
                    <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                    />
                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                    </g>
                </g>
            </svg>
            <Box sx={{ mt: 1 }}>{t(`entities.list.no-results-${translationType}.empty-get`, { entity: entitiesType })}</Box>
        </StyledGridOverlay>
    );
}