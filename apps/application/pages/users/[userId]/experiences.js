import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import Container from '@mui/material/Container';
import StoryCard from '@/components/storyCard';
import { experienceStories } from '@/data/mock/stories';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/router';
import StoriesFilters from '@/components/whiteBar/storiesFilters';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import tailwindConfig from '@/tailwind.config.js';

const Experiences = () => {

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const { colors } = tailwindConfig.theme;

    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    const router = useRouter();
    const { userId } = router.query;

    return (
        <Box className='py-20'>
            <Box id='header-section' component='section' className='mt-12 xl:mt-0 flex justify-center' sx={{ backgroundImage: `linear-gradient(180deg, transparent, ${colors.background.main} 50%);` }}>
                <Box className="w-full mt-20 pb-20">
                    <Typography variant="h1" textAlign='center'>Experiences & Educations</Typography>
                    <Box className="mt-20">
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} className='flex justify-center md:justify-end items-center'>
                                <Button variant="contained" color="secondary" size="large" sx={{ borderRadius: '50px' }}>Timeline</Button>
                            </Grid>
                            <Grid item xs={12} md={6} className='flex justify-center md:justify-start items-center'>
                                <Button variant="contained" color="secondary" size="large" sx={{ borderRadius: '50px' }}>Stories</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>

            <Box id='timeline-section' component='section' className='mt-12 xl:mt-0 pt-10'>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'sm:mx-8'}>
                    <Typography variant="h2">Timeline</Typography>
                    <Box className="w-full h-4 mt-20 bg-white shadow-xl rounded-lg">
                    </Box>
                </Container>
            </Box>

            <Box id='stories-section' component='section' className='mt-12 xl:mt-0 pt-10'>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'sm:mx-8'}>
                    
                    <StoriesFilters />

                    <Typography variant="h2" className='mt-10'>Stories</Typography>
                    <Box className="w-full mt-20">
                        <Grid container className='mt-4' spacing={2}>
                            {
                                experienceStories.map(({ id, title, preview, date, skills, image }) => (
                                    <Grid key={id} item xs={12} sm={6} lg={3} className='flex justify-center sm:justify-start items-start'>
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