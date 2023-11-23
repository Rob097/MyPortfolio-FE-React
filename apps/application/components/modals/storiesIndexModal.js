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
import { useTranslation } from 'next-i18next';

const domSection = '#mainEntityStory';

const StoriesIndexModal = ({ entity, open, toggleModal }) => {
    return (
        <Modal
            open={open}
            onClose={toggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='absolute top-1/2 left-1/2 w-2/3 xl:w-1/3 h-3/5 rounded-xl bg-background-main shadow-xl p-6' sx={{ transform: 'translate(-50%, -50%)' }}>
                <StoriesIndexContent entity={entity} toggleModal={toggleModal} addCloseIcon />
            </Box>
        </Modal>
    )
}

export default StoriesIndexModal;

export const StoriesIndexContent = ({ entity, toggleModal, addCloseIcon }) => {
    const router = useRouter();
    const { t } = useTranslation(['common']);
    const { userSlug, storySlug, entityType } = router.query;

    const actualSection = storySlug ? entity.stories.find(story => story.slug === storySlug) : undefined;

    return (
        <>
            <Box className='flex flex-row justify-between items-center pb-4 border-b'>
                <Typography variant="h3" noWrap component="div">
                    {entity.title || entity.field}
                </Typography>
                <ShowIf condition={addCloseIcon === true}>
                    <IconButton onClick={toggleModal}>
                        <CloseIcon />
                    </IconButton>
                </ShowIf>
            </Box>

            <List>
                <ListItem key={'story-home'} disablePadding >
                    <ListItemButton selected={!actualSection?.id} className='rounded-md my-1'>
                        <Link href={`/users/${userSlug}/diary/${entityType}/${entity.slug}${domSection}`} onClick={toggleModal} className='w-full'>
                            <ListItemText primary={'1. ' + t('common:home')} />
                        </Link>
                    </ListItemButton>
                </ListItem>
                {
                    entity.stories?.map((story, index) => (
                        <ListItem key={'story-' + story.id} disablePadding onClick={toggleModal}>
                            <ListItemButton selected={story.id === actualSection?.id} className='rounded-md my-1'>
                                <Link href={`/users/${userSlug}/diary/${entityType}/${entity.slug}/${story.slug}${domSection}`} className='w-full' >
                                    <ListItemText primary={(index + 2) + '. ' + story.title} />
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </>
    );
}