import EntitiesDataGrid from "@/components/EntitiesDataGrid";
import { EntityTypeEnum } from "@/models/categories.model";
import { Add } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from '@mui/material';
import { debounce } from '@mui/material/utils';
import { useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import ShowIf from 'shared/components/ShowIf';
import { useDashboardStore } from "shared/stores/DashboardStore";

const ExperiencesList = () => {
    const [store, dispatch] = useDashboardStore();

    const hasUserEntities = useMemo(() => store.user?.experiences?.length > 0, [store.user]);
    const dataGridRef = useRef();
    const searchTerm = useMemo(() => dataGridRef.current?.searchTerm, [dataGridRef.current]);
    const handleSearchChange = (value) => {
        dataGridRef.current.handleSearchChange(value);
    };

    const debouncedSetFilterModel = useCallback(
        debounce((value) => {
            let filterItems = [];
            filterItems.push({ field: 'title', operator: 'contains', value: value });
            filterItems.push({ field: 'companyName', operator: 'contains', value: value });
            dataGridRef.current.setFilterModel({ items: filterItems });
        }, 500), []);

    return (
        <>
            <Box className="w-full flex flex-row justify-between items-center mb-10 mt-5">
                <Typography variant='h1' fontWeight={theme => theme.typography.fontWeightBold} className={`!text-4xl ${hasUserEntities && "!my-4"}`} >Experiences List</Typography>

                <ShowIf condition={hasUserEntities}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(event) => handleSearchChange(event.target.value)}
                    />
                </ShowIf>
            </Box>

            <ShowIf condition={!hasUserEntities}>
                <Box className="w-full flex-auto mt-10 bg-white rounded-md">
                    <Box className="w-full h-full p-4 flex flex-col justify-center items-center text-center">
                        <img src={`${process.env.REACT_APP_DASHBOARD_URL}/images/no-projects.png`} width={350} height="auto" alt='No Experience Found' />
                        <Typography variant='h2' fontWeight={theme => theme.typography.fontWeightBold} className="!text-2xl !my-4" >Create your first Experience</Typography>
                        <Typography variant='body1' className="" >Fortunately, it's easy to create a new one.</Typography>
                        <Button variant="contained" color="primary" className="!mt-4" startIcon={<Add />} LinkComponent={Link} to="/dashboard/experiences/new" >New Experience</Button>
                    </Box>
                </Box>
            </ShowIf>

            <ShowIf condition={hasUserEntities}>
                <EntitiesDataGrid
                    ref={dataGridRef}
                    entitiesType={EntityTypeEnum.EXPERIENCES}
                    debouncedSetFilterModel={debouncedSetFilterModel}
                />
            </ShowIf>
        </>
    );
};

export default ExperiencesList;