import TimelineCustom from '@/components/carousel/gptTimeline';
import StoryCard from '@/components/storyCard';
import StoriesFilters from '@/components/whiteBar/storiesFilters';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { educationStories, experienceStories } from '@/data/mock/stories';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import tailwindConfig from '@/tailwind.config.js';
import { Box, Button, Container, Grid, Pagination, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';


const Experiences = () => {

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const { colors } = tailwindConfig.theme;

    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    const router = useRouter();
    const { userId } = router.query;

    const stories = [...experienceStories, ...educationStories];
    const pages = Math.ceil(stories.length / 6);

    return (
        <Box className='py-20'>
            <Box id='header-section' component='section' className='mt-12 xl:mt-0 flex justify-center' sx={{ backgroundImage: `linear-gradient(180deg, transparent, ${colors.background.main} 50%);` }}>
                <Box className="w-full mt-20 pb-20">
                    <Typography variant="h1" textAlign='center'>Experiences & Educations</Typography>
                    <Box className="mt-20">
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} className='flex justify-center md:justify-end items-center'>
                                <Button href='#timeline-section' variant="contained" color="secondary" size="large" sx={{ borderRadius: '50px' }}>Timeline</Button>
                            </Grid>
                            <Grid item xs={12} md={6} className='flex justify-center md:justify-start items-center'>
                                <Button href='#stories-section' variant="contained" color="secondary" size="large" sx={{ borderRadius: '50px' }}>Stories</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

            <Box id='timeline-section' component='section' className='mt-12 xl:mt-0 pt-10'>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>
                    <Box className={isSmallerThanLg ? 'mx-8' : ''}>
                        <Typography variant="h2" fontWeight='bold' className='mt-20 mb-10'>Timeline</Typography>
                        <TimelineCustom />
                    </Box>
                </Container>
            </Box>

            <Box id='stories-section' component='section' className='mt-12 xl:mt-0 pt-10'>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>
                    <Box className={isSmallerThanLg ? 'mx-8' : ''}>

                        <StoriesFilters />

                        <Typography variant="h2" fontWeight='bold' className='mt-10'>Stories</Typography>
                        <Box className="w-full mt-8 mb-20">
                            <Grid container className='mt-4' spacing={2}>
                                {
                                    stories.slice(0, 6).map(({ id, title, preview, date, skills, image }) => (
                                        <Grid key={id} item xs={12} sm={6} lg={4} className='flex justify-center sm:justify-start items-start'>
                                            <StoryCard
                                                image={image}
                                                title={title}
                                                preview={preview}
                                                date={date}
                                                skills={skills}
                                            />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>

                        <Pagination count={pages} variant="outlined" color="primary" className='relative z-10' />

                    </Box>
                </Container>
            </Box>
        </Box>
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

export default Experiences;