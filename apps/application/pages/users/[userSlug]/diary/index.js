import SquareCard from '@/components/cards/squareCard';
import ShowIf from '@/components/utils/showIf';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import DiaryLayout from '@/layouts/DiaryLayout';
import { View } from '@/models/criteria.model';
import { User } from '@/models/user.model';
import { fetcher } from '@/services/base.service';
import UserService, { useUser } from '@/services/user.service';
import tailwindConfig from '@/tailwind.config.js';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import userClasses from '../styles/shared.module.scss';

const Diary = () => {
    const { t } = useTranslation(['user-diary', 'user-home', 'common']);
    const { colors } = tailwindConfig.theme;
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    const router = useRouter();
    const { userSlug } = router.query;
    const { user, isError } = useUser(userSlug, 'verbose');

    useEffect(() => {
        if (isError !== undefined && isError != null) {
            throw isError;
        }
    }, [isError]);

    return (
        <>
            <Box id="diary-stories" component='section' className={userClasses.section} sx={{ backgroundImage: `linear-gradient(180deg, transparent 80%, ${colors.background.main} 90%);` }}>
                <ShowIf condition={user.experiences?.length > 0}>
                    <Box id='professional-experiences-section' component='section' className='mt-12 xl:mt-0 flex'>

                        <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'sm:mx-8'}>
                            <Typography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>{t('categories.list.personal-experiences')}</Typography>

                            <Grid container className='mt-4' spacing={2}>

                                {
                                    user.experiences.slice(0, 3).map((experience) => (
                                        <Grid key={experience.id} item xs={12} sm={6} lg={user.experiences.length > 3 ? 3 : 4} className='flex justify-center sm:justify-start items-start'>
                                            <SquareCard
                                                image={experience.image}
                                                title={experience.title}
                                                subtitle={experience.company}
                                                description={experience.description}
                                                chips={experience.skills}
                                                bottomCaption={new Date(experience.fromDate || experience.updatedAt).toLocaleDateString("it-IT") + (experience.toDate ? " - " + new Date(experience.toDate).toLocaleDateString("it-IT") : "")}
                                                buttons={[
                                                    {
                                                        label: t('common:read-more'),
                                                        link: `/users/${userSlug}/diary/experiences/${experience.slug}#mainEntityStory`
                                                    }
                                                ]}
                                            />
                                        </Grid>
                                    ))
                                }

                                <ShowIf condition={user.experiences.length > 3}>
                                    <Grid item xs={12} sm={6} lg={3} className='flex justify-center items-center'>
                                        <Tooltip title={user.experiences.length + " " + t('common:stories')} placement="top" arrow TransitionComponent={Zoom}>
                                            <Link href='/users/[userSlug]/diary/experiences#experiences' as={`/users/${userSlug}/diary/experiences#experiences`}>
                                                <Avatar variant='rounding' className='bg-white shadow-lg cursor-pointer active:shadow-inner' sx={{ width: 100, height: 100 }}>
                                                    <ArrowForwardIosIcon color='dark' fontSize='large' className='z-10' />
                                                </Avatar>
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                </ShowIf>
                            </Grid>

                        </Container>

                    </Box>
                </ShowIf>

                <Box id='personal-projects-section' component='section' className='mt-12 xl:mt-0 pt-10 flex'>
                    <ShowIf condition={user.projects?.length > 0}>
                        <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'sm:mx-8'}>
                            <Typography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>{t('categories.list.personal-projects')}</Typography>

                            <Grid container className='mt-4' spacing={2}>

                                {
                                    user.projects.slice(0, 3).map((project) => (
                                        <Grid key={project.id} item xs={12} sm={6} lg={user.projects.length > 3 ? 3 : 4} className='flex justify-center sm:justify-start items-start'>
                                            <SquareCard
                                                image={project.image}
                                                title={project.title}
                                                description={project.description}
                                                chips={project.skills}
                                                bottomCaption={new Date(project.fromDate || project.updatedAt).toLocaleDateString("it-IT") + (project.toDate ? " - " + new Date(project.toDate).toLocaleDateString("it-IT") : "")}
                                                buttons={[
                                                    {
                                                        label: t('common:read-more'),
                                                        link: `/users/${userSlug}/diary/projects/${project.slug}#mainEntityStory`
                                                    }
                                                ]}
                                            />
                                        </Grid>
                                    ))
                                }

                                <ShowIf condition={user.projects.length > 3}>
                                    <Grid item xs={12} sm={6} lg={3} className='flex justify-center items-center'>
                                        <Tooltip title={user.projects.length + " " + t('common:stories')} placement="top" arrow TransitionComponent={Zoom}>
                                            <Link href='/users/[userSlug]/diary/projects#projects' as={`/users/${userSlug}/diary/projects#projects`}>
                                                <Avatar variant='rounding' className='bg-white shadow-lg cursor-pointer active:shadow-inner' sx={{ width: 100, height: 100 }}>
                                                    <ArrowForwardIosIcon color='dark' fontSize='large' className='z-10' />
                                                </Avatar>
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                </ShowIf>
                            </Grid>
                        </Container>
                    </ShowIf>
                </Box>

                <ShowIf condition={user.educations?.length > 0}>
                    <Box id='educations-section' component='section' className='mt-12 xl:mt-0 pt-10 flex'>

                        <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'sm:mx-8'}>
                            <Typography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>{t('categories.list.personal-educations')}</Typography>

                            <Grid container className='mt-4' spacing={2}>

                                {
                                    user.educations.slice(0, 3).map((education) => (
                                        <Grid key={education.id} item xs={12} sm={6} lg={user.educations.length > 3 ? 3 : 4} className='flex justify-center sm:justify-start items-start'>
                                            <SquareCard
                                                image={education.image}
                                                title={education.field}
                                                subtitle={education.school}
                                                description={education.description}
                                                chips={education.skills}
                                                bottomCaption={new Date(education.fromDate || education.updatedAt).toLocaleDateString("it-IT") + (education.toDate ? " - " + new Date(education.toDate).toLocaleDateString("it-IT") : "")}
                                                buttons={[
                                                    {
                                                        label: t('common:read-more'),
                                                        link: `/users/${userSlug}/diary/educations/${education.slug}#mainEntityStory`
                                                    }
                                                ]}
                                            />
                                        </Grid>
                                    ))
                                }

                                <ShowIf condition={user.educations.length > 3}>
                                    <Grid item xs={12} sm={6} lg={3} className='flex justify-center items-center'>
                                        <Tooltip title={user.educations.length + " " + t('common:stories')} placement="top" arrow TransitionComponent={Zoom}>
                                            <Link href='/users/[userSlug]/diary/experiences#experiences' as={`/users/${userSlug}/diary/experiences#experiences`}>
                                                <Avatar variant='rounding' className='bg-white shadow-lg cursor-pointer active:shadow-inner' sx={{ width: 100, height: 100 }}>
                                                    <ArrowForwardIosIcon color='dark' fontSize='large' className='z-10' />
                                                </Avatar>
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                </ShowIf>
                            </Grid>
                        </Container>
                    </Box>
                </ShowIf>
            </Box>

        </>

    );
}

