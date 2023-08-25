import SectionCard from '@/components/cards/sectionCard';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { projectStories } from '@/data/mock/stories';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import DiaryLayout from '@/layouts/DiaryLayout';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
// Import a necessary function in the ES6 way (recommended):
import { sanitize, isSupported } from "isomorphic-dompurify";
import DOMPurify from 'isomorphic-dompurify';
import HtmlContent from '@/components/htmlContent';
import JsxParser from 'react-jsx-parser';
import WhiteBar from '@/components/whiteBar';
import ListIcon from '@mui/icons-material/List';
import Button from '@mui/material/Button';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ShowIf from '@/components/utils/showIf';
import Link from 'next/link';


const Story = ({ story }) => {
    const router = useRouter();
    const { userId, storyName } = router.query;

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    // From projectStories get the previous and next story based on the current story:
    const previousStory = projectStories.find((story, index) => projectStories[index + 1]?.slug === storyName);
    const nextStory = projectStories.find((story, index) => projectStories[index - 1]?.slug === storyName);

    return (
        <Box id='mainStorySection' component='section' className='relative flex z-50 bg-background-secondary'>
            <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>

                <WhiteBar containerClasses='sticky top-0 pt-4 !px-0 bg-background-secondary' white px={2}>
                    <Box className="w-full flex flex-row justify-between items-center">
                        <Button variant="contained" startIcon={<ListIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white' >
                            API Reference / Routes
                        </Button>
                        <Box className='flex flex-row justify-end'>
                            <ShowIf condition={previousStory !== undefined}>
                                <Link href='/users/[userId]/diary/[storyName]#mainStorySection' as={`/users/${userId}/diary/${previousStory?.slug}#mainStorySection`}>
                                    <Button variant="contained" startIcon={<KeyboardArrowLeftIcon />} classes={{ startIcon: '' }} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white' >
                                        {previousStory?.title}
                                    </Button>
                                </Link>
                            </ShowIf>
                            <ShowIf condition={nextStory !== undefined}>
                                <Link href='/users/[userId]/diary/[storyName]#mainStorySection' as={`/users/${userId}/diary/${nextStory?.slug}#mainStorySection`}>
                                    <Button variant="contained" endIcon={<KeyboardArrowRightIcon />} classes={{ endIcon: '' }} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white ml-2' >
                                        {nextStory?.title}
                                    </Button>
                                </Link>
                            </ShowIf>
                        </Box>
                    </Box>
                </WhiteBar>

                <Grid container spacing={6} className='w-full py-4 mx-4 lg:mx-0'>
                    <Grid item xs={12} md={7} className='h-full !px-6'>
                        <Box>
                            <Typography variant="h1" fontWeight='bold'>{story.title}</Typography>

                            <Box className='mt-4'>
                                <HtmlContent>
                                    {story.text}
                                </HtmlContent>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5} className='h-full sticky top-8 !px-6'>
                        <Box>
                            {
                                story.relevantSections?.map((section) => (
                                    <SectionCard key={section.title} title={section.title} className='my-6 overflow-y-hidden' style={{ height: `calc((100vh - 145px)/${story.relevantSections.length})` }}>
                                        <HtmlContent>
                                            {section.text}
                                        </HtmlContent>
                                    </SectionCard>
                                ))
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export async function getStaticPaths(context) {
    const { locales } = context;
    let paths = [];
    for (const locale of locales) {
        paths.push(
            {
                params: {
                    userId: 'user1',
                    storyName: 'my-first-project'
                },
                locale
            }
        );
        paths.push(
            {
                params: {
                    userId: 'user1',
                    storyName: 'my-second-project'
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
    const { locale, params } = context

    const { userId, storyName } = params;

    // Use storyName to find the story in projectStories that has the same slug
    const story = projectStories.find(story => story.slug === storyName);

    return {
        props: {
            // pass the translation props to the page component
            ...(await serverSideTranslations(locale)),
            story
        },
    }
}

Story.getLayout = (page) => {
    const { t } = useTranslation('user-diary');

    return (
        <DiaryLayout>
            {page}
        </DiaryLayout>
    )
}

export default Story;