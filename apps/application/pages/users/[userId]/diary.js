import WhiteBar from '@/components/whiteBar';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Box, Grid, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import SoftButton from '@rob097/common-lib/components/SoftButton';
import SoftInput from '@rob097/common-lib/components/SoftInput';
import SoftTypography from '@rob097/common-lib/components/SoftTypography';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import classes from "../../userProfile.module.scss";


const Diary = () => {
    const { t } = useTranslation(['user-diary', 'user-home']);
    const { palette } = useTheme();
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    const router = useRouter();
    const { userId } = router.query;

    return (
        <>
            <Box id='main-story-section' component='section' className='mt-12 xl:mt-0 pt-10 flex'>

                <Grid container className='mx-8'>
                    <Grid item xs={12} md={4} height='25em' marginBottom={2} className='h-fit md:h-full'>
                        <Box className='flex justify-center items-center h-fit md:h-full'>
                            <Box className='w-fit flex md:justify-start md:items-start justify-center items-center flex-col'>
                                <Avatar id="personalCardAvatar" src="https://mui.com/static/images/avatar/1.jpg" sx={{ width: 150, height: 150 }} variant='circular' />
                                <SoftTypography variant="h3" fontWeight="bold" color="primary" textAlign={{xs: 'center', md: 'left' }}>Roberto Dellantonio</SoftTypography>
                                <SoftTypography variant="subtitle1" fontWeight="bold" color="dark">Predazzo, TN</SoftTypography>
                                <SoftTypography variant="subtitle2" fontWeight="bold" color="text" mt={2}>Software Engineer</SoftTypography>
                                <Box mt={3}>
                                    <SoftButton variant="contained" color="primary" size="medium" sx={{ borderRadius: '50px' }}>Hire Me</SoftButton>
                                    <SoftButton variant="outlined" color="primary" size="medium" className="ml-2" sx={{ borderRadius: '50px' }}>Following</SoftButton>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8} height='25em' marginBottom={2} className='flex justify-center items-center'>
                        <Box className='absolute w-full h-96 left-0'>
                            <div className='w-3/5 md:w-2/5 h-full mr-0 ml-auto rounded-s-2xl' style={{ backgroundColor: palette.dark.main, opacity: 0.9 }} ></div>
                        </Box>
                        <Box className='flex justify-center h-fit items-end'>
                            <div className='relative flex flex-col w-full h-full max-h-80 bg-white rounded-2xl pl-16 pr-16 pt-8 pb-8' style={{ boxShadow: 'rgb(0 0 0 / 10%) -8px 8px 20px 5px', minHeight: '40%' }}>
                                <img src='/images/Group.svg' className='absolute top-0 left-0 ml-4 mt-4' />
                                <SoftTypography variant="h5" fontWeight="bold" color="primary">{t('user-home:about-me.title')}</SoftTypography>
                                <div className={classes.scrollGradientMainStory + ' overflow-y-scroll hide-scrollbar'}>
                                    <SoftTypography variant="body2" className='leading-7'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                    </SoftTypography>
                                </div>
                                <img src='/images/Group.svg' className='absolute bottom-0 right-0 mr-4 mb-4' />
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Divider variant="middle" className='opacity-100' />

            <WhiteBar height='6rem'>
                <Box className='flex items-center w-full h-full'>
                    <SoftTypography variant="h5" fontWeight="bold" color="primary">{t('title')}</SoftTypography>
                    <Box className="ml-8">
                        <SoftInput placeholder='Search by name' size="medium" />
                    </Box>
                    <Box className="absolute right-0 top-0 h-full flex items-center mr-8">
                        <SoftButton variant="contained" color="primary" size="medium" sx={{ borderRadius: '50px' }}>Add New</SoftButton>
                    </Box>
                </Box>
            </WhiteBar>


            <Box className='w-full h-screen'>

            </Box>

        </>

    )
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

export default Diary;
