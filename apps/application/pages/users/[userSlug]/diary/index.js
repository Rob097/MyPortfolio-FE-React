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
import { useEffect, useMemo, useState } from 'react';
import userClasses from '../styles/shared.module.scss';
import StoriesFilters from '@/components/whiteBar/storiesFilters';
import Head from 'next/head';

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

    const [filteredExperiences, setFilteredExperiences] = useState(orderEntitiesByDate(user?.experiences));
    const [filteredProjects, setFilteredProjects] = useState(orderEntitiesByDate(user?.projects));
    const [filteredEducations, setFilteredEducations] = useState(orderEntitiesByDate(user?.educations));

    const skills = useMemo(() => {
        const experienceSkillsNames = user?.experiences?.map(experience => experience.skills?.map(skill => skill.name)).flat();
        const projectSkillsNames = user?.projects?.map(project => project.skills?.map(skill => skill.name)).flat();
        const educationSkillsNames = user?.educations?.map(education => education.skills?.map(skill => skill.name)).flat();

        return [...new Set(experienceSkillsNames.concat(projectSkillsNames).concat(educationSkillsNames))];
    }, [user]);

    const emitFilters = (filters) => {
        const isSkillsEmptyStringOrEmptyArray = filters.skills === '' || filters.skills.length === 0;

        setFilteredExperiences(orderEntitiesByDate(user.experiences).filter(experience =>
            filters.categories.includes(1) &&
            (isSkillsEmptyStringOrEmptyArray || experience.skills.map(skill => skill.name).includes(...filters.skills)) &&
            experience.title.toLowerCase().includes(filters.name.toLowerCase())
        ));
        setFilteredProjects(orderEntitiesByDate(user.projects).filter(project =>
            filters.categories.includes(2) &&
            (isSkillsEmptyStringOrEmptyArray || project.skills.map(skill => skill.name).includes(...filters.skills)) &&
            project.title.toLowerCase().includes(filters.name.toLowerCase())
        ));
        setFilteredEducations(orderEntitiesByDate(user.educations).filter(education =>
            filters.categories.includes(3) &&
            (isSkillsEmptyStringOrEmptyArray || education.skills.map(skill => skill.name).includes(...filters.skills)) &&
            education.field.toLowerCase().includes(filters.name.toLowerCase())
        ));

    }

    function getDatesRange(entity) {
        return new Date(entity.fromDate || entity.updatedAt).toLocaleDateString("it-IT") + " - " + (entity.toDate ? new Date(entity.toDate).toLocaleDateString("it-IT") : t('user-home:quick-overview.present'));
    }

    // take the entities passed as paramerer and order them by date
    // Every entitity has an attribute fromDate
    // Some entitities have an attribute toDate
    // If the toDate is not present, the entity is still in progress
    // First show the entities that are still in progress
    // Then show the entities that are finished
    // The entities that are still in progress are ordered by fromDate
    // The entities that are finished are ordered by toDate
    function orderEntitiesByDate(passedEntities) {
        const entitiesInProgress = passedEntities.filter(entity => !entity.toDate);
        const entitiesFinished = passedEntities.filter(entity => entity.toDate);

        entitiesInProgress.sort((a, b) => {
            return new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime();
        });

        entitiesFinished.sort((a, b) => {
            return new Date(b.toDate).getTime() - new Date(a.toDate).getTime();
        });
        

        return [...entitiesInProgress, ...entitiesFinished];
    }

    return (
        <>

            <Head>
                <title>{`MyPortfolio | Diary of ${user?.firstName} ${user?.lastName}`}</title>
                <meta name="description" content={`Personal diary of ${user?.firstName} ${user?.lastName}. ${user?.experiences?.length} experiences, ${user?.projects?.length} projects, ${user?.educations?.length} educations.`} />
                <meta name="keywords" content={`${user?.firstName} ${user?.lastName}, ${user?.experiences?.[0]?.title}, ${user?.projects?.[0]?.title}, ${user?.educations?.[0]?.field}`} />
                <meta name="author" content={`${user?.firstName} ${user?.lastName}`} />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
            </Head>

            <Box id="diary-stories-filter">
                <StoriesFilters emitFilters={emitFilters} skills={skills} filtersToHide={['sort']} />
            </Box>
            <Box id="diary-stories" component='section' className={userClasses.section} sx={{ backgroundImage: `linear-gradient(180deg, transparent 80%, ${colors.background.main} 90%);` }}>

                <ShowIf condition={filteredExperiences.length === 0 && filteredProjects.length === 0 && filteredEducations.length === 0}>
                    <Box className='flex justify-center items-start h-96'>
                        <Typography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>{t('common:errors.no-data-found')}</Typography>
                    </Box>
                </ShowIf>                
                
                <ShowIf condition={filteredExperiences?.length > 0}>
                    <Box id='professional-experiences-section' component='section' className='mt-12 xl:mt-0 flex'>

                        <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'sm:mx-8'}>
                            <Link href='/users/[userSlug]/diary/experiences#experiences' as={`/users/${userSlug}/diary/experiences#experiences`}>
                                <Typography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>{t('categories.list.personal-experiences')}</Typography>
                            </Link>

                            <Grid container className='mt-4' spacing={2}>

                                {
                                    filteredExperiences.slice(0, 3).map((experience) => (
                                        <Grid key={experience.id} item xs={12} sm={6} lg={filteredExperiences.length > 3 ? 3.66 : 4} className='flex justify-center sm:justify-start items-start'>
                                            <SquareCard
                                                image={experience.coverImage}
                                                title={experience.title}
                                                subtitle={experience.company}
                                                description={experience.description}
                                                chips={experience.skills?.slice(0, 5)}
                                                bottomCaption={getDatesRange(experience)}
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

                                <ShowIf condition={filteredExperiences.length > 3}>
                                    <Grid item xs={12} sm={6} lg={1.02} className='flex justify-center items-center'>
                                        <Tooltip title={filteredExperiences.length + " " + t('common:stories')} placement="top" arrow TransitionComponent={Zoom}>
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
                    <ShowIf condition={filteredProjects?.length > 0}>
                        <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'sm:mx-8'}>
                            <Link href='/users/[userSlug]/diary/projects#projects' as={`/users/${userSlug}/diary/projects#projects`}>
                                <Typography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>{t('categories.list.personal-projects')}</Typography>
                            </Link>

                            <Grid container className='mt-4' spacing={2}>

                                {
                                    filteredProjects.slice(0, 3).map((project) => (
                                        <Grid key={project.id} item xs={12} sm={6} lg={filteredProjects.length > 3 ? 3.66 : 4} className='flex justify-center sm:justify-start items-start'>
                                            <SquareCard
                                                image={project.coverImage}
                                                title={project.title}
                                                description={project.description}
                                                chips={project.skills?.slice(0, 5)}
                                                bottomCaption={getDatesRange(project)}
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

                                <ShowIf condition={filteredProjects.length > 3}>
                                    <Grid item xs={12} sm={6} lg={1.02} className='flex justify-center items-center'>
                                        <Tooltip title={filteredProjects.length + " " + t('common:stories')} placement="top" arrow TransitionComponent={Zoom}>
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

                <ShowIf condition={filteredEducations?.length > 0}>
                    <Box id='educations-section' component='section' className='mt-12 xl:mt-0 pt-10 flex'>

                        <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : 'sm:mx-8'}>
                            <Link href='/users/[userSlug]/diary/educations#educations' as={`/users/${userSlug}/diary/educations#educations`}>
                                <Typography variant="h3" fontWeight="bold" color="dark" textAlign={{ xs: 'center', md: 'left' }} className='mt-8'>{t('categories.list.personal-educations')}</Typography>
                            </Link>

                            <Grid container className='mt-4' spacing={2}>

                                {
                                    filteredEducations.slice(0, 3).map((education) => (
                                        <Grid key={education.id} item xs={12} sm={6} lg={filteredEducations.length > 3 ? 3.66 : 4} className='flex justify-center sm:justify-start items-start'>
                                            <SquareCard
                                                image={education.coverImage}
                                                title={education.field}
                                                subtitle={education.school}
                                                description={education.description}
                                                chips={education.skills?.slice(0, 5)}
                                                bottomCaption={getDatesRange(education)}
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

                                <ShowIf condition={filteredEducations.length > 3}>
                                    <Grid item xs={12} sm={6} lg={1.02} className='flex justify-center items-center'>
                                        <Tooltip title={filteredEducations.length + " " + t('common:stories')} placement="top" arrow TransitionComponent={Zoom}>
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
