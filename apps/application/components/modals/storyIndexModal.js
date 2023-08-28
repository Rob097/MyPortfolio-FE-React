import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';

const StoryIndexModal = ({ story, open, toggleModal }) => {
    const [selectedSection, setSelectedSection] = useState();

    const handleListItemClick = (section) => {
        setSelectedSection(section);
    };

    return (
        <Modal
            open={open}
            onClose={toggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='absolute top-1/2 left-1/2 w-2/3 lg:w-1/2 h-3/5 rounded-xl bg-background-main shadow-xl p-0' sx={{ transform: 'translate(-50%, -50%)' }}>
                <Grid container className='h-full'>
                    <Grid item xs={4} className='h-full'>
                        <Toolbar>
                            <Typography variant="h4" noWrap component="div">
                                Sections
                            </Typography>
                        </Toolbar>
                        <Divider />
                        <List>
                            {story.sections.map((section) => (
                                <ListItem key={'section-' + section.id} disablePadding onClick={() => handleListItemClick(section)}>
                                    <ListItemButton>
                                        <ListItemText primary={section.title} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={8} className='h-full border-l'>
                        <Toolbar className='justify-between'>
                            <Typography variant="h4" noWrap component="div">
                                Sub Sections
                            </Typography>
                            <IconButton onClick={toggleModal} >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                        <List className='py-2'>
                            {
                                selectedSection ?
                                    selectedSection?.subSections ?
                                        selectedSection?.subSections?.map((section) => (
                                            <ListItem key={'subsection-' + section.id} disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primary={section.title} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))
                                        :
                                        <ListItem key={0} id={0} disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary='Home' />
                                            </ListItemButton>
                                        </ListItem>
                                    :
                                    <Box className='py-2 px-4'>Select a section to start</Box>
                            }
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default StoryIndexModal;