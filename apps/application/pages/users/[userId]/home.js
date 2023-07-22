import SoftTypography from '@/components/SoftTypography';
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
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import homeStyled from "./home.module.css";
import classes from "../../userProfile.module.scss";
import Paper from '@mui/material/Paper';


const UserHome = () => {
    const { t } = useTranslation();
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    return (
        <>
            <HeroSection img="https://dora-react.vercel.app/images/hero-person-img.png" buttons={[{ label: "Download CV" }, { label: "Contact Me" }]}>
                <SoftTypography variant="h3" color="primary" fontWeight="bold">{t("whoamI")}</SoftTypography>
                <SoftTypography variant="h1" color="dark" fontWeight="bold" gutterBottom sx={{ width: isGreaterThan('xl') ? '120%' : 'fit-content' }}>Roberto Dellantonio</SoftTypography>
                <SoftTypography variant="h5" color="dark" fontWeight="bold" gutterBottom>Software Engineer</SoftTypography>
                <SoftTypography variant="subtitle1" color="text" gutterBottom>Shot what able cold new the see hold. Friendly as an betrayed formerly he. Morning because as to society behaved moments.</SoftTypography>
            </HeroSection>

            <MicroHighlightSection moveUp>
                <SingleElement avatar="1" title="Java" caption="Back-end development" />
                <SingleElement avatar="2" title="React" caption="Front-end development" />
                <SingleElement avatar="3" title="Docker" caption="Devops management" />
            </MicroHighlightSection>

            <Box id='next-section' component='section' mb={10} >
                <Container disableGutters={isGreaterThan('lg')} className={isGreaterThan('lg') ? navbarStyled.navbarContainer : ''}>
                    <Grid container>
                        <Grid item md={6} width="100%">
                            <Box display={isSmallerThan('md') ? "block" : "flex"} justifyContent="right" mr={isSmallerThan('md') ? 0 : 6} mt={6}>
                                <Box textAlign="center">
                                    <SoftTypography variant="h1" color="primary" fontWeight="bold" style={{ fontStyle: 'italic' }} >My Story</SoftTypography>
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
                                    overflowY: 'scroll',
                                    // hide scrollbar style
                                    '&::-webkit-scrollbar': {
                                        width: '0.4em'
                                    },
                                    // light black overlay at the bottom of the box
                                        boxShadow: 'inset 0px -20px 20px 0px rgb(0 0 0 / 34%)',
                                        webkitBoxShadow: 'inset 0px -20px 20px 0px rgb(0 0 0 / 34%)',
                                }}
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
                            <Grid container spacing={3}>
                                {/* Diary Card 1 */}
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.storyCard}>
                                        <SoftTypography variant="h5" gutterBottom>
                                            Moving to a New City
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Date: July 5, 2022
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities
                                            and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change
                                            and make the most of every experience that comes my way.
                                        </SoftTypography>
                                    </Paper>
                                </Grid>

                                {/* Diary Card 2 */}
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.storyCard}>
                                        <SoftTypography variant="h5" gutterBottom>
                                            Completing My First Marathon
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Date: October 15, 2022
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Today is a day of immense pride and accomplishment. I completed my first marathon, and it's a feeling like no
                                            other. The journey to this point has been filled with determination, dedication, and hard work, but crossing
                                            that finish line made it all worthwhile.
                                        </SoftTypography>
                                    </Paper>
                                </Grid>

                                {/* Add more diary cards here */}
                                {/* Diary Card 3, Diary Card 4, etc. */}
                            </Grid>
                        </Container>
                    </div>

                    {/* Education and Experience Section */}
                    <div className={classes.section}>
                        <Container maxWidth="lg">
                            <SoftTypography variant="h4" gutterBottom>
                                Education and Experience
                            </SoftTypography>
                            <Grid container spacing={3}>
                                {/* Education Card 1 */}
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.storyCard}>
                                        <SoftTypography variant="h5" gutterBottom>
                                            Bachelor of Science in Computer Science
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Institution: XYZ University
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Duration: September 2015 - May 2019
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Description: During my time at XYZ University, I immersed myself in the world of computer science and gained a
                                            strong foundation in programming, data structures, algorithms, and software development. The hands-on projects
                                            and engaging coursework provided valuable experiences that set the stage for my career in technology.
                                        </SoftTypography>
                                    </Paper>
                                </Grid>

                                {/* Experience Card 1 */}
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.storyCard}>
                                        <SoftTypography variant="h5" gutterBottom>
                                            Software Engineer at Tech Solutions Inc.
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Duration: June 2019 - Present
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Description: Joining Tech Solutions Inc. as a software engineer has been a transformative experience. From my
                                            early days as a junior developer to my current role as a full-stack engineer, I've had the opportunity to
                                            contribute to impactful projects, collaborate with talented teams, and continuously learn and grow in a dynamic
                                            tech environment.
                                        </SoftTypography>
                                    </Paper>
                                </Grid>

                                {/* Add more education and experience cards here */}
                                {/* Education Card 2, Experience Card 2, etc. */}
                            </Grid>
                        </Container>
                    </div>

                    {/* Projects Section */}
                    <div className={classes.section}>
                        <Container maxWidth="lg">
                            <SoftTypography variant="h4" gutterBottom>
                                Projects
                            </SoftTypography>
                            <Grid container spacing={3}>
                                {/* Project Card 1 */}
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.storyCard}>
                                        <SoftTypography variant="h5" gutterBottom>
                                            Project: E-Commerce Website
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Duration: February 2020 - August 2020
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Description: Building an E-Commerce website from scratch was an ambitious project that taught me a great deal
                                            about full-stack development and user experience. The platform allows users to browse products, add them to
                                            their cart, and complete secure transactions. Implementing features like user authentication, product search,
                                            and payment integration challenged me to think creatively and efficiently.
                                        </SoftTypography>
                                    </Paper>
                                </Grid>

                                {/* Project Card 2 */}
                                <Grid item xs={12} sm={6}>
                                    <Paper className={classes.storyCard}>
                                        <SoftTypography variant="h5" gutterBottom>
                                            Project: Blogging Platform
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Duration: January 2021 - April 2021
                                        </SoftTypography>
                                        <SoftTypography variant="body1" paragraph>
                                            Description: Creating a blogging platform was a passion project that allowed me to combine my love for writing
                                            with my technical skills. The platform enables users to create and publish their blogs, customize their
                                            profiles, and engage with the community through comments and likes.
                                        </SoftTypography>
                                    </Paper>
                                </Grid>

                                {/* Add more project cards here */}
                                {/* Project Card 3, Project Card 4, etc. */}
                            </Grid>
                        </Container>
                    </div>

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