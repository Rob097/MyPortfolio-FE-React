import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import classes from './userProfile.module.scss';

const UserProfilePage = () => {

    return (
        <div>
            {/* Profile Section */}
            <div className={classes.profileSection}>
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item xs={12} sm={4}>
                            <Avatar
                                alt="John Doe"
                                src="https://via.placeholder.com/150"
                                className={classes.profileAvatar}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <div className={classes.profileContent}>
                                <Typography variant="h2" gutterBottom>
                                    John Doe
                                </Typography>
                                <Typography variant="h5" color="textSecondary" paragraph>
                                    Software Engineer | Aspiring Writer | Explorer
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Hi, I'm John! I'm a passionate software engineer with a knack for writing and a love for exploring new places.
                                    My journey in the tech world started with a simple curiosity for coding, which eventually led me to pursue a
                                    career in software development. Alongside my technical endeavors, I also enjoy penning down my thoughts and
                                    experiences in the form of stories and poems. Traveling to different places, meeting new people, and learning
                                    about diverse cultures are some of my favorite pastimes.
                                </Typography>
                                <Button variant="contained" color="primary" size="large" className={classes.callToAction}>
                                    Edit Profile
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            {/* Main Story Section */}
            <div className={classes.section}>
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item xs={12} sm={8}>
                            <Paper className={classes.storyCard}>
                                <Typography variant="h4" gutterBottom>
                                    My Main Story
                                </Typography>
                                <div className={classes.timelineContainer}>
                                    {/* Timeline Item 1 */}
                                    <div className={classes.timelineItem}>
                                        <Typography variant="h6">College Days</Typography>
                                        <Typography variant="body1" color="textSecondary" paragraph>
                                            September 2015 - May 2019
                                        </Typography>
                                        <Typography variant="body1" paragraph>
                                            My journey in the world of technology began during my college days when I first got my hands on a computer.
                                            Curiosity sparked my interest, and I delved into the realm of coding, learning various programming
                                            languages and building small projects to sharpen my skills.
                                        </Typography>
                                    </div>

                                    {/* Timeline Item 2 */}
                                    <div className={classes.timelineItem}>
                                        <Typography variant="h6">Startup Days</Typography>
                                        <Typography variant="body1" color="textSecondary" paragraph>
                                            June 2019 - Present
                                        </Typography>
                                        <Typography variant="body1" paragraph>
                                            After completing my computer science degree, I joined a startup as a junior developer, where I had the
                                            opportunity to work on exciting projects and collaborate with talented individuals. My journey in the tech
                                            industry continued as I advanced in my career and took on more challenging roles, from front-end development
                                            to full-stack engineering. Each project and milestone brought its unique set of lessons and experiences,
                                            shaping me into the professional I am today.
                                        </Typography>
                                    </div>

                                    {/* Timeline Item 3 */}
                                    <div className={classes.timelineItem}>
                                        <Typography variant="h6">Passion for Writing</Typography>
                                        <Typography variant="body1" color="textSecondary" paragraph>
                                            Ongoing
                                        </Typography>
                                        <Typography variant="body1" paragraph>
                                            Alongside my passion for technology, I've always been drawn to storytelling and creative writing. In my free
                                            time, I immerse myself in worlds of imagination, penning down stories and poems that touch on various themes,
                                            from fantasy adventures to thought-provoking tales. Writing has become an integral part of my identity,
                                            allowing me to express emotions, thoughts, and ideas in captivating narratives.
                                        </Typography>
                                    </div>
                                </div>
                                <Button variant="outlined" color="primary" size="large" className={classes.callToAction}>
                                    Edit Main Story
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={4}></Grid>
                    </Grid>
                </Container>
            </div>

            {/* Diary Section */}
            <div className={classes.section}>
                <Container maxWidth="lg">
                    <Typography variant="h4" gutterBottom>
                        Diary
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Diary Card 1 */}
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.storyCard}>
                                <Typography variant="h5" gutterBottom>
                                    Moving to a New City
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Date: July 5, 2022
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Today marks the beginning of a new chapter in my life. I've moved to a new city to pursue new opportunities
                                    and challenge myself. The excitement and nervousness are both overwhelming, but I'm eager to embrace this change
                                    and make the most of every experience that comes my way.
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Diary Card 2 */}
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.storyCard}>
                                <Typography variant="h5" gutterBottom>
                                    Completing My First Marathon
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Date: October 15, 2022
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Today is a day of immense pride and accomplishment. I completed my first marathon, and it's a feeling like no
                                    other. The journey to this point has been filled with determination, dedication, and hard work, but crossing
                                    that finish line made it all worthwhile.
                                </Typography>
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
                    <Typography variant="h4" gutterBottom>
                        Education and Experience
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Education Card 1 */}
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.storyCard}>
                                <Typography variant="h5" gutterBottom>
                                    Bachelor of Science in Computer Science
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Institution: XYZ University
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Duration: September 2015 - May 2019
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Description: During my time at XYZ University, I immersed myself in the world of computer science and gained a
                                    strong foundation in programming, data structures, algorithms, and software development. The hands-on projects
                                    and engaging coursework provided valuable experiences that set the stage for my career in technology.
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Experience Card 1 */}
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.storyCard}>
                                <Typography variant="h5" gutterBottom>
                                    Software Engineer at Tech Solutions Inc.
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Duration: June 2019 - Present
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Description: Joining Tech Solutions Inc. as a software engineer has been a transformative experience. From my
                                    early days as a junior developer to my current role as a full-stack engineer, I've had the opportunity to
                                    contribute to impactful projects, collaborate with talented teams, and continuously learn and grow in a dynamic
                                    tech environment.
                                </Typography>
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
                    <Typography variant="h4" gutterBottom>
                        Projects
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Project Card 1 */}
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.storyCard}>
                                <Typography variant="h5" gutterBottom>
                                    Project: E-Commerce Website
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Duration: February 2020 - August 2020
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Description: Building an E-Commerce website from scratch was an ambitious project that taught me a great deal
                                    about full-stack development and user experience. The platform allows users to browse products, add them to
                                    their cart, and complete secure transactions. Implementing features like user authentication, product search,
                                    and payment integration challenged me to think creatively and efficiently.
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Project Card 2 */}
                        <Grid item xs={12} sm={6}>
                            <Paper className={classes.storyCard}>
                                <Typography variant="h5" gutterBottom>
                                    Project: Blogging Platform
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Duration: January 2021 - April 2021
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Description: Creating a blogging platform was a passion project that allowed me to combine my love for writing
                                    with my technical skills. The platform enables users to create and publish their blogs, customize their
                                    profiles, and engage with the community through comments and likes.
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* Add more project cards here */}
                        {/* Project Card 3, Project Card 4, etc. */}
                    </Grid>
                </Container>
            </div>

            {/* Additional content and sections can be added below */}
        </div>
    );
};

export default UserProfilePage;
