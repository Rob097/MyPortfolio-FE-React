import { Container, Box, Grid, Typography, Button } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from './styles/container165.module.css'
import tailwindConfig from '@/tailwind.config';

const MyHome = () => {

    const theme = tailwindConfig.theme;

    return (
        <Box className="w-full flex justify-center items-center relative">

            <Box className="w-full mt-10 mb-20 z-10" style={{ maxWidth: '1920px' }}>

                {/* Hero section with text on the left side and an image on the right side */}
                <Box sx={{minHeight: '80vh' }} className="flex justify-center items-center bg-transparent">
                    
                    <Grid container>
                        <Grid item xs={12} md={8} display='flex' flexDirection='column' justifyContent='center' alignItems={{xs: 'center', md: 'start'}} className='px-2 md:pl-4 lg:pl-20 text-center md:text-start'>
                            <Typography variant="h1" gutterBottom color='primary' className='text-7xl font-bold'>
                                MyPortfolio
                            </Typography>
                            <Typography variant="h3" gutterBottom className='mb-10 text-black text-6xl font-bold'>
                                Your Professional <br/> <span className='underline'>Journey Unfolded</span>
                            </Typography>
                            <Typography variant="h4" gutterBottom className='text-gray-500'>
                                Not another simple <br/> project-showcase website.
                            </Typography>
                            <Box className='mt-6 flex flex-row mb-6'>
                                <Button variant="contained" size='large' className='mr-4' >Get Started</Button>
                                <Button variant="outlined" size='large'>Learn More</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} display='flex' justifyContent={{xs:'center', md:'end'}} className='px-2 md:pr-4 lg:pr-20'>
                            <img
                                alt="image"
                                src="/images/landing/image2031407-voi-600h.png"
                                className={styles['image']}
                                style={{ width: '100%', height: '100%', maxWidth: '550px' }}
                            />
                        </Grid>
                    </Grid>

                </Box>

            </Box>
        </Box>
    );
}

export async function getStaticProps(context) {
    const { locale } = context
    const props = {
        ...(await serverSideTranslations(locale))
    }

    return {
        props
    }

}

export default MyHome;