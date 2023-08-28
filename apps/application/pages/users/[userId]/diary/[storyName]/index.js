import SectionCard from '@/components/cards/sectionCard';
import SwipeableEdgeDrawer from '@/components/drawer/swipeableEdgeDrawer';
import StoryIndexModal from '@/components/modals/storyIndexModal';
import StoryNavbarClasses from '@/components/navbar/navbar.module.scss';
import StoryNavbar from '@/components/navbar/storyNavbar';
import HtmlContent from '@/components/utils/htmlContent';
import ShowIf from '@/components/utils/showIf';
import WhiteBar from '@/components/whiteBar';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { projectStories } from '@/data/mock/stories';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import DiaryLayout from '@/layouts/DiaryLayout';
import { Box, Container, Grid, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Story = ({ story }) => {
    const router = useRouter();
    const { userId, storyName } = router.query;

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');
    const isGreaterThanMd = isGreaterThan('md');

    const [openIndex, setOpenIndex] = useState(false);
    const toggleOpenIndex = () => setOpenIndex(!openIndex);
    const closeIndexModal = () => setOpenIndex(false);

    const showRelevantSections = story.relevantSections !== undefined && story.relevantSections.length > 0;

    const RelevantSections = ({ isMobile }) => (
        <Box>
            {
                story.relevantSections?.map((section) => (
                    <SectionCard key={section.title} title={section.title} className='my-6 overflow-y-hidden' style={{ height: isMobile ? 'auto' : `calc((100vh - 145px)/${story.relevantSections.length})`, maxHeight: isMobile ? '75vh' : '' }}>
                        <HtmlContent>
                            {section.text}
                        </HtmlContent>
                    </SectionCard>
                ))
            }
        </Box>
    );

    return (
        <>
            <Box id='mainStorySection' component='section' className='relative flex md:z-50 bg-background-secondary'>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>

                    {isGreaterThanMd ?
                        <WhiteBar id={StoryNavbarClasses["storyNavbar"]} containerClasses='sticky top-0 pt-4 !px-0 bg-background-secondary' white px={2}>
                            <StoryNavbar userId={userId} storyName={storyName} toggleIndexModal={toggleOpenIndex} />
                        </WhiteBar>

                        :

                        <SwipeableEdgeDrawer
                            pullerContent={<StoryNavbar userId={userId} storyName={storyName} indexModalState={showRelevantSections ? openIndex : true} toggleIndexModal={toggleOpenIndex} />}
                            drawerContent={[
                                <RelevantSections isMobile />,
                                <>CIAO</>
                            ]}
                            indexModalState={showRelevantSections ? openIndex : true}
                            closeIndexModal={showRelevantSections ? closeIndexModal : undefined}
                        />
                    }

                    <Grid container spacing={6} className='w-full py-4 mx-4 lg:mx-0 mt-2 md:mt-0' style={{ maxWidth: '-webkit-fill-available' }}>
                        <Grid item xs={12} md={story.relevantSections ? 7 : 12} className='h-full !px-6 pb-8 md:pb-0'>
                            <Box>
                                <Typography variant="h1" fontWeight='bold'>{story.title}</Typography>

                                <Box className='mt-4'>
                                    <HtmlContent>
                                        {story.text}
                                    </HtmlContent>
                                </Box>
                            </Box>
                        </Grid>
                        <ShowIf condition={showRelevantSections}>
                            <Grid item xs={12} md={5} className='h-full sticky top-8 !px-6'>
                                {isGreaterThanMd ? <RelevantSections /> : <></>}
                            </Grid>
                        </ShowIf>
                    </Grid>
                </Container>

            </Box>

            <StoryIndexModal story={story} open={isGreaterThanMd && openIndex} toggleModal={toggleOpenIndex} />

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
    return (
        <DiaryLayout>
            {page}
        </DiaryLayout>
    )
}

export default Story;