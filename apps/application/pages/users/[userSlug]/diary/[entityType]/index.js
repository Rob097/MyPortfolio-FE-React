import SquareCard from '@/components/cards/squareCard';
import EntitiesTimeline from '@/components/timelines/entitiesTimeline';
import ShowIf from '@/components/utils/showIf';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import DiaryLayout from '@/layouts/DiaryLayout';
import { EntityTypeEnum } from '@/models/categories.model';
import { View } from '@/models/criteria.model';
import { User } from '@/models/user.model';
import { fetcher } from '@/services/base.service';
import EntityService, { useUserEntities } from '@/services/entity.service';
import UserService from '@/services/user.service';
import { Box, Button, Container, Grid, Pagination, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import experiencesClasses from '../../styles/experiences.module.scss';
import StoriesFilters from '@/components/whiteBar/storiesFilters';
import Head from 'next/head';


const Projects = (props) => {
    const { t } = useTranslation(['user-diary', 'common']);
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');
    const { entities, isError } = useUserEntities(props.entityType, props.user.id, View.verbose);
    const [filteredEntities, setFilteredEntities] = useState(orderEntitiesByDate(entities));
    const [showTimeline, setShowTimeline] = useState(false);
    const pages = Math.ceil(filteredEntities?.length / 6);

    useEffect(() => {
        if (isError !== undefined && isError != null) {
            throw isError;
        }
    }, [isError]);

    function toggleTimeline() {
        if (typeof document !== 'undefined' && typeof window !== 'undefined') {
            document.getElementById('diary-stories-filter')?.classList.toggle('hidden');
            setShowTimeline(!showTimeline);
        }
    }

    const skills = useMemo(() => {
        return [...new Set(filteredEntities?.map(entity => entity.skills?.map(skill => skill.name)).flat())];
    }, [filteredEntities]);

    const emitFilters = (filters) => {

        const isSkillsEmptyStringOrEmptyArray = !filters.skills || filters.skills === '' || filters.skills?.length === 0;
        setFilteredEntities(
            orderEntitiesByDate(entities).filter(entity =>
                (isSkillsEmptyStringOrEmptyArray || entity.skills.map(skill => skill.name).includes(...filters.skills)) &&
                (entity.title || entity.field).toLowerCase().includes(filters.name.toLowerCase())
            ).sort((a, b) => {
                const orderType = filters.sort;
                if (orderType === 'dateDown') {
                    return new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime();
                } else if (orderType === 'dateUp') {
                    return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime();
                } else if (orderType === 'name') {
                    return (a.title || a.field).localeCompare(b.title || b.field);
                }

            })
        );

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
                <title>{`MyPortfolio | ${t('categories.list.personal-' + props.entityType)} - ${props.user.firstName} ${props.user.lastName}`}</title>
                <meta name="description" content={`${t('categories.list.personal-' + props.entityType)} of ${props.user.firstName} ${props.user.lastName} - ${props.entities?.length} ${t('categories.list.' + props.entityType)}`} />
                <meta name="keywords" content={`${props.entities?.length > 0 ? props.entities[0].title : ''}${props.entities?.length > 1 ? ', ' + props.entities[1].title : ''}${props.entities?.length > 2 ? ', ' + props.entities[2].title : ''}`} />
                <meta name="author" content={`${props.user.firstName} ${props.user.lastName}`} />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
            </Head>

            <Box id='entities-section' component='section' className='pb-20'>

                <Box id="diary-stories-filter">
                    <StoriesFilters emitFilters={emitFilters} skills={skills} filtersToHide={['categories']} />
                </Box>

                <ShowIf condition={!showTimeline}>
                    <Box id='stories-section' component='section' className='mt-12 xl:mt-0 pt-10'>
                        <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>
                            <Box className={isSmallerThanLg ? 'mx-8' : ''}>

                                <Stack direction='row' spacing={2} className='items-end my-10'>
                                    <Typography variant="h2" fontWeight='bold'>{t('common:list')}</Typography>
                                    <Box className={experiencesClasses.container} display={filteredEntities?.length > 3 ? 'block' : 'block'}>
                                        <Button onClick={toggleTimeline} variant="contained" color="primary" size="small" className='shineButton h-fit py-2' sx={{ borderRadius: '50px' }}>
                                            {t('view-as-timeline')}
                                        </Button>
                                    </Box>
                                </Stack>
                                <Box className="w-full mt-8 mb-20">
                                    <Grid container className='mt-4' spacing={2}>
                                        {
                                            filteredEntities.slice(0, 6).map((entity) => (
                                                <Grid key={entity.id} item xs={12} sm={6} lg={4} className='flex justify-center sm:justify-start items-start'>
                                                    <SquareCard
                                                        image={entity.coverImage}
                                                        title={entity.title || entity.field}
                                                        subtitle={entity.school || undefined}
                                                        description={entity.description}
                                                        chips={entity.skills?.slice(0, 5)}
                                                        bottomCaption={getDatesRange(entity)}
                                                        buttons={[
                                                            {
                                                                label: t('common:read-more'),
                                                                link: `/users/${props.user.slug}/diary/${props.entityType}/${entity.slug}#mainEntityStory`
                                                            }
                                                        ]}
                                                    />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Box>

                                <Pagination count={pages} variant="outlined" color="primary" className='relative z-10' />

                            </Box>
                        </Container>
                    </Box>
                </ShowIf>

                <ShowIf condition={showTimeline}>
                    <Box id='timeline-section' component='section' className='mt-12 xl:mt-0 pt-10'>
                        <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>
                            <Box className={isSmallerThanLg ? 'mx-8' : ''}>
                                <Stack direction='row' spacing={2} className='items-end my-10'>
                                    <Typography variant="h2" fontWeight='bold'>Timeline</Typography>
                                    <Button onClick={toggleTimeline} variant="contained" color="primary" size="small" className='shineButton h-fit py-2' sx={{ borderRadius: '50px' }}>{t('view-as-list')}</Button>
                                </Stack>
                                <EntitiesTimeline entities={entities} />
                            </Box>
                        </Container>
                    </Box>
                </ShowIf>
            </Box>
        </>
    )
}

export async function getStaticPaths(context) {
    const paths = [];
    const { locales } = context;

    try {
        const slugsResponse = await fetcher(UserService.getAllSlugsUrl());

        for (const locale of locales) {
            for (const slug of slugsResponse?.content) {
                for (const entityType of Object.values(EntityTypeEnum)) {
                    paths.push(
                        {
                            params: {
                                userSlug: slug,
                                entityType: entityType,
                            },
                            locale
                        }
                    );
                }
            }
        }
    } catch (error) {
        console.debug("Error in entities getStaticPaths");
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
        const { locale, params } = context
        const { userSlug, entityType, entitySlug } = params;


        const userUrl = UserService.getBySlugUrl(userSlug, View.verbose);
        const userResponse = await fetcher(userUrl);

        if (!userResponse?.content || User.isEmpty(userResponse?.content)) {
            return {
                notFound: true,
                revalidate: revalidate
            }
        }


        if (EntityTypeEnum.isValid(entityType) === false) {
            return {
                notFound: true,
                revalidate: revalidate
            }
        }

        const entitiesUrl = EntityService.getByUserIdUrl(entityType, userResponse?.content.id, View.verbose);
        const entitiesResponse = await EntityService.getByUserId(entityType, userResponse?.content.id, View.verbose);

        if (!entitiesResponse?.content) {
            return {
                notFound: true,
                revalidate: revalidate
            }
        }

        props = {
            ...(await serverSideTranslations(locale)),
            user: userResponse?.content,
            entities: entitiesResponse?.content,
            entityType: entityType,
            messages: [...userResponse?.messages, ...entitiesResponse?.messages],
            fallback: {
                [userUrl]: userResponse,
                [entitiesUrl]: entitiesResponse
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

Projects.getLayout = (page) => {
    const { t } = useTranslation('user-diary');
    const router = useRouter();
    const { entityType } = router.query;

    return (
        <DiaryLayout title={t('categories.list.personal-' + entityType)} id={entityType} showStoryFilters showBreadcrumbs user={page.props.user}>
            {page}
        </DiaryLayout>
    )
}

export default Projects