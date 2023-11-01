import StoryCard from '@/components/cards/storyCard';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import DiaryLayout from '@/layouts/DiaryLayout';
import { EntityTypeEnum } from '@/models/categories.model';
import { View } from '@/models/criteria.model';
import { User } from '@/models/user.model';
import { fetcher } from '@/services/base.service';
import UserService from '@/services/user.service';
import { Box, Container, Grid, Pagination, Stack, Typography, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import EntityService, { useUserEntities } from '@/services/entity.service';
import { useRouter } from 'next/router';
import experiencesClasses from '../../styles/experiences.module.scss';
import EntitiesTimeline from '@/components/timelines/entitiesTimeline';
import ShowIf from '@/components/utils/showIf';


const Projects = (props) => {
    const { t } = useTranslation(['user-diary', 'common']);
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');
    const { entities, isError } = useUserEntities(props.entityType, props.user.id, View.verbose);
    const [showTimeline, setShowTimeline] = useState(false);

    useEffect(() => {
        if (isError !== undefined && isError != null) {
            throw isError;
        }
    }, [isError]);

    const pages = Math.ceil(entities?.length / 6);

    function toggleTimeline() {
        if (typeof document !== 'undefined' && typeof window !== 'undefined') {
            document.getElementById('diary-stories-filter')?.classList.toggle('hidden');
            setShowTimeline(!showTimeline);
        }
    }

    return (
        <Box id='entities-section' component='section' className='pb-20'>

            <ShowIf condition={!showTimeline}>
                <Box id='stories-section' component='section' className='mt-12 xl:mt-0 pt-10'>
                    <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>
                        <Box className={isSmallerThanLg ? 'mx-8' : ''}>

                            <Stack direction='row' spacing={2} className='items-end my-10'>
                                <Typography variant="h2" fontWeight='bold'>{t('common:list')}</Typography>
                                <Box className={experiencesClasses.container} display={entities?.length > 3 ? 'block' : 'block'}>
                                        <Button onClick={toggleTimeline} variant="contained" color="primary" size="small" className='shineButton h-fit py-2' sx={{ borderRadius: '50px' }}>
                                            {t('view-as-timeline')}
                                        </Button>
                                    </Box>
                            </Stack>
                            <Box className="w-full mt-8 mb-20">
                                <Grid container className='mt-4' spacing={2}>
                                    {
                                        entities.slice(0, 6).map((entity) => (
                                            <Grid key={entity.id} item xs={12} sm={6} lg={4} className='flex justify-center sm:justify-start items-start'>
                                                <StoryCard
                                                    story={entity}
                                                    storyCategory={props.entityType}
                                                    title={entity.title || entity.field}
                                                    subtitle={entity.school || undefined}
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


        const userUrl = UserService.getBySlugUrl(userSlug, View.normal);
        const userResponse = await fetcher(userUrl);

        if (!userResponse?.content || User.isEmpty(userResponse?.content)) {
            return {
                notFound: true,
                revalidate: revalidate
            }
        }

        
        if(EntityTypeEnum.isValid(entityType) === false) {
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
        <DiaryLayout title={t('categories.list.personal-'+entityType)} id={entityType} showStoryFilters showBreadcrumbs>
            {page}
        </DiaryLayout>
    )
}

export default Projects