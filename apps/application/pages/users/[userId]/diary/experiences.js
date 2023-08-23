import TimelineCustom from '@/components/carousel/gptTimeline';
import StoryCard from '@/components/storyCard';
import ShowIf from '@/components/utils/showIf';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { educationStories, experienceStories } from '@/data/mock/stories';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import DiaryLayout from '@/layouts/DiaryLayout';
import tailwindConfig from '@/tailwind.config.js';
import { Box, Button, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import experiencesClasses from '../styles/experiences.module.scss';

const Experiences = () => {

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const { colors } = tailwindConfig.theme;
    const [showTimeline, setShowTimeline] = useState(false);

    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    const router = useRouter();
    const { userId } = router.query;

    const stories = [...experienceStories, ...educationStories];
    const pages = Math.ceil(stories.length / 6);

    function toggleTimeline() {
        if (typeof document !== 'undefined' && typeof window !== 'undefined') {
            document.getElementById('diary-stories-filter')?.classList.toggle('hidden');
            setShowTimeline(!showTimeline);
        }
    }

    return (

        <Box className='pb-20'>

            <ShowIf condition={!showTimeline}>
                <Box id='stories-section' component='section' className='mt-12 xl:mt-0 pt-10'>
                    <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>
                        <Box className={isSmallerThanLg ? 'mx-8' : ''}>

                            <Stack direction='row' spacing={2} className='items-end my-10'>
                                <Typography variant="h2" fontWeight='bold'>Stories</Typography>
                                <Box className={experiencesClasses.container}>
                                    <Button onClick={toggleTimeline} variant="contained" color="primary" size="small" className='shineButton h-fit py-2' sx={{ borderRadius: '50px' }}>
                                        View As Timeline
                                    </Button>
                                </Box>
                            </Stack>
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
            </ShowIf>

            <ShowIf condition={showTimeline}>
                <Box id='timeline-section' component='section' className='mt-12 xl:mt-0 pt-10'>
                    <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>
                        <Box className={isSmallerThanLg ? 'mx-8' : ''}>
                            <Stack direction='row' spacing={2} className='items-end my-10'>
                                <Typography variant="h2" fontWeight='bold'>Timeline</Typography>
                                <Button onClick={toggleTimeline} variant="contained" color="primary" size="small" className='shineButton h-fit py-2' sx={{ borderRadius: '50px' }}>View As Stories</Button>
                            </Stack>
                            <TimelineCustom />
                        </Box>
                    </Container>
                </Box>
            </ShowIf>

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

Experiences.getLayout = (page) => {
    return (
        <DiaryLayout title='Experiences & Educations'>
            {page}
        </DiaryLayout>
    )
}

export default Experiences;