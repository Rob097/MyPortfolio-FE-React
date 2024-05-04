import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ProjectService } from "@/services/project.service";
import { useState, useEffect } from "react";
import { ProjectQ } from "@/models/project.model";
const { View } = require('shared/utilities/criteria');


const ProjectsList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const filters = new ProjectQ(null, View.verbose, 0, 10, null);
        ProjectService.getByCriteria(filters).then((response) => {
            console.log(response);
            setProjects(response.content);
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <>
            <Typography variant='h1' fontWeight={theme => theme.typography.fontWeightBold} className="!text-4xl !my-4" >Projects List</Typography>
            {/* Temporary buttons -- START */}
            <p>Temporary buttons -- START</p>
            <Box className="w-full flex justify-start items-start gap-2">
                <Link to="/dashboard/projects/new" className="!text-white">
                    <Button variant="contained" color="primary" startIcon={<Add />}>New Project</Button>
                </Link>
                <Link to="/dashboard/projects/quarto-progetto" className="!text-white">
                    <Button variant="contained" color="primary" startIcon={<Add />}>Edit Project</Button>
                </Link>
            </Box>
            <p>Projects size: {projects?.length}</p>
            <p>Temporary buttons -- END</p>
            {/* Temporary buttons -- END */}

            <Box className="w-full flex-auto mt-10 bg-white rounded-md">
                <Box className="w-full h-full p-4 flex flex-col justify-center items-center text-center">
                    <img src={`${process.env.REACT_APP_DASHBOARD_URL}/images/no-projects.png`} width={350} height="auto" alt="No Projects Found" />
                    <Typography variant='h2' fontWeight={theme => theme.typography.fontWeightBold} className="!text-2xl !my-4" >Create your first project</Typography>
                    <Typography variant='body1' className="" >Fortunately, it's easy to create a new one.</Typography>
                    <Button variant="contained" color="primary" className="!mt-4" startIcon={<Add />}>New Project</Button>
                </Box>
            </Box>
        </>
    );
};

export default ProjectsList;