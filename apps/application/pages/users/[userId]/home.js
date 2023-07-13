import SoftButton from '@/components/SoftButton';
import SoftTypography from '@/components/SoftTypography';
import { Box, Container, Grid } from '@mui/material';
import { useTheme } from '@mui/system';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const UserHome = (props) => {
    const router = useRouter();
    const theme = useTheme();

    return (
        <>
            <Box id='hero-section' component='section' bgcolor="#fdf8f7">
                <Container>
                    <Grid container columnSpacing={10} justifyContent="center">
                        <Grid item sm={6} alignSelf="center">
                            <SoftTypography variant="h3" color="primary" fontWeight="bold">Hi, I'm</SoftTypography>
                            <SoftTypography variant="h1" color="dark" fontWeight="bold" gutterBottom>Mary Hardy</SoftTypography>
                            <SoftTypography variant="h5" color="dark" fontWeight="bold" gutterBottom>Digital Marketing Expert</SoftTypography>
                            <SoftTypography variant="subtitle1" color="text" gutterBottom>Shot what able cold new the see hold. Friendly as an betrayed formerly he. Morning because as to society behaved moments</SoftTypography>
                            <SoftButton variant="contained" color="dark" size="medium" sx={{ borderRadius: '50px' }}>Download CV</SoftButton>
                        </Grid>
                        <Grid item sm={6} alignSelf="center">
                            <img src="https://dora-react.vercel.app/images/hero-person-img.png" />
                        </Grid>
                    </Grid>
                </Container>
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