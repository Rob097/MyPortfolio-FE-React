import StoriesNavbar from '@/components/navbar/storiesNavbar';
import EntitiesTree from '@/components/tree/entitiesTree';
import HtmlContent from '@/components/utils/htmlContent';
import ShowIf from '@/components/utils/showIf';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import DiaryLayout from '@/layouts/DiaryLayout';
import { SlugDto } from '@/models/baseDto.models';
import { EntityTypeEnum } from '@/models/categories.model';
import { View } from '@/models/criteria.model';
import { fetcher } from '@/services/base.service';
import EntityService, { useEntity } from '@/services/entity.service';
import UserService from '@/services/user.service';
import { Box, Container, Grid, Typography } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import classes from '@/pages/users/[userSlug]/styles/shared.module.scss';

const Project = (props) => {

    const { entity, isError } = useEntity(props.entityType, props.entity?.slug, View.verbose);
    const [entities, setEntities] = useState([]);
    const [mainStory, setMainStoryId] = useState(entity?.stories?.find(story => story?.id === entity?.mainStoryId));

    useEffect(() => {
        if (isError !== undefined && isError != null) {
            throw isError;
        }
    }, [isError]);


    useEffect(() => {
        async function fetchEntities() {
            const entities = await EntityService.getByUserId(props.entityType, props.user?.id, View.normal);
            setEntities(entities?.content);
        }
        fetchEntities();
    }, []);

    useEffect(() => {
        setMainStoryId(entity?.stories?.find(story => story?.id === entity?.mainStoryId));
    }, [entity?.mainStoryId, entity?.stories]);

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');

    return (
        <>
            <Box id='mainEntityStory' component='section' className={classes.sectionMinHeight + ' relative flex md:z-50 bg-background-secondary'}>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>

                    <StoriesNavbar entity={entity} entities={entities} category={props.entityType} />

                    {/* Add the entity image: */}
                    <ShowIf condition={entity?.image !== undefined}>
                        <Box className='relative w-full h-96 md:h-128 px-6'>
                            <img src={entity?.image} alt={entity?.title} className='object-cover w-full h-full rounded-xl shadow-2xl shadow-slate-900' />
                        </Box>
                    </ShowIf>

                    <Grid container spacing={6} className='w-full py-4 mx-4 lg:mx-0 mt-2 md:mt-0' style={{ maxWidth: '-webkit-fill-available' }}>
                        <Grid item xs={12} md={7} className='h-full !px-6 pb-20 md:pb-0'>
                            <Box>
                                <Typography variant="h1" fontWeight='bold'>{entity?.title}</Typography>

                                <Box className='mt-4'>
                                    <HtmlContent>
                                        {entity?.description}
                                    </HtmlContent>
                                </Box>
                            </Box>

                            <ShowIf condition={mainStory !== undefined}>
                                <Box className='mt-8'>
                                    <Typography variant="h2" fontWeight='bold'>{mainStory?.title}</Typography>
                                    <Box className='mt-4'>
                                        <HtmlContent>
                                            {mainStory?.description}
                                        </HtmlContent>
                                    </Box>
                                </Box>
                            </ShowIf>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ display: { md: 'block', xs: 'none' } }} >
                            <EntitiesTree entity={entity} entities={entities} category={props.entityType} />
                        </Grid>
                    </Grid>
                </Container>

            </Box>

        </>
    )

}

export async function getStaticPaths(context) {
    const paths = [];
    const { locales } = context

    try {
        const usersSlugsResponse = await fetcher(UserService.getAllSlugsUrl());

        for (const locale of locales) {
            for (const userSlug of usersSlugsResponse?.content) {
                for (const entityType of Object.values(EntityTypeEnum)) {
                    paths.push(
                        {
                            params: {
                                userSlug: userSlug,
                                entityType: entityType,
                                entitySlug: 'entitySlug'
                            },
                            locale
                        }
                    );
                }
            }
        }
    } catch (error) {
        console.log("Error in entity getStaticPaths");
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

        if (!userResponse?.content || SlugDto.isEmpty(userResponse?.content)) {
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

        const entityUrl = EntityService.getBySlugUrl(entityType, entitySlug, View.verbose);
        const entityResponse = await EntityService.getBySlug(entityType, entitySlug, View.verbose);

        if (!entityResponse?.content || SlugDto.isEmpty(entityResponse?.content)) {
            return {
                notFound: true,
                revalidate: revalidate
            }
        }

        props = {
            ...(await serverSideTranslations(locale)),
            user: userResponse?.content,
            entity: entityResponse?.content,
            entityType: entityType,
            messages: [...userResponse?.messages, ...entityResponse?.messages],
            fallback: {
                [userUrl]: userResponse,
                [entityUrl]: entityResponse
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

Project.getLayout = (page) => {
    return (
        <DiaryLayout id='entity' showBreadcrumbs pageBG='bg-background-secondary'>
            {page}
        </DiaryLayout>
    )
}

export default Project