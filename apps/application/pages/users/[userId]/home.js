import CarouselItem from '@/components/carousel/carouselItem';
import ImageCard from '@/components/imageCard/ImageCard';
import navbarStyled from "@/components/navbar/navbar.module.scss";
import HeroSection from "@/components/sections/HeroSection";
import MicroHighlightSection, { SingleElement } from '@/components/sections/MicroHighlightSection';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Avatar, Box } from "@mui/material";
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
import styled from "@/components/navbar/navbar.module.scss";
import homeStyles from "@/pages/users/[userId]/home.module.scss";


const UserHome = () => {
    const { t } = useTranslation(['user-home', 'common']);
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const { palette } = useTheme();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const isGreaterThanMd = isGreaterThan('md');
    const isGreaterThanSm = isGreaterThan('sm');

    async function handleContact(data) {
        console.log(data);
    }

    /* DIARY CAROUSEL ELEMENTS */
    const diaryElements = [
        <CarouselItem key="CI-1" title="Moving to a New City 1" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem key="CI-2" title="Moving to a New City 2" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem key="CI-3" title="Moving to a New City 3" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem key="CI-4" title="Moving to a New City 4" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem key="CI-5" title="Moving to a New City 5" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem key="CI-6" title="Moving to a New City 6" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />
    ];
    const sliderItems = isGreaterThanMd ? 3 : isGreaterThanSm ? 2 : 1;
    const items = [];
    for (let i = 0; i < diaryElements.length; i += sliderItems) {
        if (i % sliderItems === 0) {
            items.push(
                <Grid container spacing={5} padding={2} key={"c-" + i}>
                    {diaryElements.slice(i, i + sliderItems).map((diaryElement, index) => (
                        <Grid item xs={12} sm={6} md={4} key={diaryElement.key}>
                            {diaryElement}
                        </Grid>
                    ))}
                </Grid>
            );
        }
    }

    return (
        <>
            <HeroSection img="https://dora-react.vercel.app/images/hero-person-img.png" buttons={[{ label: "Download CV" }, { label: "Contact Me" }]}>
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
                    <PersonalCard />

                    <Grid container >
                        <Grid item xs={12} height='25em' marginBottom={2} className='flex justify-center items-center'>
                            <Box className='flex justify-center h-fit items-end'>
                                <div className='relative flex flex-col w-full h-full max-h-80 bg-white rounded-2xl pl-16 pr-16 pt-8 pb-8 mx-8' style={{ boxShadow: 'rgb(0 0 0 / 10%) -8px 8px 20px 5px', minHeight: '40%' }}>
                                    <img src='/images/Group.svg' className='absolute top-0 left-0 ml-4 mt-4' />
                                    <SoftTypography variant="h5" fontWeight="bold" color="primary" className=''>Something about me</SoftTypography>
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











                {/* <Grid container>
                    <Grid item xs={12} md={8} className='flex justify-end h-full'>
                        <Container >
                            <div className='relative flex flex-row align-center w-3/5 bg-white mt-8 mr-0 ml-auto h-fit' style={{ boxShadow: 'rgb(0 0 0 / 10%) -8px 8px 20px 5px', borderRadius: '10rem 4rem 4rem 10rem' }}>
                                <Avatar src='https://mui.com/static/images/avatar/1.jpg' sx={{ width: 100, height: 100 }} variant='circular' />
                                <div className='ml-10 my-auto'>
                                    <SoftTypography variant='body2' color='text' >+39-3343281120</SoftTypography>
                                    <SoftTypography variant='body2' color='text' >dellantonio47@gmail.com</SoftTypography>
                                    <SoftTypography variant='body2' color='text' >Predazzo, Italy</SoftTypography>
                                </div>
                            </div>
                        </Container>
                    </Grid>
                    <Grid item xs={12} md={4} /* height='25em'  * marginBottom={8}>
                        <Box className='flex justify-end'>
                            <div className='w-3/5 md:w-2/5 h-1/2 max-h-96 absolute rounded-s-2xl' style={{ backgroundColor: palette.dark.main, opacity: 0.9 }} ></div>
                        </Box>
                        /* <Box className='flex h-full justify-center items-end'>
                            <div className='relative flex flex-col w-4/5 md:w-3/5 bg-white rounded-2xl pl-16 pr-16 pt-8 pb-8' style={{ boxShadow: 'rgb(0 0 0 / 10%) -8px 8px 20px 5px', maxHeight: '60%', minHeight: '40%' }}>
                                <img src='/images/Group.svg' className='absolute top-0 left-0 ml-4 mt-4' />
                                <SoftTypography variant="h5" fontWeight="bold" color="primary" className=''>Something about me</SoftTypography>
                                <div className={classes.scrollGradientMainStory + ' overflow-y-scroll hide-scrollbar'}>
                                    <SoftTypography variant="body2" className='leading-7'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                    </SoftTypography>
                                </div>
                                <img src='/images/Group.svg' className='absolute bottom-0 right-0 mr-4 mb-4' />
                            </div>
                        </Box> *}
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} height='25em' marginBottom={2}>
                        <Box className='flex h-4/5 mt-4 justify-center items-end pb-12'>
                            <div className='relative flex flex-col w-4/5 md:w-3/5 bg-white rounded-2xl pl-16 pr-16 pt-8 pb-8' style={{ boxShadow: 'rgb(0 0 0 / 10%) -8px 8px 20px 5px', maxHeight: '60%', minHeight: '40%' }}>
                                <img src='/images/Group.svg' className='absolute top-0 left-0 ml-4 mt-4' />
                                <SoftTypography variant="h5" fontWeight="bold" color="primary" className=''>Something about me</SoftTypography>
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
                </Grid> */}
            </Box>

            <Box id='cards-section' component='section'>
                <Box width='fit-content' m='auto' mb={4}>
                    <SoftTypography variant="h2" fontWeight="bold">{t('about-me')}</SoftTypography>
                </Box>
                <Container className={navbarStyled.navbarContainer}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <ImageCard image="/images/Rectangle-22952.png" title="Diary" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ImageCard image="/images/Rectangle-22953.png" title="Experience" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ImageCard image="/images/Rectangle-22954.png" title="Projects" />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <div>
                {/* <Box id='timeline-section' component='section'>
                <Container disableGutters={isGreaterThan('lg')} className={isGreaterThan('lg') ? navbarStyled.navbarContainer : ''}>
                    <Grid container>
                        <Grid item md={6} width="100%">
                            <Box id="sticky-container" display={isSmallerThan('md') ? "block" : "flex"} justifyContent="right" mr={isSmallerThan('md') ? 0 : 6} mt={6} className={classes.stickyContainer}>
                                <Box textAlign="center">
                                    <SoftTypography variant="h1" color="primary" fontWeight="bold" style={{ fontStyle: 'italic' }} >{t('my-story')}</SoftTypography>
                                    <SoftTypography variant="subtitle1" color="text" fontWeight="bold" style={{ fontStyle: 'italic' }} >Staying hard I did all of that...</SoftTypography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item md={6}>
                            <Timeline
                                sx={{
                                    [`& .${timelineOppositeContentClasses.root}`]: {
                                        flex: 0.2,
                                    },
                                    display: 'block',
                                    maxHeight: '60vh',
                                    overflowY: 'scroll'
                                }}
                                className={classes.scrollGradient + " hide-scrollbar"}
                            >
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2020
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary">
                                            <LaptopMacIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2021 2022
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={homeStyled.customSeparator} >
                                        <TimelineDot className={homeStyled.customDot} />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2023
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={homeStyled.customSeparator} >
                                        <TimelineDot color="primary">
                                            <LaptopMacIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2024 2025
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={homeStyled.customSeparator} >
                                        <TimelineDot className={homeStyled.customDot} />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2020
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color="primary">
                                            <LaptopMacIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2021 2022
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={homeStyled.customSeparator} >
                                        <TimelineDot className={homeStyled.customDot} />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2023
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={homeStyled.customSeparator} >
                                        <TimelineDot color="primary">
                                            <LaptopMacIcon />
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem>
                                    <TimelineOppositeContent color="text.secondary">
                                        2024 2025
                                    </TimelineOppositeContent>
                                    <TimelineSeparator className={homeStyled.customSeparator} >
                                        <TimelineDot className={homeStyled.customDot} />
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </TimelineContent>
                                </TimelineItem>
                            </Timeline>
                        </Grid>
                    </Grid>



                </Container>
            </Box>

            <Box id="diary-section" component='section'>
                <Container disableGutters={isGreaterThan('lg')} className={isGreaterThan('lg') ? navbarStyled.navbarContainer : ''}>
                    {/* Diary Section
                    <div className={classes.section}>
                        <Container maxWidth="lg">
                            <SoftTypography variant="h4" gutterBottom>
                                Diary
                            </SoftTypography>

                            <Carousel animation="slide" duration={2000} height={330} autoPlay={false} swipe={isSmallerThan('md')}>
                                {items}
                            </Carousel>
                        </Container>
                    </div>
                </Container>
            </Box> */}
            </div>

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






const PersonalCard = () => (
    <div className={homeStyles.personalCard + ' relative align-center w-fit bg-white md:ml-8 m-auto mt-8 h-fit xs:rounded-2xl'}>
        <Grid container className='sm:py-0 py-2'>
            <Grid item xs={12} sm={3} className='flex justify-center sm:justify-start items-center'>
                <Avatar src='https://mui.com/static/images/avatar/1.jpg' sx={{ width: 100, height: 100 }} variant='circular' />
            </Grid>
            <Grid item xs={12} sm={9} className='flex justify-center items-center'>
                <div className='ml-auto mr-auto sm:ml-8 text-center sm:text-left'>
                    <SoftTypography variant='body2' color='text' >+39-3343281120</SoftTypography>
                    <SoftTypography variant='body2' color='text' >dellantonio47@gmail.com</SoftTypography>
                    <SoftTypography variant='body2' color='text' >Predazzo, Italy</SoftTypography>
                </div>
            </Grid>
        </Grid>
    </div>
)