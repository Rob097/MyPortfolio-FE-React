import RelevantSections from '@/components/cards/sectionCard/relevantSections';
import StoriesNavbar from '@/components/navbar/storiesNavbar';
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
import EntityService from '@/services/entity.service';
import StoryService, { useStory } from '@/services/story.service';
import UserService from '@/services/user.service';
import { Box, Chip, Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Story = (props) => {
    const { t } = useTranslation(['user-diary']);
    const { story, isError } = useStory(props.story?.slug, View.verbose);

    useEffect(() => {
        if (isError !== undefined && isError != null) {
            throw isError;
        }
    }, [isError]);

    const router = useRouter();
    const { userSlug } = router.query;

    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanLg = isGreaterThan('lg');
    const isSmallerThanLg = isSmallerThan('lg');
    const isSmallerThanMd = isSmallerThan('md');

    if (story && !story.relevantSections) {
        const firstRelevantSection = story.firstRelevantSection;
        const secondRelevantSection = story.secondRelevantSection;

        story.relevantSections = [firstRelevantSection, secondRelevantSection];
    }
    const showRelevantSections = story?.relevantSections !== undefined && story?.relevantSections.length > 0;

    return (
        <>
            <Box id='mainEntityStory' component='section' className={classes.sectionMinHeight + ' relative flex md:z-50 bg-background-secondary'}>
                <Container disableGutters={isSmallerThanLg} className={isGreaterThanLg ? whiteBarClasses.customContainer : ''}>

                    <StoriesNavbar userSlug={userSlug} entity={props.entity} story={story} entities={props.entities} category={EntityTypeEnum.PROJECTS} />

                    <Grid container spacing={6} className='w-full py-4 mx-4 lg:mx-0 mt-2 md:mt-0 mb-10 md:mb-0' style={{ maxWidth: '-webkit-fill-available' }}>
                        <Grid item xs={12} md={7} className='h-full !px-6 pb-8 md:pb-0'>
                            <Box>
                                <Typography variant="h1" fontWeight='bold'>{story?.title}</Typography>

                                <Box className='mt-4'>
                                    <HtmlContent>
                                        {story?.description}
                                    </HtmlContent>
                                </Box>
                            </Box>

                            <ShowIf condition={story?.skills?.length > 0 && isSmallerThanMd}>
                                <Box className='h-fit sticky md:top-32 !py-6 md:mt-16 md:bg-white md:rounded-xl md:shadow-xl'>
                                    <Typography variant="h4" component="div" fontWeight='bold' sx={{ textAlign: { md: 'right', xs: 'left' } }} className='mb-4'>{t('user-diary:related-skills')}</Typography>

                                    {story?.skills?.map((skill, index) => (
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
                            <ShowIf condition={story?.skills?.length > 0}>
                                <Box className='h-fit sticky md:top-32 !p-6 md:mb-8 md:bg-white md:rounded-xl md:shadow-xl'>
                                    <Typography variant="h4" component="div" fontWeight='bold' sx={{ textAlign: { md: 'right', xs: 'left' } }} className='mb-4'>{t('user-diary:related-skills')}</Typography>

                                    {story?.skills?.map((skill, index) => (
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
                            <ShowIf condition={showRelevantSections}>
                                <RelevantSections story={story} showEntityTree entity={props.entity} entities={props.entities} entityType={props.entityType} />
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
                                entitySlug: 'entitySlug',
                                storySlug: 'storySlug'
                            },
                            locale
                        }
                    );
                }
            }
        }
    } catch (error) {
        console.log("Error in story getStaticPaths");
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
        const { userSlug, entityType, entitySlug, storySlug } = params;

        const userUrl = UserService.getBySlugUrl(userSlug, View.normal);
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

        const storyUrl = StoryService.getBySlugUrl(storySlug, View.verbose);
        const storyResponse = await StoryService.getBySlug(storySlug, View.verbose);

        if (!storyResponse?.content || SlugDto.isEmpty(storyResponse?.content)) {
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
            story: storyResponse?.content,
            messages: [...userResponse?.messages, ...entityResponse?.messages, ...storyResponse?.messages],
            fallback: {
                [userUrl]: userResponse,
                [entityUrl]: entityResponse,
                [storyUrl]: storyResponse
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

Story.getLayout = (page) => {
    return (
        <DiaryLayout id='story' showBreadcrumbs pageBG='bg-background-secondary'>
            {page}
        </DiaryLayout>
    )
}

export default Story