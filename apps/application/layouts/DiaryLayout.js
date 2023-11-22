import MainStorySection from '@/components/sections/MainStorySection';
import ShowIf from '@/components/utils/showIf';
import StoriesFilters from '@/components/whiteBar/storiesFilters';
import tailwindConfig from '@/tailwind.config.js';
import { Avatar, Box, Button, Divider, Grid, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useTranslation } from 'next-i18next';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const DiaryLayout = ({ children, title, id, showStoryFilters, showBreadcrumbs, pageBG, user }) => {
    const { t } = useTranslation(['user-diary', 'user-home']);
    const { colors } = tailwindConfig.theme;

    const mainStory = useMemo(() => {
        return user?.diaries?.find(diary => diary?.stories?.find(story => story?.id === user?.mainStoryId))?.stories?.find(story => story?.id === user?.mainStoryId);
    }, [user]);

    return (
        <>

            <Box id='main-story-section' component='section' className='mt-12 xl:mt-0 pt-10 flex justify-center' sx={{ backgroundImage: `linear-gradient(180deg, transparent, ${colors.background.main} 50%);` }}>

                <Grid container className='mx-8' sx={({ breakpoints }) => ({ maxWidth: breakpoints.values['2xl'] })}>
                    <Grid item xs={12} md={4} height='25em' marginBottom={2} className='h-fit md:h-full' style={{ zIndex: '1' }}>
                        <Box className='flex justify-center items-center h-fit md:h-full'>
                            <Box className='w-fit flex md:justify-start md:items-start justify-center items-center flex-col'>
                                <Avatar id="personalCardAvatar" src="/images/profileImage.JPG" sx={{ width: 150, height: 150 }} variant='circular' />
                                <Typography variant="h3" fontWeight="bold" color="primary" textAlign={{ xs: 'center', md: 'left' }}>{`${user?.firstName} ${user?.lastName}`}</Typography>
                                <Typography variant="subtitle1" fontWeight="bold" color="dark">{user?.profession}</Typography>
                                <Typography variant="subtitle2" fontWeight="bold" color="text" mt={2}>{`${user?.address?.city}, ${user?.address?.nation}`}</Typography>
                                <Box mt={3}>
                                    <Button variant="contained" color="primary" size="medium" sx={{ borderRadius: '50px' }}>{t('user-home:contact-me.title')}</Button>
                                    <Button variant="outlined" color="primary" size="medium" className="ml-2" sx={{ borderRadius: '50px' }}>{t('follow-me')}</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8} height='25em' marginBottom={2} className='flex justify-center items-center'>
                        <MainStorySection mainStory={mainStory} />
                    </Grid>
                </Grid>
            </Box>

            <Divider variant="middle" className='opacity-100' />

            <Box className={pageBG}>
                <ShowIf condition={title !== undefined && title !== ''}>
                    <Box id={id} className='pt-10'>
                        <Typography variant="h1" textAlign='center'>
                            {
                                title && title.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                            }
                        </Typography>
                    </Box>
                </ShowIf>

                <ShowIf condition={showBreadcrumbs === true}>
                    <Box id="diary-breadcrumbs" className={(title === undefined ? 'pt-10' : 'pt-8') + ' w-fit mx-auto'}>
                        <NextBreadcrumbs />
                    </Box>
                </ShowIf>

                <ShowIf condition={showStoryFilters === true}>
                    <Box id="diary-stories-filter">
                        <StoriesFilters />
                    </Box>
                </ShowIf>
            </Box>

            {children}

        </>
    );
}

export default DiaryLayout;


const NextBreadcrumbs = () => {

    // Gives us ability to load the current route details
    const router = useRouter();
    const { userSlug } = router.query;

    const { t, i18n } = useTranslation('user-diary', { lng: router.locale });

    const breadcrumbs = useMemo(function generateBreadcrumbs() {
        const asPathWithoutQuery = router.asPath.split("?")[0];
        const asPathNestedRoutes = asPathWithoutQuery.split("/")
            .filter(v => v.length > 0);

        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");

            // If href is /, or /users, or /users/user*, etc, we want to show the text as "Home". Only one time.
            if (href === "/" || href === "/users" || href === `/users/${userSlug}`) {
                return { href: `/users/${userSlug}/home`, text: "Home" };
            }

            // if subpath has the character '#' followed by some text, we want to remove it
            if (subpath.includes("#")) {
                subpath = subpath.split("#")[0];
            }

            // translate subpath:
            subpath = i18n.exists('user-diary:' + subpath) ? t(subpath) : (i18n.exists('user-diary:' + 'categories.list.' + subpath) ? t('categories.list.' + subpath) : subpath);

            // Capitalize subpath:
            subpath = subpath.charAt(0).toUpperCase() + subpath.slice(1);

            // Replace '-' and '_' with ' ':
            subpath = subpath.replace(/-/g, ' ').replace(/_/g, ' ');

            return { href, text: subpath };
        })

        const uniqueCrumblist = crumblist.filter((crumb, idx, self) =>
            idx === self.findIndex((c) => (
                c.href === crumb.href && c.text === crumb.text
            ))
        );

        return [...uniqueCrumblist];
    }, [router.asPath, router.locale, t]);

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
    const isHome = text === "Home";

    // The last crumb is rendered as normal text since we are already on the page
    if (last) {
        return <Typography color={colors.dark.main}>{text}</Typography>
    }

    // All other crumbs will be rendered as links that can be visited
    return (
        <Link underline="hover" href={href} scroll={isHome}>
            <Typography color={colors.text.main}>{text}</Typography>
        </Link>
    );
}