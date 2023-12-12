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
import classes from '@/pages/users/[userSlug]/styles/shared.module.scss';
import { fetcher } from '@/services/base.service';
import EntityService, { useEntity } from '@/services/entity.service';
import UserService from '@/services/user.service';
import { Box, Chip, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

const Project = (props) => {
    const { t } = useTranslation(['user-diary']);
    const { entity, isError } = useEntity(props.entityType, props.entity?.slug, View.verbose);
    const [mainStory, setMainStoryId] = useState(entity?.stories?.find(story => story?.id === entity?.mainStoryId));

    useEffect(() => {
        if (isError !== undefined && isError != null) {
            throw isError;
        }
    }, [isError]);

    useEffect(() => {
        setMainStoryId(entity?.stories?.find(story => story?.id === entity?.mainStoryId));
    }, [entity?.mainStoryId, entity?.stories]);

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');
    const isSmallerThanMd = isSmallerThan('md');

    return (
        <>
            <Box id='mainEntityStory' component='section' className={classes.sectionMinHeight + ' relative flex md:z-50 bg-background-secondary'}>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>

                    <StoriesNavbar entity={entity} entities={props.entities} category={props.entityType} />

                    {/* Add the entity image: */}
                    <ShowIf condition={entity?.image !== undefined}>
                        <Box className='relative w-full h-96 md:h-128 px-6'>
                            <img src={entity?.image} alt={entity?.title || entity?.field} className='object-cover w-full h-full rounded-xl shadow-2xl shadow-slate-900' />
                        </Box>
                    </ShowIf>

                    <Grid container spacing={6} className='w-full py-4 mx-4 lg:mx-0 mt-2 md:mt-0' style={{ maxWidth: '-webkit-fill-available' }}>
                        <Grid item xs={12} md={7} className='h-full !px-6 pb-20 md:pb-0'>
                            <Box>
                                {entity?.title && <Typography variant="h1" fontWeight='bold' className="text-6xl">{entity?.title}</Typography>}
                                {entity?.field && <>
                                    <Typography variant="h1" fontWeight='bold' className='text-6xl' >{entity?.field}</Typography>
                                    <Typography variant="h2" fontWeight='bold' className='mt-2 text-2xl' >{entity?.school}</Typography>
                                </>}

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

                            <ShowIf condition={entity?.skills?.length > 0 && isSmallerThanMd}>
                                <Box className='h-fit sticky md:top-32 !py-6 md:mt-16 md:bg-white md:rounded-xl md:shadow-xl'>
                                    <Typography variant="h4" component="div" fontWeight='bold' sx={{ textAlign: { md: 'right', xs: 'left' } }} className='mb-4'>{t('user-diary:related-skills')}</Typography>

                                    {entity?.skills?.map((skill, index) => (
                                        <Chip
                                            key={skill.name}
                                            id={skill.name}
                                            label={skill.name}
                                            clickable
                                            className='mr-2 mb-4'
                                            onMouseDown={(event) => event.stopPropagation()}
                                            onClick={() => console.log("clicked chip " + skill.name)} />
                                    ))}
                                </Box>
                            </ShowIf>
                        </Grid>
                        <Grid item xs={12} md={5} className='h-full sticky top-8 !px-6' sx={{ display: { md: 'block', xs: 'none' } }} >
                            <EntitiesTree entity={entity} entities={props.entities} category={props.entityType} />

                            <ShowIf condition={entity?.skills?.length > 0}>
                                <Box className='h-fit md:top-32 !p-6 md:mt-16 md:bg-white md:rounded-xl md:shadow-xl'>
                                    <Typography variant="h4" component="div" fontWeight='bold' sx={{ textAlign: { md: 'right', xs: 'left' } }} className='mb-4'>{t('user-diary:related-skills')}</Typography>

                                    {entity?.skills?.map((skill, index) => (
                                        <Chip
                                            key={skill.name}
                                            id={skill.name}
                                            label={skill.name}
                                            clickable
                                            className='mr-2 mb-4'
                                            onMouseDown={(event) => event.stopPropagation()}
                                            onClick={() => console.log("clicked chip " + skill.name)} />
                                    ))}
                                </Box>
                            </ShowIf>
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

        const userUrl = UserService.getBySlugUrl(userSlug, View.verbose);
        const userResponse = await fetcher(userUrl);

        if (!userResponse?.content || SlugDto.isEmpty(userResponse?.content)) {
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

        const entityUrl = EntityService.getBySlugUrl(entityType, entitySlug, View.verbose);
        const entityResponse = await EntityService.getBySlug(entityType, entitySlug, View.verbose);

        if (!entityResponse?.content || SlugDto.isEmpty(entityResponse?.content)) {
            return {
                notFound: true,
                revalidate: revalidate
            }
        }

        const entities = await EntityService.getByUserId(entityType, userResponse?.content?.id, View.normal);

        props = {
            ...(await serverSideTranslations(locale)),
            user: userResponse?.content,
            entity: entityResponse?.content,
            entities: entities?.content,
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
        <DiaryLayout id='entity' showBreadcrumbs pageBG='bg-background-secondary' user={page.props.user}>
            {page}
        </DiaryLayout>
    )
}

export default Project