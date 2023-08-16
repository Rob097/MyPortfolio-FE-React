import StoryCard from '@/components/storyCard';
import WhiteBar from '@/components/whiteBar';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import SoftButton from '@rob097/common-lib/components/SoftButton';
import SoftInput from '@rob097/common-lib/components/SoftInput';
import SoftTypography from '@rob097/common-lib/components/SoftTypography';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';
import classes from "../../userProfile.module.scss";

const categoryNames = [
    'Professional Experiences',
    'Personal Projects',
    'Educations'
];

const Diary = () => {
    const { t } = useTranslation(['user-diary', 'user-home']);
    const { palette } = useTheme();
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    const [filterBy, setFilterBy] = useState('');
    const [categories, setCategories] = useState(categoryNames);

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

    const router = useRouter();
    const { userId } = router.query;

    return (
        <>
            <Box id='main-story-section' component='section' className='mt-12 xl:mt-0 pt-10 flex justify-center' sx={{ backgroundImage: `linear-gradient(180deg, transparent, ${palette.background.default} 50%);` }}>

                <Grid container className='mx-8' sx={({ breakpoints }) => ({ maxWidth: breakpoints.values.xxl })}>
                    <Grid item xs={12} md={4} height='25em' marginBottom={2} className='h-fit md:h-full' style={{ zIndex: '1' }}>
                        <Box className='flex justify-center items-center h-fit md:h-full'>
                            <Box className='w-fit flex md:justify-start md:items-start justify-center items-center flex-col'>
                                <Avatar id="personalCardAvatar" src="https://mui.com/static/images/avatar/1.jpg" sx={{ width: 150, height: 150 }} variant='circular' />
                                <SoftTypography variant="h3" fontWeight="bold" color="primary" textAlign={{ xs: 'center', md: 'left' }}>Roberto Dellantonio</SoftTypography>
                                <SoftTypography variant="subtitle1" fontWeight="bold" color="dark">Predazzo, TN</SoftTypography>
                                <SoftTypography variant="subtitle2" fontWeight="bold" color="text" mt={2}>Software Engineer</SoftTypography>
                                <Box mt={3}>
                                    <SoftButton variant="contained" color="primary" size="medium" sx={{ borderRadius: '50px' }}>Hire Me</SoftButton>
                                    <SoftButton variant="outlined" color="primary" size="medium" className="ml-2" sx={{ borderRadius: '50px' }}>Following</SoftButton>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8} height='25em' marginBottom={2} className='flex justify-center items-center'>
                        <Box className='absolute w-full h-96 left-0'>
                            <div className='w-3/5 md:w-2/5 h-full mr-0 ml-auto rounded-s-2xl' style={{ backgroundColor: palette.dark.main, opacity: 0.9 }} ></div>
                        </Box>
                        <Box className='flex justify-center h-fit items-end'>
                            <div className='relative flex flex-col w-full h-full max-h-80 bg-white rounded-2xl pl-16 pr-16 pt-8 pb-8' style={{ boxShadow: 'rgb(0 0 0 / 10%) -8px 8px 20px 5px', minHeight: '40%' }}>
                                <img src='/images/Group.svg' className='absolute top-0 left-0 ml-4 mt-4' />
                                <SoftTypography variant="h5" fontWeight="bold" color="primary">{t('user-home:about-me.title')}</SoftTypography>
                                <div className={classes.scrollGradientMainStory + ' overflow-y-scroll hide-scrollbar'}>
                                    <SoftTypography variant="body2" className='leading-7'>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo. Sed euismod, diam id tincidunt dapibus, ipsum diam aliquet nunc, sed tincidunt nisl velit eget justo.
                                    </SoftTypography>
                                </div>
                                <img src='/images/Group.svg' className='absolute bottom-0 right-0 mr-4 mb-4' />
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Divider variant="middle" className='opacity-100' />

            <WhiteBar height='6rem'>
                <Box className='flex items-center w-full h-full'>
                    <Box className='ml-2'>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="categories-select-label"
                                sx={({ palette: { text }, functions: { rgba } }) => ({
                                    color: rgba(text.main, 0.9),
                                })}
                            >Categories</InputLabel>
                            <Select
                                labelId="categories-select-label"
                                id="categories-select"
                                multiple
                                value={categories}
                                onChange={handleChangeCategory}
                                renderValue={(selected) => selected.length === categoryNames.length ? 'All' : selected.join(', ')}
                                inputProps={{ MenuProps: { disableScrollLock: true } }}
                            >
                                {categoryNames.map((name) => (
                                    <MenuItem key={name} value={name}>
                                        <Checkbox checked={categories.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className="ml-2">
                        <SoftInput placeholder='Search by name' size="small" />
                    </Box>
                    <Box className="absolute right-0 top-0 h-full flex items-center mr-8">
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="sort-select-label"
                                sx={({ palette: { text }, functions: { rgba } }) => ({
                                    color: rgba(text.main, 0.9),
                                })}
                            >Sort</InputLabel>
                            <Select
                                labelId="sort-select-label"
                                id="sort-select"
                                value={filterBy}
                                label="Age"
                                onChange={handleChange}
                                inputProps={{ MenuProps: { disableScrollLock: true } }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'dateUp'}>Date Up</MenuItem>
                                <MenuItem value={'dateDown'}>Date Down</MenuItem>
                                <MenuItem value={'name'}>Name</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </WhiteBar>


            <Box id="diary-stories" component='section' className={classes.section} sx={{ backgroundImage: `linear-gradient(180deg, transparent 80%, ${palette.background.default} 90%);` }}>
                <Box id='professional-experiences-section' component='section' className='mt-12 xl:mt-0 pt-10 flex'>

                    <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'mx-8'}>
                        <SoftTypography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>My Professional Experiences</SoftTypography>

                        <Grid container className='mt-4' spacing={2}>
                            <Grid item xs={12} sm={6} lg={3} className='flex justify-center sm:justify-start items-start'>
                                <StoryCard
                                    image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                                    title="My First Experience"
                                    preview="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica. Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica. Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica. Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica."
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
                                    <ArrowForwardIosIcon color='black' fontSize='large' />
                                </Avatar>
                            </Grid>
                        </Grid>

                    </Container>

                </Box>

                <Box id='personal-projects-section' component='section' className='mt-12 xl:mt-0 pt-10 flex'>

                    <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>
                        <SoftTypography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>My Personal Projects</SoftTypography>

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
                                    <ArrowForwardIosIcon color='black' fontSize='large' />
                                </Avatar>
                            </Grid>
                        </Grid>
                    </Container>

                </Box>

                <Box id='educations-section' component='section' className='mt-12 xl:mt-0 pt-10 flex'>

                    <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>
                        <SoftTypography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>My Educations</SoftTypography>

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
                                    <ArrowForwardIosIcon color='black' fontSize='large' />
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
