import ShowIf from '@/components/utils/showIf';
import StoriesFilters from '@/components/whiteBar/storiesFilters';
import userClasses from '@/pages/users/[userId]/styles/shared.module.scss';
import tailwindConfig from '@/tailwind.config.js';
import { Avatar, Box, Button, Divider, Grid, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useTranslation } from 'next-i18next';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const DiaryLayout = ({ children, title }) => {

    const { t } = useTranslation(['user-diary', 'user-home']);
    const { colors } = tailwindConfig.theme;

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
                                <div className={userClasses.scrollGradientMainStory + ' overflow-y-scroll hide-scrollbar'}>
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

            <ShowIf condition={title !== undefined && title !== ''}>
                <Box className='pt-10'>
                    <Typography variant="h1" textAlign='center'>{title}</Typography>
                </Box>
            </ShowIf>

            <Box id="diary-breadcrumbs" className={(title === undefined ? 'mt-10' : 'mt-8') + ' w-fit mx-auto'}>
                <NextBreadcrumbs />
            </Box>

            <Box id="diary-stories-filter">
                <StoriesFilters />
            </Box>

            {children}

        </>
    );
}

export default DiaryLayout;


const NextBreadcrumbs = () => {
    // Gives us ability to load the current route details
    const router = useRouter();
    const { userId } = router.query;

    const breadcrumbs = useMemo(function generateBreadcrumbs() {
        const asPathWithoutQuery = router.asPath.split("?")[0];
        const asPathNestedRoutes = asPathWithoutQuery.split("/")
            .filter(v => v.length > 0);

        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");

            // If href is /, or /users, or /users/user*, etc, we want to show the text as "Home". Only one time.
            if (href === "/" || href === "/users" || href === `/users/${userId}`) {
                return { href: `/users/${userId}/home`, text: "Home" };
            }

            // Capitalize subpath:
            subpath = subpath.charAt(0).toUpperCase() + subpath.slice(1);

            return { href, text: subpath };
        })

        const uniqueCrumblist = crumblist.filter((crumb, idx, self) =>
            idx === self.findIndex((c) => (
                c.href === crumb.href && c.text === crumb.text
            ))
        );

        return [...uniqueCrumblist];
    }, [router.asPath]);

    return (
        /* The old breadcrumb ending with '/>' was converted into this */
        <Breadcrumbs aria-label="breadcrumb">
            {/*
            Iterate through the crumbs, and render each individually.
            We "mark" the last crumb to not have a link.
          */}
            {breadcrumbs.map((crumb, idx) => (
                <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
            ))}
        </Breadcrumbs>
    );
}

// Each individual "crumb" in the breadcrumbs list
function Crumb({ text, href, last = false }) {
    
    const { colors } = tailwindConfig.theme;

    // The last crumb is rendered as normal text since we are already on the page
    if (last) {
        return <Typography color={colors.dark.main}>{text}</Typography>
    }

    // All other crumbs will be rendered as links that can be visited
    return (
        <Link underline="hover" href={href}>
            <Typography color={colors.text.main}>{text}</Typography>
        </Link>
    );
}