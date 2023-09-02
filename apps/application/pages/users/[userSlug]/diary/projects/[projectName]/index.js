import StoryNavbar from '@/components/navbar/storyNavbar';
import HtmlContent from '@/components/utils/htmlContent';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { projectStories } from '@/data/mock/stories';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import DiaryLayout from '@/layouts/DiaryLayout';
import { Box, Container, Grid, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import ProjectsTree from '@/components/tree/projectsTree'
import ShowIf from '@/components/utils/showIf';

const Project = ({ project }) => {
    const router = useRouter();
    const { userSlug, projectName } = router.query;

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');
    const isGreaterThanMd = isGreaterThan('md');

    return (
        <>
            <Box id='mainProjectSection' component='section' className='relative flex md:z-50 bg-background-secondary'>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>

                    <StoryNavbar userSlug={userSlug} story={project} />

                    {/* Add the project image: */}
                    <Box className='relative w-full h-96 md:h-128 px-6'>
                        <img src={project.image} alt={project.title} className='object-cover w-full h-full rounded-xl shadow-2xl shadow-slate-900' />
                    </Box>

                    <Grid container spacing={6} className='w-full py-4 mx-4 lg:mx-0 mt-2 md:mt-0' style={{ maxWidth: '-webkit-fill-available' }}>
                        <Grid item xs={12} md={7} className='h-full !px-6 pb-20 md:pb-0'>
                            <Box>
                                <Typography variant="h1" fontWeight='bold'>{project.title}</Typography>

                                <Box className='mt-4'>
                                    <HtmlContent>
                                        {project.text}
                                    </HtmlContent>
                                </Box>
                            </Box>
                        </Grid>
                        <ShowIf condition={isGreaterThanMd}>
                            <Grid item xs={12} md={5}>
                                <ProjectsTree project={project} />
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
                    userSlug: 'user1',
                    projectName: 'my-first-project'
                },
                locale
            }
        );
        paths.push(
            {
                params: {
                    userSlug: 'user1',
                    projectName: 'my-second-project'
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

    const { userSlug, projectName } = params;

    // Use projectName to find the project in projectStories that has the same slug
    const project = projectStories.find(project => project.slug === projectName);

    return {
        props: {
            // pass the translation props to the page component
            ...(await serverSideTranslations(locale)),
            project
        },
    }
}

Project.getLayout = (page) => {
    return (
        <DiaryLayout>
            {page}
        </DiaryLayout>
    )
}

export default Project