import SoftButton from '@/components/SoftButton';
import SoftInput from '@/components/SoftInput';
import SoftTextArea from '@/components/SoftTextArea';
import SoftTypography from '@/components/SoftTypography';
import CarouselItem from '@/components/carousel/carouselItem';
import navbarStyled from "@/components/navbar/navbar.module.scss";
import HeroSection from "@/components/sections/HeroSection";
import MicroHighlightSection, { SingleElement } from '@/components/sections/MicroHighlightSection';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent, {
    timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box } from "@mui/material";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm } from 'react-hook-form';
import Carousel from 'react-material-ui-carousel';
import classes from "../../userProfile.module.scss";
import homeStyled from "./home.module.css";


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
        <CarouselItem title="Moving to a New City 1" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem title="Moving to a New City 2" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem title="Moving to a New City 3" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem title="Moving to a New City 4" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem title="Moving to a New City 5" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />,
        <CarouselItem title="Moving to a New City 6" subtitle="July 5, 2022" description="Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change and make the most of every experience that comes my way." />
    ];
    const sliderItems = isGreaterThanMd ? 3 : isGreaterThanSm ? 2 : 1;
    const items = [];
    for (let i = 0; i < diaryElements.length; i += sliderItems) {
        if (i % sliderItems === 0) {
            items.push(
                <Grid container spacing={5} padding={2}>
                    {diaryElements.slice(i, i + sliderItems).map((diaryElement, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
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

            <Box id='next-section' component='section'>
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

                    {/* Diary Section */}
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
            </Box>

            {/* Contact Me Section */}
            <Box id='contact-section' component='section' className={classes.section} sx={{ backgroundImage: `linear-gradient(180deg, ${palette.background.white}, ${palette.background.default} 50%);` }}>
                <Container maxWidth="lg" className='px-12 lg:px-6'>
                    <SoftTypography variant="h4" gutterBottom>
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