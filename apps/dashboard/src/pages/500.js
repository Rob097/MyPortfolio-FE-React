import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ServerErrorPage = () => (
    <Box className="h-full w-full flex flex-col md:flex-row items-center justify-center">
        <Box className="w-full flex justify-center items-center h-[40vh] md:h-auto">
            <img src={`${process.env.REACT_APP_DASHBOARD_URL}/images/500.svg`} className="w-full h-full object-contain md:h-auto md:max-h-[80vh]" alt="Page Not Found" />
        </Box>
        <Box className="w-full flex flex-col justify-center items-center md:items-start text-center md:text-left p-4 space-y-4">
            <Typography variant="h1" className="!text-9xl !font-black !mb-10">500</Typography>
            <Typography variant="h2" className="!text-3xl !text-semibold">Internal Server Error</Typography>
            <Typography variant="h4">Ouch, it looks like something went wrong</Typography>
            <Button component={Link} to="/" variant="contained" color="primary">Go back home</Button>
        </Box>
    </Box>
);

export default ServerErrorPage;