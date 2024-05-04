import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

const EducationsList = () => {
    return (
        <>
            <Typography variant='h1' fontWeight={theme => theme.typography.fontWeightBold} className="!text-4xl !my-4" >Educations List</Typography>

            <Box className="w-full flex-auto mt-10 bg-white rounded-md">
                <Box className="w-full h-full p-4 flex flex-col justify-center items-center text-center">
                    <img src={`${process.env.REACT_APP_DASHBOARD_URL}/images/no-projects.png`} width={350} height="auto" alt="No Educations Found" />
                    <Typography variant='h2' fontWeight={theme => theme.typography.fontWeightBold} className="!text-2xl !my-4" >Create your first education</Typography>
                    <Typography variant='body1' className="" >Fortunately, it's easy to create a new one.</Typography> 
                    <Button variant="contained" color="primary" className="!mt-4" startIcon={<Add /> }>New Education</Button>
                </Box>
            </Box>
        </>
    );
};

export default EducationsList;