// Sidebar.js
import { AccountCircle, Dashboard, Search } from '@mui/icons-material';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Button, Typography, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from "@mui/material/Drawer";
import InputAdornment from '@mui/material/InputAdornment';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText";
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from './LanguageSelector';

const primaryLinks = [
    { text: 'Dashboard', icon: <Dashboard />, to: '/dashboard/home' },
    { text: 'Profile', icon: <AccountCircle />, to: '/dashboard/profile' }
];

const secondaryLinks = [
    { text: 'Projects', icon: <InboxIcon />, to: '/dashboard/all-mail' },
    { text: 'Experiences', icon: <MailIcon />, to: '/dashboard/trash' },
    { text: 'Educations', icon: <InboxIcon />, to: '/dashboard/spam' },
];

function Sidebar(props) {
    // Get the current location from the last route
    const route = useLocation().pathname.split("/").slice(1);

    const isBiggerThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
    let selectedItem = [...primaryLinks, ...secondaryLinks].findIndex((el) => el.to === `/${route[0]}`);

    const CustomListItem = ({ element, index }) => {
        return (
            <ListItem key={element.text} disablePadding className='rounded-lg overflow-hidden my-2' >
                <ListItemButton className='rounded-xl' selected={selectedItem === index} to={element.to} component={Link}>
                    <ListItemIcon color={selectedItem === index ? 'primary' : 'inherit'} >
                        {element.icon && React.cloneElement(element.icon, { color: selectedItem === index ? 'primary' : 'inherit' })}
                    </ListItemIcon>
                    <ListItemText
                        primary={element.text}
                        primaryTypographyProps={{
                            color: selectedItem === index ? 'primary' : 'inherit',
                            fontWeight: selectedItem === index ? 'medium' : 'normal'
                        }}
                    />
                </ListItemButton>
            </ListItem>
        );
    };

    const drawer = (
        <div className='h-full'>
            <Toolbar className='!sticky bg-white z-10 flex justify-center items-center top-0 left-0'>
                <Typography variant='h1' className="!text-xl" fontWeight="bold"><span className='text-primary-main' >My</span><span>Portfolio</span></Typography>
            </Toolbar>

            <Box className="!sticky bg-white z-10 flex justify-center items-center left-0 px-4 pb-4" sx={{ top: {xs: '48px', sm: '64px'}, display: { xs: 'inherit', xl: 'none' } }}>
                <TextField
                    id="input-with-sx"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        sx: { height: '40px' },
                        placeholder: 'Search',
                    }}
                />
            </Box>

            <Box className="px-4 pb-4" sx={{ minHeight: { xs: `calc(100% - 200px)`, xl: `calc(100% - 150px)` } }}>
                <List >
                    {primaryLinks.map((element, index) => (
                        <CustomListItem key={`primary_links_${index}`} element={element} index={index} />
                    ))}
                </List>
                <Divider />
                <List>
                    <Typography variant='h6' className='!text-md !font-bold !text-gray-400 !mt-4 !mb-2 pl-4'>My Diary</Typography>
                    {secondaryLinks.map((element, index) => (
                        <CustomListItem key={`secondary_links_${index}`} element={element} index={primaryLinks.length + index} />
                    ))}
                </List>
                <Button variant='contained' color='primary' className='!w-full !mt-4'>+ Add New</Button>

            </Box>

            <Toolbar className='!sticky bg-white z-10 flex justify-center items-center bottom-0 left-0 py-2 '>
                <LanguageSelector />
            </Toolbar>
        </div>
    );

    return (

        <Box
            component="nav"
            sx={{ width: { md: props.drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="mailbox folders"
        >
            {!isBiggerThanMd &&
                <Drawer
                    variant="temporary"
                    open={props.mobileOpen}
                    onTransitionEnd={props.handleDrawerTransitionEnd}
                    onClose={props.handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            }
            {isBiggerThanMd &&
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            }
        </Box>

    );
}

export default Sidebar;