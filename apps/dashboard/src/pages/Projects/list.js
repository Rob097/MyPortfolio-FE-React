import EntitiesDataGrid from "@/components/EntitiesDataGrid";
import { EntityTypeEnum } from "@/models/categories.model";
import { Add } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from '@mui/material';
import { debounce } from '@mui/material/utils';
import { useCallback, useMemo, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import ShowIf from 'shared/components/ShowIf';
import { useDashboardStore } from "shared/stores/DashboardStore";

const ProjectsList = () => {
    const { t, i18n } = useTranslation("dashboard");
    const [store, dispatch] = useDashboardStore();

    const hasUserEntities = useMemo(() => store.user?.projects?.length > 0, [store.user]);
    const dataGridRef = useRef();
    const searchTerm = useMemo(() => dataGridRef.current?.searchTerm, [dataGridRef.current]);
    const handleSearchChange = (value) => {
        dataGridRef.current.handleSearchChange(value);
    };

    const debouncedSetFilterModel = useCallback(
        debounce((value) => {
            let filterItems = [];
            filterItems.push({ field: 'title', operator: 'contains', value: value });
            dataGridRef.current.setFilterModel({ items: filterItems });
        }, 500), []);

    return (
        <>
            <Box className="w-full flex flex-row justify-between items-center mb-10 mt-5">
                <Typography variant='h1' fontWeight={theme => theme.typography.fontWeightBold} className={`!text-4xl ${hasUserEntities && "!my-4"}`} >{t('entities.list.title', { entity: t('labels.projects') })}</Typography>

                <ShowIf condition={hasUserEntities}>
                    <TextField
                        label={t('labels.search')}
                        variant="outlined"
                        value={searchTerm}
                        onChange={(event) => handleSearchChange(event.target.value)}
                    />
                </ShowIf>
            </Box>

            <ShowIf condition={!hasUserEntities}>
                <Box className="w-full flex-auto mt-10 bg-white rounded-md">
                    <Box className="w-full h-full p-4 flex flex-col justify-center items-center text-center">
                        <img src={`${process.env.REACT_APP_DASHBOARD_URL}/images/no-projects.png`} width={350} height="auto" alt={t('entities.list.no-results-1.title', { entity: t('labels.projects') })} />
                        <Typography variant='h2' fontWeight={theme => theme.typography.fontWeightBold} className="!text-2xl !my-4" >{t('entities.list.no-results-1.create-first', { entity: t('labels.project') })}</Typography>
                        <Typography variant='body1' className="" >{t('entities.list.no-results-1.description')}</Typography>
                        <Button variant="contained" color="primary" className="!mt-4" startIcon={<Add />} LinkComponent={Link} to="/dashboard/projects/new" >{t('entities.list.add-new-projects')}</Button>
                    </Box>
                </Box>
            </ShowIf>

            <ShowIf condition={hasUserEntities}>
                <EntitiesDataGrid
                    ref={dataGridRef}
                    entitiesType={EntityTypeEnum.PROJECTS}
                    debouncedSetFilterModel={debouncedSetFilterModel}
                />
            </ShowIf>
        </>
    );
};

export default ProjectsList;