import CoverLayout from '@/components/layouts/CoverLayout';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/system';
import SoftTypography from "common-lib/components/SoftTypography";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const HomePage = () => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <CoverLayout>
            <Box bgcolor='success.main' height="100%" mt={0.5} lineHeight={1}>
                <SoftTypography theme={theme} variant="h1" color="text" fontWeight="medium">
                    Home Page
                </SoftTypography>
                <h1>{t("helloWorld")}</h1>
            </Box>
        </CoverLayout>
    )
}

export async function getStaticProps(context) {
    // extract the locale identifier from the URL
    const { locale } = context

    return {
        props: {
            // pass the translation props to the page component
            ...(await serverSideTranslations(locale)),
        },
    }
}

export default HomePage;
