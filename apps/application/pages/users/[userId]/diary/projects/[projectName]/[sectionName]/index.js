import RelevantSections from '@/components/cards/sectionCard/relevantSections';
import StoryNavbar from '@/components/navbar/storyNavbar';
import HtmlContent from '@/components/utils/htmlContent';
import ShowIf from '@/components/utils/showIf';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { projectStories } from '@/data/mock/stories';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import DiaryLayout from '@/layouts/DiaryLayout';
import { Box, Container, Grid, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const StorySection = ({ project, section }) => {

    if (!project || !section) throw new Error('Project or section not found');


    const router = useRouter();
    const { userId, projectName } = router.query;

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');
    const isGreaterThanMd = isGreaterThan('md');

    const showRelevantSections = section.relevantSections !== undefined && section.relevantSections.length > 0;

    return (
        <>
            <Box id='mainProjectSection' component='section' className='relative flex md:z-50 bg-background-secondary'>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>

                    <StoryNavbar userId={userId} story={project} section={section} />

                    <Grid container spacing={6} className='w-full py-4 mx-4 lg:mx-0 mt-2 md:mt-0 mb-10 md:mb-0' style={{ maxWidth: '-webkit-fill-available' }}>
                        <Grid item xs={12} md={7} className='h-full !px-6 pb-8 md:pb-0'>
                            <Box>
                                <Typography variant="h1" fontWeight='bold'>{section.title}</Typography>

                                <Box className='mt-4'>
                                    <HtmlContent>
                                        {section.text}
                                    </HtmlContent>
                                </Box>
                            </Box>
                        </Grid>
                        <ShowIf condition={showRelevantSections && isGreaterThanMd}>
                            <Grid item xs={12} md={5} className='h-full sticky top-8 !px-6'>
                                <RelevantSections section={section} />
                            </Grid>
                        </ShowIf>
                    </Grid>
                </Container>

            </Box>

        </>
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
                    projectName: 'my-first-project',
                    sectionName: 'my-first-section',
                },
                locale
            }
        );
        paths.push(
            {
                params: {
                    userId: 'user1',
                    projectName: 'my-first-project',
                    sectionName: 'my-second-section'
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

    const { userId, projectName, sectionName } = params;

    // Use projectName to find the project in projectStories that has the same slug
    const project = projectStories.find(project => project.slug === projectName);
    const section = project.sections?.find(section => section.slug === sectionName);

    return {
        props: {
            // pass the translation props to the page component
            ...(await serverSideTranslations(locale)),
            project,
            section
        },
    }
}

StorySection.getLayout = (page) => {
    return (
        <DiaryLayout>
            {page}
        </DiaryLayout>
    )
}

export default StorySection