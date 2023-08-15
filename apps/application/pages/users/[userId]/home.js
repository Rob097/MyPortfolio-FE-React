import ImageCard from '@/components/imageCard/ImageCard';
import { default as navbarStyled, default as styled } from "@/components/navbar/navbar.module.scss";
import PersonalCard from '@/components/personalCard';
import HeroSection from "@/components/sections/HeroSection";
import MicroHighlightSection, { SingleElement } from '@/components/sections/MicroHighlightSection';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import SoftButton from '@rob097/common-lib/components/SoftButton';
import SoftInput from '@rob097/common-lib/components/SoftInput';
import SoftTextArea from '@rob097/common-lib/components/SoftTextArea';
import SoftTypography from '@rob097/common-lib/components/SoftTypography';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';
import classes from "../../userProfile.module.scss";


const UserHome = () => {
    const { t } = useTranslation(['user-home', 'common']);
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const { palette } = useTheme();
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function handleContact(data) {
        console.log(data);
    }    

    return (
        <>
            {/* <HeroSection img="https://dora-react.vercel.app/images/hero-person-img.png" buttons={[{ label: "Download CV" }, { label: "Contact Me" }]}> */}
            <HeroSection img="/images/SamplePhoto_12.jpg" buttons={[{ label: t('download-cv') }, { label: t('contact-me.title'), link: '#contact-section' }]}>
                <SoftTypography variant="h3" color="primary" fontWeight="bold">{t("common:whoamI")}</SoftTypography>
                <SoftTypography variant="h1" color="dark" fontWeight="bold" gutterBottom sx={{ width: isGreaterThan('xl') ? '120%' : 'fit-content' }}>Roberto Dellantonio</SoftTypography>
                <SoftTypography variant="h5" color="dark" fontWeight="bold" gutterBottom>Software Engineer</SoftTypography>
                <SoftTypography variant="subtitle1" color="text" gutterBottom>Shot what able cold new the see hold. Friendly as an betrayed formerly he. Morning because as to society behaved moments.</SoftTypography>
            </HeroSection>

            <MicroHighlightSection moveUp>
                <SingleElement avatar="1" title="Java" caption="Back-end development" />
                <SingleElement avatar="2" title="React" caption="Front-end development" />
                <SingleElement avatar="3" title="Docker" caption="Devops management" />
            </MicroHighlightSection>

            <Box id='main-story-section' component='section' className='mt-12 xl:mt-0'>
                <Box className='absolute w-full h-96'>
                    <div className='w-3/5 md:w-2/5 h-full mr-0 ml-auto rounded-s-2xl' style={{ backgroundColor: palette.dark.main, opacity: 0.9 }} ></div>
                </Box>
                <Container disableGutters={isSmallerThan('lg')} className={isGreaterThan('lg') ? styled.navbarContainer : ''}>
                    <PersonalCard image='https://mui.com/static/images/avatar/1.jpg' phone='+39-3343281120' email='dellantonio47@gmail.com' city='Predazzo, Italy' sectionToScrollTo='#contact-section'/>

                    <Grid container >
                        <Grid item xs={12} height='25em' marginBottom={2} className='flex justify-center items-center'>
                            <Box className='flex justify-center h-fit items-end'>
                                <div className='relative flex flex-col w-full h-full max-h-80 bg-white rounded-2xl pl-16 pr-16 pt-8 pb-8 mx-8' style={{ boxShadow: 'rgb(0 0 0 / 10%) -8px 8px 20px 5px', minHeight: '40%' }}>
                                    <img src='/images/Group.svg' className='absolute top-0 left-0 ml-4 mt-4' />
                                    <SoftTypography variant="h5" fontWeight="bold" color="primary">{t('about-me.title')}</SoftTypography>
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
                </Container>
            </Box>

            {/* TODO: Cambiare le immagini delle tre cards */}
            <Box id='cards-section' component='section'>
                <Box width='fit-content' m='auto' mb={4}>
                    <SoftTypography variant="h2" fontWeight="bold">{t('about-me.more')}</SoftTypography>
                </Box>
                <Container className={navbarStyled.navbarContainer}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <ImageCard image="/images/Rectangle-22952.png" title={t('cards.diary')} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ImageCard image="/images/Rectangle-22953.png" title={t('cards.experiences')} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ImageCard image="/images/Rectangle-22954.png" title={t('cards.projects')} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Contact Me Section */}
            <Box id='contact-section' component='section' className={classes.section} sx={{ backgroundImage: `linear-gradient(180deg, ${palette.background.white}, ${palette.background.default} 50%);` }}>
                <Container maxWidth="lg" className='px-12 lg:px-6 relative' sx={{ zIndex: 1 }}>
                    <SoftTypography variant="h2" sx={{ textAlign: 'center' }} gutterBottom>
                        {t("contact-me.title")}
                    </SoftTypography>
                    <Box component="form" role="form" onSubmit={handleSubmit((data) => handleContact(data))}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Box mb={2}>
                                    <Box mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            {t("contact-me.fields.name")}
                                        </SoftTypography>
                                    </Box>
                                    <SoftInput id='name' type="text" placeholder={t("contact-me.fields.name")} {...register("name", { required: t('contact-me.validations.name-required') })} error={errors.name && true} helpertext={errors.name?.message} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box mb={2}>
                                    <Box mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            {t("contact-me.fields.email")}
                                        </SoftTypography>
                                    </Box>
                                    <SoftInput id='email' type="email" placeholder={t("contact-me.fields.email")} {...register("email", { required: t('contact-me.validations.email-required') })} error={errors.email && true} helpertext={errors.email?.message} />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Box mb={2}>
                                    <Box mb={1} ml={0.5}>
                                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                                            {t("contact-me.fields.message")}
                                        </SoftTypography>
                                    </Box>
                                    <SoftTextArea
                                        id='message'
                                        placeholder={t("contact-me.fields.message")}
                                        {...register("message", { required: t('contact-me.validations.message-required'), maxLength: { value: 500, message: t('contact-me.validations.message-length', { maxLength: '500' }) } })} error={errors.message && true} helpertext={errors.message?.message}
                                        minRows={3}
                                        maxLength={500}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Box mb={2}>
                            <SoftButton type="submit" variant="contained" color="primary" size="large" fullWidth>
                                {t("contact-me.submit")}
                            </SoftButton>
                        </Box>
                    </Box>
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


