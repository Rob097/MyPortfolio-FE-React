import SoftTypography from '@/components/SoftTypography';
import HeroSection from "@/components/sections/HeroSection";
import MicroHighlightSection, { SingleElement } from '@/components/sections/MicroHighlightSection';
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const UserHome = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const greaterThanXl = useMediaQuery(theme.breakpoints.up("xl"));

    return (
        <>
            <HeroSection img="https://dora-react.vercel.app/images/hero-person-img.png" buttons={[{ label: "Download CV" }, { label: "Contact Me" }]}>
                <SoftTypography variant="h3" color="primary" fontWeight="bold">{t("whoamI")}</SoftTypography>
                <SoftTypography variant="h1" color="dark" fontWeight="bold" gutterBottom sx={{ width: greaterThanXl ? '120%' : 'fit-content' }}>Roberto Dellantonio</SoftTypography>
                <SoftTypography variant="h5" color="dark" fontWeight="bold" gutterBottom>Software Engineer</SoftTypography>
                <SoftTypography variant="subtitle1" color="text" gutterBottom>Shot what able cold new the see hold. Friendly as an betrayed formerly he. Morning because as to society behaved moments.</SoftTypography>
            </HeroSection>

            <MicroHighlightSection moveUp>
                <SingleElement avatar="1" title="Java" caption="Back-end development" />
                <SingleElement avatar="2" title="React" caption="Front-end development" />
                <SingleElement avatar="3" title="Docker" caption="Devops management" />
            </MicroHighlightSection>

            <Box id='next-section' component='section'>
                <Box height={"20vh"}></Box>
            </Box>
        </>
    );
}

export async function getStaticPaths(context) {
    const { locales } = context;
    let paths = [];
    for (const locale of locales) {
        paths.push(
            {
                params: {
                    userId: 'user1'
                },
                locale
            }
        );
        paths.push(
            {
                params: {
                    userId: 'user2'
                },
                locale
            }
        );
    }
    return {
        fallback: false,
        paths
    }
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

export default UserHome;