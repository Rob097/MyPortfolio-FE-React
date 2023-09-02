import RelevantSections from '@/components/cards/sectionCard/relevantSections';
import SwipeableEdgeDrawer from '@/components/drawer/swipeableEdgeDrawer';
import StoryIndexModal, { StoryIndexContent } from '@/components/modals/storyIndexModal';
import StoryNavbarClasses from '@/components/navbar/navbar.module.scss';
import ProjectsTree from '@/components/tree/projectsTree';
import ConditionalWrapper from '@/components/utils/conditionalWrapper';
import ShowIf from '@/components/utils/showIf';
import WhiteBar from '@/components/whiteBar';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { StoryCategoryEnum } from '@/models/categories.model';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListIcon from '@mui/icons-material/List';
import { Box, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useState } from 'react';

const domSection = '#mainProjectSection';

const StoryNavbar = ({ userSlug, story, section }) => {
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanMd = isGreaterThan('md');
    const isSmallerThanMd = isSmallerThan('md');

    const [indexModalOpen, setIndexModalOpen] = useState(false);
    function toggleIndexModal(forcedValue) {
        setIndexModalOpen(forcedValue !== undefined ? forcedValue : !indexModalOpen);
    }

    const showRelevantSections = section?.relevantSections !== undefined && section?.relevantSections.length > 0;

    const previousSection = getPreviousSection(section, story);
    const nextSection = getNextSection(section, story);
    const previousLink = getPreviousSectionLink(section, story, userSlug);
    const nextLink = getNextSectionLink(section, story, userSlug);

    const DrawerContent = () => (
        !indexModalOpen
            ? (showRelevantSections ? <RelevantSections section={section} isMobile /> : <ProjectsTree project={story} />)
            : <StoryIndexContent story={story} toggleModal={() => toggleIndexModal()} />
    );

    return (

        <>
            <ConditionalWrapper
                condition={true}
                wrapper={children => (
                    isGreaterThanMd ?
                        <WhiteBar id={StoryNavbarClasses["storyNavbar"]} containerClasses='sticky top-0 pt-4 !px-0 bg-background-secondary' white px={2}>{children}</WhiteBar>
                        :
                        <SwipeableEdgeDrawer
                            drawerContent={<DrawerContent />}
                            indexModalOpen={indexModalOpen}
                            closeIndexModal={showRelevantSections ? () => toggleIndexModal(false) : undefined}
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
                                'Story Sections'
                                :
                                (showRelevantSections ? 'Relevant Sections' : 'My Projects')
                        }
                    </Button>
                    <Box className='flex flex-row justify-end'>
                        <ShowIf condition={previousSection !== undefined}>
                            <ConditionalWrapper
                                condition={isSmallerThanMd}
                                wrapper={children => <Tooltip title={previousSection?.title ?? 'Home'}>{children}</Tooltip>}
                            >
                                <Link href={previousLink}>
                                    <Button variant="contained" startIcon={isGreaterThanMd && <KeyboardArrowLeftIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white ml-2' >
                                        {isGreaterThanMd ? (previousSection?.title ?? 'Home') : <KeyboardArrowLeftIcon />}
                                    </Button>
                                </Link>
                            </ConditionalWrapper>
                        </ShowIf>
                        <ShowIf condition={isSmallerThanMd || nextSection !== undefined}>
                            <ConditionalWrapper
                                condition={isSmallerThanMd}
                                wrapper={children => <Tooltip title={nextSection?.title}>{children}</Tooltip>}
                            >
                                {
                                    isSmallerThanMd && nextSection === undefined ?
                                        <Box sx={{ width: '4.5rem' }} />
                                        :
                                        <Link href={nextLink} >
                                            <Button variant="contained" endIcon={isGreaterThanMd && <KeyboardArrowRightIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white ml-2'>
                                                {isGreaterThanMd ? nextSection?.title : <KeyboardArrowRightIcon />}
                                            </Button>
                                        </Link>
                                }
                            </ConditionalWrapper>
                        </ShowIf>
                    </Box>
                </Box>
            </ConditionalWrapper>

            <StoryIndexModal story={story} open={isGreaterThanMd && indexModalOpen} toggleModal={() => toggleIndexModal()} />

        </>
    )
}

export default StoryNavbar;

function getPreviousSection(obj, story) {
    if (!obj || !story) return undefined;

    const sections = story.sections;
    const getIndex = (arr, id) => arr.findIndex(item => item.id === id);

    const index = getIndex(sections, obj.id);
    return index > 0 ? sections[index - 1] : null;

}
function getNextSection(obj, story) {
    if (!story) return undefined;
    if (!obj) return story.sections?.[0];

    const sections = story.sections;
    const getIndex = (arr, id) => arr.findIndex(item => item.id === id);

    const index = getIndex(sections, obj.id);
    return index < sections.length - 1 ? sections[index + 1] : undefined;
}
function getPreviousSectionLink(obj, story, userSlug) {
    const previousSection = getPreviousSection(obj, story);
    return previousSection !== null && previousSection !== undefined
        ? `/users/${userSlug}/diary/${StoryCategoryEnum.PROJECTS}/${story.slug}/${previousSection.slug}${domSection}`
        : (previousSection == null ? `/users/${userSlug}/diary/${StoryCategoryEnum.PROJECTS}/${story.slug}${domSection}` : undefined);
}
function getNextSectionLink(obj, story, userSlug) {
    const nextSection = getNextSection(obj, story);
    return nextSection
        ? `/users/${userSlug}/diary/${StoryCategoryEnum.PROJECTS}/${story.slug}/${nextSection.slug}${domSection}`
        : undefined;
}