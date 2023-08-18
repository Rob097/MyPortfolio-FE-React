import StoryCard from '@/components/storyCard';
import WhiteBar from '@/components/whiteBar';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import _without from 'lodash/without';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classes from "../../userProfile.module.scss";
import Link from 'next/link';
import { experienceStories } from '@/data/mock/stories';
import StoriesFilters from '@/components/whiteBar/storiesFilters';
import tailwindConfig from '@/tailwind.config.js';
import { useTheme } from "@mui/material";

const skills = [
    'Angular',
    'React',
    'Vue',
    'Java',
    'Spring boot',
    'Docker',
    'Kubernetes'
];

const Diary = () => {
    const { t } = useTranslation(['user-diary', 'user-home', 'common']);
    const { colors } = tailwindConfig.theme;
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    const categoriesMock = [
        { id: 1, name: t('categories.list.professional-experiences') },
        { id: 2, name: t('categories.list.personal-projects') },
        { id: 3, name: t('categories.list.educations') },
    ];

    const [filterBy, setFilterBy] = useState('');
    const [filteredSkills, setFilteredSkills] = useState([]);
    const [categories, setCategories] = useState(categoriesMock.map(({ id }) => id));

    const handleChange = (event) => {
        setFilterBy(event.target.value);
    };

    const handleChangeCategory = (event) => {
        const {
            target: { value },
        } = event;
        setCategories(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeSkills = (event) => {
        const {
            target: { value },
        } = event;
        setFilteredSkills(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleDeleteSkill = (e, value) => {
        e.preventDefault();
        setFilteredSkills((current) => _without(current, value));
    };

    const router = useRouter();
    const { userId } = router.query;

    return (
        <>
            <Box id='main-story-section' component='section' className='mt-12 xl:mt-0 pt-10 flex justify-center' sx={{ backgroundImage: `linear-gradient(180deg, transparent, ${colors.background.main} 50%);` }}>

                <Grid container className='mx-8' sx={({ breakpoints }) => ({ maxWidth: breakpoints.values['2xl'] })}>
                    <Grid item xs={12} md={4} height='25em' marginBottom={2} className='h-fit md:h-full' style={{ zIndex: '1' }}>
                        <Box className='flex justify-center items-center h-fit md:h-full'>
                            <Box className='w-fit flex md:justify-start md:items-start justify-center items-center flex-col'>
                                <Avatar id="personalCardAvatar" src="https://mui.com/static/images/avatar/1.jpg" sx={{ width: 150, height: 150 }} variant='circular' />
                                <Typography variant="h3" fontWeight="bold" color="primary" textAlign={{ xs: 'center', md: 'left' }}>Roberto Dellantonio</Typography>
                                <Typography variant="subtitle1" fontWeight="bold" color="dark">Software Engineer</Typography>
                                <Typography variant="subtitle2" fontWeight="bold" color="text" mt={2}>Predazzo, TN</Typography>
                                <Box mt={3}>
                                    <Button variant="contained" color="primary" size="medium" sx={{ borderRadius: '50px' }}>{t('hire-me')}</Button>
                                    <Button variant="outlined" color="primary" size="medium" className="ml-2" sx={{ borderRadius: '50px' }}>{t('follow-me')}</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8} height='25em' marginBottom={2} className='flex justify-center items-center'>
                        <Box className='absolute w-full h-96 left-0'>
                            <div className='w-3/5 md:w-2/5 h-full mr-0 ml-auto rounded-s-2xl bg-dark-main' style={{ opacity: 0.9 }} ></div>
                        </Box>
                        <Box className='flex justify-center h-fit items-end'>
                            <div className='relative flex flex-col w-full h-full max-h-80 bg-white rounded-2xl pl-16 pr-16 pt-8 pb-8' style={{ boxShadow: 'rgb(0 0 0 / 10%) -8px 8px 20px 5px', minHeight: '40%' }}>
                                <img src='/images/Group.svg' className='absolute top-0 left-0 ml-4 mt-4' />
                                <Typography variant="h5" fontWeight="bold" color="primary">{t('user-home:about-me.title')}</Typography>
                                <div className={classes.scrollGradientMainStory + ' overflow-y-scroll hide-scrollbar'}>
                                    <Typography variant="body2" className='leading-7'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                    </Typography>
                                </div>
                                <img src='/images/Group.svg' className='absolute bottom-0 right-0 mr-4 mb-4' />
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Divider variant="middle" className='opacity-100' />

            <StoriesFilters />

            <Box id="diary-stories" component='section' className={classes.section} sx={{ backgroundImage: `linear-gradient(180deg, transparent 80%, ${colors.background.main} 90%);` }}>
                <Box id='professional-experiences-section' component='section' className='mt-12 xl:mt-0 flex'>

                    <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'sm:mx-8'}>
                        <Typography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>{t('categories.list.professional-experiences')}</Typography>

                        <Grid container className='mt-4' spacing={2}>

                            {
                                experienceStories.slice(0, 3).map(({ id, title, preview, date, skills, image }) => (
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
                            
                            <Grid item xs={12} sm={6} lg={3} className='flex justify-center items-center'>
                                <Link href='/users/[userId]/experiences' as={`/users/${userId}/experiences`}>
                                <Avatar variant='rounding' className='bg-white shadow-lg cursor-pointer active:shadow-inner' sx={{ width: 100, height: 100 }}>
                                    <ArrowForwardIosIcon color='dark' fontSize='large' className='z-10' />
                                </Avatar>
                                </Link>
                            </Grid>
                        </Grid>

                    </Container>

                </Box>

                <Box id='personal-projects-section' component='section' className='mt-12 xl:mt-0 pt-10 flex'>

                    <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'sm:mx-8'}>
                        <Typography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>{t('categories.list.personal-projects')}</Typography>

                        <Grid container className='mt-4' spacing={2}>
                            <Grid item xs={12} sm={6} lg={3} className='flex justify-center sm:justify-start items-start'>
                                <StoryCard
                                    title="My First Experience"
                                    preview="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica."
                                    date="10/08/2023"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={3} className='flex justify-center sm:justify-start items-start'>
                                <StoryCard
                                    title="My Second Experience"
                                    preview="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica."
                                    date="11/08/2023"
                                    skills={['Design', 'Rendering']}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={3} className='flex justify-center sm:justify-start items-start'>
                                <StoryCard
                                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                                    title="My Third Experience"
                                    preview="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica."
                                    date="12/08/2023"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={3} className='flex justify-center items-center'>
                                <Avatar variant='rounding' className='bg-white shadow-lg cursor-pointer active:shadow-inner' sx={{ width: 100, height: 100 }}>
                                    <ArrowForwardIosIcon color='dark' fontSize='large' className='z-10' />
                                </Avatar>
                            </Grid>
                        </Grid>
                    </Container>

                </Box>

                <Box id='educations-section' component='section' className='mt-12 xl:mt-0 pt-10 flex'>

                    <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'sm:mx-8'}>
                        <Typography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>{t('categories.list.educations')}</Typography>

                        <Grid container className='mt-4' spacing={2}>
                            <Grid item xs={12} sm={6} lg={3} className='flex justify-center sm:justify-start items-start'>
                                <StoryCard
                                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                                    title="My First Experience"
                                    preview="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica."
                                    date="10/08/2023"
                                    skills={['Java', 'React', 'Spring boot', 'Docker', 'Kubernetes']}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={3} className='flex justify-center sm:justify-start items-start'>
                                <StoryCard
                                    title="My Second Experience"
                                    preview="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica."
                                    date="11/08/2023"
                                    skills={['Design', 'Rendering']}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={3} className='flex justify-center sm:justify-start items-start'>
                                <StoryCard
                                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                                    title="My Third Experience"
                                    preview="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica."
                                    date="12/08/2023"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={3} className='flex justify-center items-center'>
                                <Avatar variant='rounding' className='bg-white shadow-lg cursor-pointer active:shadow-inner' sx={{ width: 100, height: 100 }}>
                                    <ArrowForwardIosIcon color='dark' fontSize='large' className='z-10' />
                                </Avatar>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
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

export default Diary;
