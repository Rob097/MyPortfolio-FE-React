import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const PageNotFound = () => {
    const { t } = useTranslation('dashboard');

    return (
        <Box className="h-full w-full flex flex-col md:flex-row items-center justify-center">
            <Box className="w-full flex justify-center items-center h-[40vh] md:h-auto">
                <img src={`${process.env.REACT_APP_DASHBOARD_URL}/images/404.svg`} className="w-full h-full object-contain md:h-auto md:max-h-[80vh]" alt={t('error-pages.404.title')} />
            </Box>
            <Box className="w-full flex flex-col justify-center items-center md:items-start text-center md:text-left p-4 space-y-4">
                <Typography variant="h1" className="!text-9xl !font-black !mb-10">404</Typography>
                <Typography variant="h2" className="!text-3xl !text-semibold">{t('error-pages.404.title')}</Typography>
                <Typography variant="h4">{t('error-pages.404.description')}</Typography>
                <Button component={Link} to="/" variant="contained" color="primary">{t('error-pages.404.button')}</Button>
            </Box>
        </Box>
    );
}

export default PageNotFound;