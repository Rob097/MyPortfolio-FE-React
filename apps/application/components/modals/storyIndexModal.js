import ShowIf from '@/components/utils/showIf';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Link from 'next/link';
import { useRouter } from 'next/router';

const domSection = '#mainProjectSection';

const StoryIndexModal = ({ story, open, toggleModal }) => {
    return (
        <Modal
            open={open}
            onClose={toggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='absolute top-1/2 left-1/2 w-2/3 xl:w-1/3 h-3/5 rounded-xl bg-background-main shadow-xl p-6' sx={{ transform: 'translate(-50%, -50%)' }}>
                <StoryIndexContent story={story} toggleModal={toggleModal} addCloseIcon />
            </Box>
        </Modal>
    )
}

export default StoryIndexModal;

export const StoryIndexContent = ({ story, toggleModal, addCloseIcon }) => {
    const router = useRouter();
    const { userId, sectionName } = router.query;

    const actualSection = sectionName ? story.sections.find(section => section.slug === sectionName) : undefined;

    return (
        <>
            <Box className='flex flex-row justify-between items-center pb-4 border-b'>
                <Typography variant="h3" noWrap component="div">
                    {story.title}
                </Typography>
                <ShowIf condition={addCloseIcon === true}>
                    <IconButton onClick={toggleModal}>
                        <CloseIcon />
                    </IconButton>
                </ShowIf>
            </Box>

            <List>
                <ListItem key={'section-home'} disablePadding >
                    <ListItemButton selected={!actualSection?.id} className='rounded-md my-1'>
                        <Link href={`/users/${userId}/diary/projects/${story.slug}${domSection}`} onClick={toggleModal} className='w-full'>
                            <ListItemText primary={'1. Home'} />
                        </Link>
                    </ListItemButton>
                </ListItem>
                {
                    story.sections?.map((section, index) => (
                        <ListItem key={'section-' + section.id} disablePadding onClick={toggleModal}>
                            <ListItemButton selected={section.id === actualSection?.id} className='rounded-md my-1'>
                                <Link href={`/users/${userId}/diary/projects/${story.slug}/${section.slug}${domSection}`} className='w-full' >
                                    <ListItemText primary={(index + 2) + '. ' + section.title} />
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </>
    );
}