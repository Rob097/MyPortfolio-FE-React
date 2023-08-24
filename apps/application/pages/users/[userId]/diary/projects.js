import StoryCard from '@/components/storyCard';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { projectStories } from '@/data/mock/stories';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import DiaryLayout from '@/layouts/DiaryLayout';
import { Box, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const Projects = () => {

    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    const router = useRouter();
    const { userId } = router.query;

    const stories = [...projectStories];
    const pages = Math.ceil(stories.length / 6);

    return (
        <Box className='pb-20'>
            <Box id='stories-section' component='section' className='mt-12 xl:mt-0 pt-10'>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>
                    <Box className={isSmallerThanLg ? 'mx-8' : ''}>

                        <Stack direction='row' spacing={2} className='items-end my-10'>
                            <Typography variant="h2" fontWeight='bold'>Stories</Typography>
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

Projects.getLayout = (page) => {
    return (
        <DiaryLayout title='Personal Projects' id='projects'>
            {page}
        </DiaryLayout>
    )
}

export default Projects