export async function getStaticPaths(context) {
    const paths = [];
    const { locales } = context;

    try {
        const slugsResponse = await fetcher(UserService.getAllSlugsUrl());

        for (const locale of locales) {
            for (const slug of slugsResponse?.content) {
                paths.push(
                    {
                        params: {
                            userSlug: slug
                        },
                        locale
                    }
                );
            }
        }
    } catch (error) {
        console.debug("Error in diary home getStaticPaths");
    }

    return {
        fallback: 'blocking',
        paths
    }
}

export async function getStaticProps(context) {

    let props = {};
    const revalidate = 10;

    try {
        const locale = context.locale;

        const url = UserService.getBySlugUrl(context.params.userSlug, View.verbose);
        const userResponse = await fetcher(url);

        if (!userResponse?.content || User.isEmpty(userResponse?.content)) {
            return {
                notFound: true,
                revalidate: revalidate
            }
        }

        props = {
            ...(await serverSideTranslations(locale)),
            user: userResponse?.content,
            messages: userResponse?.messages,
            fallback: {
                [url]: userResponse
            },
        }
    } catch (error) {
        props = {
            error: JSON.parse(JSON.stringify(error))
        }
    }

    return {
        props,
        revalidate
    }
}

Diary.getLayout = (page) => {
    const { t } = useTranslation('user-diary');

    return (
        <DiaryLayout title={t('diary')} showStoryFilters showBreadcrumbs user={page.props.user}>
            {page}
        </DiaryLayout>
    )
}

export default Diary;
