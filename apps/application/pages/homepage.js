import React from 'react';
import { Button, Typography, Container, Grid, Paper } from '@mui/material';
import classes from './homepage.module.scss';

const Homepage = () => {

    return (
        <div>
            {/* Hero Section */}
            <div className={classes.heroSection}>
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.heroContent}>
                                <Typography variant="h2" gutterBottom>
                                    Welcome to MyPortfolio!
                                </Typography>
                                <Typography variant="h5" paragraph>
                                    Showcase your journey with stories instead of lists.
                                </Typography>
                                <Button variant="contained" color="secondary" size="large" className={classes.callToAction}>
                                    Get Started
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}></Grid>
                    </Grid>
                </Container>
            </div>

            {/* About Section */}
            <div className={classes.section}>
                <Container maxWidth="lg">
                    <Grid container alignItems="center">
                        <Grid item xs={12} sm={6}>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.sectionContent} elevation={3}>
                                <Typography variant="h4" gutterBottom>
                                    Tell Your Unique Story
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    MyPortfolio empowers you to create a personalized portfolio using stories that highlight
                                    your experiences, projects, education, and skills, giving you a unique and engaging way to
                                    showcase your journey.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Whether you're a student, professional, or someone with diverse life experiences, MyPortfolio
                                    is the platform to express your narrative and connect with others through the power of storytelling.
                                </Typography>
                                <Button variant="outlined" color="secondary" size="large" className={classes.callToAction}>
                                    Learn More
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            {/* How It Works Section */}
            <div className={classes.section}>
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom>
                        How MyPortfolio Works
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                1. Create Your Profile
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Set up your personalized profile with your main story and essential details about yourself.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                2. Add Experiences & Projects
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Showcase your educational experiences, professional and personal journeys, and projects you've
                                worked on or created.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h6" gutterBottom>
                                3. Link Skills to Stories
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Highlight the skills you've acquired over time by linking them to specific stories, projects,
                                and experiences in your profile.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button variant="outlined" color="primary" size="large" className={classes.callToAction}>
                        Start Creating
                    </Button>
                </Container>
            </div>

            {/* Testimonials Section */}
            <div className={classes.section}>
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom>
                        What Our Users Say
                    </Typography>
                    <Typography variant="body1" paragraph>
                        "MyPortfolio has revolutionized the way I present myself. The storytelling approach
                        makes my profile stand out from the crowd, and I love how easy it is to manage my
                        experiences and projects. Highly recommended!" - John Doe, Product Designer
                    </Typography>
                    <Typography variant="body1" paragraph>
                        "As a recent graduate, MyPortfolio helped me secure my dream job. Recruiters were
                        impressed by the interactive and engaging format of my profile. It truly showcases
                        my journey in a way that traditional resumes couldn't." - Jane Smith, Software Engineer
                    </Typography>
                    <Button variant="outlined" color="primary" size="large" className={classes.callToAction}>
                        Join Our Community
                    </Button>
                </Container>
            </div>

            {/* Additional content and sections can be added below */}
        </div>
    );
};

export default Homepage;