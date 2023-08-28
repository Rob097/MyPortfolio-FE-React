import ConditionalWrapper from '@/components/utils/conditionalWrapper';
import ShowIf from '@/components/utils/showIf';
import { projectStories } from '@/data/mock/stories';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListIcon from '@mui/icons-material/List';
import { Box, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Link from 'next/link';

const StoryNavbar = ({ userId, storyName, indexModalState, toggleIndexModal }) => {
    const { isGreaterThan, isSmallerThan } = useBreakpoints();
    const isGreaterThanMd = isGreaterThan('md');
    const isSmallerThanMd = isSmallerThan('md');

    // From projectStories get the previous and next story based on the current story:
    const previousStory = projectStories.find((story, index) => projectStories[index + 1]?.slug === storyName);
    const nextStory = projectStories.find((story, index) => projectStories[index - 1]?.slug === storyName);

    return (

        <Box className="w-full flex flex-row justify-between items-center">
            <Button onClick={toggleIndexModal} variant="contained" startIcon={<ListIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white' >
                {
                    indexModalState ?
                        'Relevant Sections'
                        :
                        'API Reference / Routes'
                }
            </Button>
            <Box className='flex flex-row justify-end'>
                <ShowIf condition={previousStory !== undefined}>
                    <ConditionalWrapper
                        condition={isSmallerThanMd}
                        wrapper={children => <Tooltip title={previousStory?.title}>{children}</Tooltip>}
                    >
                        <Link href='/users/[userId]/diary/[storyName]#mainStorySection' as={`/users/${userId}/diary/${previousStory?.slug}#mainStorySection`}>
                            <Button variant="contained" endIcon={isGreaterThanMd && <KeyboardArrowLeftIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white ml-2' >
                                {isGreaterThanMd ? previousStory?.title : <KeyboardArrowLeftIcon />}
                            </Button>
                        </Link>
                    </ConditionalWrapper>
                </ShowIf>
                <ShowIf condition={nextStory !== undefined}>
                    <ConditionalWrapper
                        condition={isSmallerThanMd}
                        wrapper={children => <Tooltip title={nextStory?.title}>{children}</Tooltip>}
                    >
                        <Link href='/users/[userId]/diary/[storyName]#mainStorySection' as={`/users/${userId}/diary/${nextStory?.slug}#mainStorySection`}>
                            <Button variant="contained" endIcon={isGreaterThanMd && <KeyboardArrowRightIcon />} className='rounded-full bg-slate-300 hover:bg-slate-500 text-dark-main hover:text-white ml-2' >
                                {isGreaterThanMd ? nextStory?.title : <KeyboardArrowRightIcon />}
                            </Button>
                        </Link>
                    </ConditionalWrapper>
                </ShowIf>
            </Box>
        </Box>
    )
}

export default StoryNavbar;