import SectionCard from '@/components/cards/sectionCard';
import HtmlContent from '@/components/utils/htmlContent';
import ConditionalWrapper from '@/components/utils/conditionalWrapper';
import ShowIf from '@/components/utils/showIf';
import WhiteBar from '@/components/whiteBar';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { projectStories } from '@/data/mock/stories';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import DiaryLayout from '@/layouts/DiaryLayout';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListIcon from '@mui/icons-material/List';
import { Box, Container, Grid, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

/**
 * 
 * TODO:
 * 
 * https://mui.com/material-ui/react-drawer/#swipeable-edge
 * Usare questo drawer per nascondere le sezioni in evidenza se mobile
 * 
 * https://mui.com/material-ui/react-drawer/#responsive-drawer
 * Usare questo drawer per visualizzare le sezioni nella modale dell'indice
 * 
 */

const Story = ({ story }) => {
    const router = useRouter();
    const { userId, storyName } = router.query;

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    const [openIndex, setOpenIndex] = useState(false);
    const toggleOpenIndex = () => setOpenIndex(!openIndex);

    return (
        <>
            <Box id='mainStorySection' component='section' className='relative flex z-50 bg-background-secondary'>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>

                    <StoryNavbar userId={userId} storyName={storyName} toggleOpenIndex={toggleOpenIndex} />

                    <Grid container spacing={6} className='w-full py-4 mx-4 lg:mx-0 mt-2 md:mt-0' style={{ maxWidth: '-webkit-fill-available' }}>
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

            <IndexModal open={openIndex} toggleOpenIndex={toggleOpenIndex} />

        </>
    );
}

const StoryNavbar = ({ userId, storyName, toggleOpenIndex }) => {
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanMd = isGreaterThan('md');
    const isSmallerThanMd = isSmallerThan('md');

    // From projectStories get the previous and next story based on the current story:
    const previousStory = projectStories.find((story, index) => projectStories[index + 1]?.slug === storyName);
    const nextStory = projectStories.find((story, index) => projectStories[index - 1]?.slug === storyName);

    return (
        <ConditionalWrapper
            condition={true}
            wrapper={children =>
                isGreaterThanMd
                    ? <WhiteBar containerClasses='sticky top-0 pt-4 !px-0 bg-background-secondary' white px={2}>{children}</WhiteBar>
                    : <Box className='fixed bottom-0 w-full p-4 bg-white rounded-t-2xl shadow-lgTop'>{children}</Box>
            }
        >

            <Box className="w-full flex flex-row justify-between items-center">
                <Button onClick={toggleOpenIndex} variant="contained" startIcon={<ListIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white' >
                    API Reference / Routes
                </Button>
                <Box className='flex flex-row justify-end'>
                    <ShowIf condition={previousStory !== undefined}>
                        <ConditionalWrapper
                            condition={isSmallerThanMd}
                            wrapper={children => <Tooltip title={previousStory?.title}>{children}</Tooltip>}
                        >
                            <Link href='/users/[userId]/diary/[storyName]#mainStorySection' as={`/users/${userId}/diary/${previousStory?.slug}#mainStorySection`}>
                                <Button variant="contained" endIcon={isGreaterThanMd && <KeyboardArrowLeftIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white ml-2' >
                                    {isGreaterThanMd ? previousStory?.title : <KeyboardArrowLeftIcon />}
                                </Button>
                            </Link>
                        </ConditionalWrapper>
                    </ShowIf>
                    <ShowIf condition={nextStory !== undefined}>
                        <ConditionalWrapper
                            condition={isSmallerThanMd}
                            wrapper={children => <Tooltip title={nextStory?.title}>{children}</Tooltip>}
                        >
                            <Link href='/users/[userId]/diary/[storyName]#mainStorySection' as={`/users/${userId}/diary/${nextStory?.slug}#mainStorySection`}>
                                <Button variant="contained" endIcon={isGreaterThanMd && <KeyboardArrowRightIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white ml-2' >
                                    {isGreaterThanMd ? nextStory?.title : <KeyboardArrowRightIcon />}
                                </Button>
                            </Link>
                        </ConditionalWrapper>
                    </ShowIf>
                </Box>
            </Box>
        </ConditionalWrapper>
    )
}

const IndexModal = ({ open, toggleOpenIndex }) => {
    return (
        <Modal
            open={open}
            onClose={toggleOpenIndex}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='absolute top-1/2 left-1/2 w-1/3 h-2/5 rounded-xl bg-background-main shadow-xl p-4' sx={{ transform: 'translate(-50%, -50%)' }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.Duis mollis, est non commodo luctus, nisi erat porttitor ligula.Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.Duis mollis, est non commodo luctus, nisi erat porttitor ligula.Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.vDuis mollis, est non commodo luctus, nisi erat porttitor ligula.Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.Duis mollis, est non commodo luctus, nisi erat porttitor ligula.Duis mollis, est non commodo luctus, nisi erat porttitor ligula.

                </Typography>
            </Box>
        </Modal>
    )
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