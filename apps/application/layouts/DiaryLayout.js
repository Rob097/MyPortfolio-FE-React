import MainStorySection from '@/components/sections/MainStorySection';
import ConditionalWrapper from '@/components/utils/conditionalWrapper';
import ShowIf from '@/components/utils/showIf';
import tailwindConfig from '@/tailwind.config.js';
import { Avatar, Box, Button, Divider, Grid, Tooltip, Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const DiaryLayout = ({ children, title, id, showStoryFilters, showBreadcrumbs, pageBG, user }) => {
    const { t, i18n } = useTranslation(['user-diary', 'user-home']);
    const { colors } = tailwindConfig.theme;

    const router = useRouter();
    const { userSlug } = router.query;

    const mainStory = useMemo(() => {
        return user?.diaries?.find(diary => diary?.stories?.find(story => story?.id === user?.mainStoryId))?.stories?.find(story => story?.id === user?.mainStoryId);
    }, [user]);

    const cvUrl = useMemo(() => {
        return JSON.parse(user?.customizations)?.CV?.[i18n.language] || JSON.parse(user?.customizations)?.CV?.en;
    }, [user, i18n.language]);

    return (
        <>

            <Box id='main-story-section' component='section' className='mt-12 xl:mt-0 pt-10 flex justify-center' sx={{ backgroundImage: `linear-gradient(180deg, transparent, ${colors.background.main} 50%);` }}>

                <Grid container className='mx-8' sx={({ breakpoints }) => ({ maxWidth: breakpoints.values['2xl'] })}>
                    <Grid item xs={12} md={4} height='25em' marginBottom={2} className='h-fit md:h-full' style={{ zIndex: '1' }}>
                        <Box className='flex justify-center items-center h-fit md:h-full'>
                            <Box className='w-fit flex md:justify-start md:items-start justify-center items-center flex-col'>
                                {/* <Avatar id="personalCardAvatar" src={JSON.parse(user?.customizations)?.profileImage} sx={{ width: 150, height: 150 }} variant='circular' /> */}
                                <Image id="personalCardImage" src={JSON.parse(user?.customizations)?.profileImage} width={150} height={150} style={{ width: '150px', height: '150px' }} className='rounded-full object-cover' alt={`${user?.firstName} ${user?.lastName}`} />
                                <Link href='/users/[userSlug]/home' as={`/users/${userSlug}/home`}>
                                    <Typography variant="h3" fontWeight="bold" color="primary" textAlign={{ xs: 'center', md: 'left' }}>{`${user?.firstName} ${user?.lastName}`}</Typography>
                                </Link>
                                <Typography variant="subtitle1" fontWeight="bold" color="dark">{user?.profession}</Typography>
                                <Typography variant="subtitle2" fontWeight="bold" color="text" mt={2}>{`${user?.address?.city}, ${user?.address?.nation}`}</Typography>
                                <Box mt={3}>
                                    <Link href={cvUrl} download target="_blank" rel="noopener noreferrer">
                                        <Button variant="contained" color="primary" size="medium" sx={{ borderRadius: '50px' }}>
                                            <Typography variant="button" color="white">{t('user-home:download-cv')}</Typography>
                                        </Button>
                                    </Link>
                                    <Link href='/users/[userSlug]/home#contact-section' as={`/users/${userSlug}/home#contact-section`}>
                                        <Button variant="outlined" color="primary" size="medium" className="ml-2" sx={{ borderRadius: '50px' }}>{t('user-home:contact-me.title')}</Button>
                                    </Link>
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

            <Box className={pageBG} id="main-content">
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
                    <Box id="diary-breadcrumbs" className={(title === undefined ? 'pt-10' : 'pt-8') + ' w-auto mx-10'}>
                        <NextBreadcrumbs />
                    </Box>
                </ShowIf>

                {/* <ShowIf condition={showStoryFilters === true}>
                    <Box id="diary-stories-filter">
                        <StoriesFilters />
                    </Box>
                </ShowIf> */}
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
        <Box className="max-w-screen-xl mx-auto overflow-x-scroll hide-scrollbar">
            <Breadcrumbs aria-label="breadcrumb" className='w-max mx-auto'>
                {/*
                    Iterate through the crumbs, and render each individually.
                    We "mark" the last crumb to not have a link.
                */}
                {breadcrumbs.map((crumb, idx) => (
                    <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
                ))}
            </Breadcrumbs>
        </Box>
    );
}

// Each individual "crumb" in the breadcrumbs list
function Crumb({ text, href, last = false }) {
    const { colors } = tailwindConfig.theme;
    const isHome = text === "Home";

    let originalText = text;
    // If subpath is longer than 30 characters, show the first 20 followed by '...' and the last 5
    if (text.length > 30) {
        text = text.substring(0, 20) + '...' + text.substring(text.length - 5);
    }

    // The last crumb is rendered as normal text since we are already on the page
    if (last) {
        return (
            <ConditionalWrapper
                condition={originalText.length > 30}
                wrapper={children => <Tooltip placement="top" arrow title={originalText}>{children}</Tooltip>}
            >
                <Typography color={colors.dark.main}>{text}</Typography>
            </ConditionalWrapper>
        )
    }

    // All other crumbs will be rendered as links that can be visited
    return (
        <ConditionalWrapper
            condition={originalText.length > 30}
            wrapper={children => <Tooltip placement="top" arrow title={originalText}>{children}</Tooltip>}
        >
            <Link underline="hover" href={href} scroll={isHome}>
                <Typography color={colors.text.main}>{text}</Typography>
            </Link>
        </ConditionalWrapper>
    );
}