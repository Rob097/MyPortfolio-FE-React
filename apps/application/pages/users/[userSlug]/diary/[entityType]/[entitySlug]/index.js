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
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, Chip, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const Project = (props) => {
    const { t } = useTranslation(['user-diary']);
    const { entity, isError } = useEntity(props.entityType, props.entity?.slug, View.verbose);
    const [entities, setEntities] = useState(props.entities);

    useEffect(() => {
        if (isError !== undefined && isError != null) {
            throw isError;
        }
    }, [isError]);

    useEffect(() => {
        const entitiesWithOrderedStories = entities?.map(entity => {
            const orderedStories = entity?.stories?.sort((a, b) => {
                if (props.entityType === EntityTypeEnum.EDUCATIONS) {
                    return a.orderInEducation - b.orderInEducation;
                } else if (props.entityType === EntityTypeEnum.EXPERIENCES) {
                    return a.orderInExperience - b.orderInExperience;
                } else if (props.entityType === EntityTypeEnum.PROJECTS) {
                    return a.orderInProject - b.orderInProject;
                }
            });
            return { ...entity, stories: orderedStories };
        });
        setEntities(entitiesWithOrderedStories);
    }, [props.entities, props.entityType]);

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');
    const isSmallerThanMd = isSmallerThan('md');

    const imgRef = useRef();
    const [objectFit, setObjectFit] = useState('cover');

    return (
        <>

            <Head>
                <title>{`MyPortfolio | ${entity?.title || entity?.field} by ${props.user?.firstName} ${props.user?.lastName}`}</title>
                <meta name="description" content={entity?.description} />
                <meta name="keywords" content={entity?.skills?.map(skill => skill.name).join(', ')} />
                <meta name="author" content={props.user?.firstName + ' ' + props.user?.lastName} />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
            </Head>

            <Box id='mainEntityStory' component='section' className={classes.sectionMinHeight + ' relative flex md:z-50 bg-background-secondary'}>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>

                    <StoriesNavbar entity={entity} entities={entities} category={props.entityType} />

                    {/* Add the entity image: */}
                    <ShowIf condition={entity?.coverImage !== undefined}>
                        <Box className='relative w-full h-fit md:h-full md:max-h-96 px-6 mt-10 flex justify-center items-center '
                            sx={{
                                backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.7) 10%, rgba(255, 255, 255, 0.7) 90%, rgba(255, 255, 255, 0) 100%)`,
                                backdropFilter: { xs: 'none', lg: 'blur(15px) saturate(1)' }
                            }}
                            onMouseEnter={() => setObjectFit('contain')}
                            onMouseLeave={() => setObjectFit('cover')}
                        >
                            <Image
                                crossOrigin={"Anonymous"}
                                ref={imgRef}
                                src={entity?.coverImage}
                                alt={entity?.title || entity?.field}
                                layout="fill"
                                className={`object-contain ${objectFit === 'contain' ? 'w-fit' : 'md:w-full md:object-cover'} !relative w-fit h-fit max-h-96 md:h-full md:max-h-full mx-auto rounded-xl shadow-xl shadow-black-400 rounded-xl`}
                            />
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

                                {/* Link button "Read the story" */}
                                <ShowIf condition={entity?.stories?.length > 0}>
                                    <Box className='mt-8'>
                                        <Link href='/users/[userSlug]/diary/[entityType]/[entitySlug]/[storySlug]#mainEntityStory' as={`/users/${props.user?.slug}/diary/${props.entityType}/${entity?.slug}/${entity.stories[0]?.slug}#mainEntityStory`}>
                                            <Button variant="contained" className='bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white' size="large" sx={{ borderRadius: '50px' }} endIcon={<KeyboardArrowRightIcon />}>
                                                {t('user-diary:read-the-main-story')}
                                            </Button>
                                        </Link>
                                    </Box>
                                </ShowIf>



                            </Box>

                            {/* This block used to display the main story in the entity page. But for now I think is not useful.
                            <ShowIf condition={mainStory !== undefined}>
                                <Box className='mt-8'>
                                    <Typography variant="h2" fontWeight='bold'>{mainStory?.title}</Typography>
                                    <Box className='mt-4'>
                                        <HtmlContent>
                                            {mainStory?.description}
                                        </HtmlContent>
                                    </Box>
                                </Box>
                            </ShowIf> */}

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
                        <Grid item xs={12} md={5} className='h-full top-8 !px-6' sx={{ display: { md: 'block', xs: 'none' } }} >
                            <EntitiesTree entity={entity} entities={entities} category={props.entityType} />

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

        const entities = await EntityService.getByUserId(entityType, userResponse?.content?.id, View.verbose);

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