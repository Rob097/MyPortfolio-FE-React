import RelevantSections from '@/components/cards/sectionCard/relevantSections';
import SwipeableEdgeDrawer from '@/components/drawer/swipeableEdgeDrawer';
import StoriesIndexModal, { StoriesIndexContent } from '@/components/modals/storiesIndexModal';
import StoriesNavbarClasses from '@/components/navbar/navbar.module.scss';
import EntitiesTree from '@/components/tree/entitiesTree';
import ConditionalWrapper from '@/components/utils/conditionalWrapper';
import ShowIf from '@/components/utils/showIf';
import WhiteBar from '@/components/whiteBar';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { EntityTypeEnum } from '@/models/categories.model';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListIcon from '@mui/icons-material/List';
import { Box, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

const domStory = '#mainEntityStory';

const StoriesNavbar = ({ entities, entity, story, category }) => {
    const { t } = useTranslation(['user-diary', 'common']);
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanMd = isGreaterThan('md');
    const isSmallerThanMd = isSmallerThan('md');

    const router = useRouter();
    const { userSlug, entityType } = router.query;

    const [indexModalOpen, setIndexModalOpen] = useState(false);
    function toggleIndexModal(forcedValue) {
        setIndexModalOpen(forcedValue !== undefined ? forcedValue : !indexModalOpen);
    }

    const showRelevantSections = story?.relevantSections !== undefined && story?.relevantSections.length > 0;

    const previousStory = getPreviousStory(story, entity);
    const nextStory = getNextStory(story, entity);
    const previousLink = getPreviousStoryLink(story, entity, userSlug, category);
    const nextLink = getNextStoryLink(story, entity, userSlug, category);

    const DrawerContent = () => (
        !indexModalOpen
            ? (showRelevantSections ? <RelevantSections story={story} isMobile /> : <EntitiesTree story={story} entity={entity} entities={entities} category={category} />)
            : <StoriesIndexContent entity={entity} toggleModal={() => toggleIndexModal()} />
    );

    return (

        <>
            <ConditionalWrapper
                condition={true}
                wrapper={children => (
                    isGreaterThanMd ?
                        <WhiteBar id={StoriesNavbarClasses["storiesNavbar"]} containerClasses='sticky top-0 pt-4 !px-0 bg-background-secondary' white px={2}>{children}</WhiteBar>
                        :
                        <SwipeableEdgeDrawer
                            drawerContent={<DrawerContent />}
                            indexModalOpen={indexModalOpen}
                            closeIndexModal={/* showRelevantSections ? */ () => toggleIndexModal(false)/*  : undefined */}
                        >
                            {children}
                        </SwipeableEdgeDrawer>
                )
                }
            >

                <Box className="w-full min-w-fit relative flex flex-row justify-between items-center" style={{ left: '50%', transform: 'translateX(-50%)' }}>
                    <Button onClick={() => toggleIndexModal()} variant="contained" startIcon={<ListIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white whitespace-nowrap min-w-fit' >
                        {
                            isGreaterThanMd || !indexModalOpen ?
                                t('common:stories')
                                :
                                (showRelevantSections ? t('common:relevant-sections') : t('user-diary:categories.list.my-' + entityType))
                        }
                    </Button>
                    <Box className='flex flex-row justify-end'>
                        <ShowIf condition={previousStory !== undefined}>
                            <ConditionalWrapper
                                condition={isSmallerThanMd}
                                wrapper={children => <Tooltip title={previousStory?.title ?? t('common:home')}>{children}</Tooltip>}
                            >
                                <Tooltip title={previousStory?.title?.length && previousStory?.title}>
                                    <Link href={previousLink}>
                                        <Button variant="contained" startIcon={isGreaterThanMd && <KeyboardArrowLeftIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white ml-2'>
                                            {isGreaterThanMd ?
                                                (previousStory?.title?.length > 20 ?
                                                    `${previousStory?.title.substring(0, 10)}...${previousStory?.title.substring(previousStory?.title.length - 5)}`
                                                    : previousStory?.title ?? t('common:home'))
                                                : <KeyboardArrowLeftIcon />
                                            }
                                        </Button>
                                    </Link>
                                </Tooltip>
                            </ConditionalWrapper>
                        </ShowIf>
                        <ShowIf condition={isSmallerThanMd || nextStory !== undefined}>
                            <ConditionalWrapper
                                condition={isSmallerThanMd}
                                wrapper={children => <Tooltip title={nextStory?.title}>{children}</Tooltip>}
                            >
                                {
                                    isSmallerThanMd && nextStory === undefined ?
                                        <Box sx={{ width: '4.5rem' }} />
                                        :
                                        <Tooltip title={nextStory?.title?.length && nextStory?.title}>
                                            <Link href={nextLink} >
                                                <Button variant="contained" endIcon={isGreaterThanMd && <KeyboardArrowRightIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white ml-2'>
                                                    {isGreaterThanMd ?
                                                        (nextStory?.title.length > 20 ?
                                                            `${nextStory?.title.substring(0, 10)}...${nextStory?.title.substring(nextStory?.title.length - 5)}`
                                                            : nextStory?.title)
                                                        : <KeyboardArrowRightIcon />
                                                    }
                                                </Button>
                                            </Link>
                                        </Tooltip>
                                }
                            </ConditionalWrapper>
                        </ShowIf>
                    </Box>
                </Box>
            </ConditionalWrapper>

            <StoriesIndexModal entity={entity} open={isGreaterThanMd && indexModalOpen} toggleModal={() => toggleIndexModal()} />

        </>
    )
}

export default StoriesNavbar;

function getPreviousStory(story, entity) {
    if (!story || !entity) return undefined;

    const stories = entity?.stories;
    const getIndex = (arr, id) => arr.findIndex(item => item.id === id);

    const index = getIndex(stories, story.id);
    return index > 0 ? stories[index - 1] : null;

}
function getNextStory(story, entity) {
    if (!entity) return undefined;
    if (!story) return entity?.stories?.[0];

    const stories = entity?.stories;
    const getIndex = (arr, id) => arr.findIndex(item => item.id === id);

    const index = getIndex(stories, story.id);
    return index < stories.length - 1 ? stories[index + 1] : undefined;
}
function getPreviousStoryLink(story, entity, userSlug, category) {
    const previousStory = getPreviousStory(story, entity);
    return previousStory !== null && previousStory !== undefined
        ? `/users/${userSlug}/diary/${category}/${entity?.slug}/${previousStory.slug}${domStory}`
        : (previousStory == null ? `/users/${userSlug}/diary/${category}/${entity?.slug}${domStory}` : undefined);
}
function getNextStoryLink(story, entity, userSlug, category) {
    const nextStory = getNextStory(story, entity);
    return nextStory
        ? `/users/${userSlug}/diary/${category}/${entity?.slug}/${nextStory.slug}${domStory}`
        : undefined;
}