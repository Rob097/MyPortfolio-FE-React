// Sidebar.js
import { AccountCircle, Add, Dashboard, Search } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import WidgetsIcon from '@mui/icons-material/Widgets';
import WorkIcon from '@mui/icons-material/Work';
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
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from './LanguageSelector';
import { useCallback } from 'react';

const primaryLinks = [
    { text: 'Dashboard', icon: <Dashboard />, to: '/dashboard/home' },
    { text: 'Profile', icon: <AccountCircle />, to: '/dashboard/profile' }
];

const secondaryLinks = [
    { text: 'Experiences', icon: <WorkIcon />, to: '/dashboard/experiences' },
    { text: 'Educations', icon: <SchoolIcon />, to: '/dashboard/educations' },
    { text: 'Projects', icon: <WidgetsIcon />, to: '/dashboard/projects' },
];

const SHOW_SEARCH_BAR = false;

function Sidebar(props) {
    const { t, i18n } = useTranslation("dashboard");
    // Get the current location from the last route
    const route = useLocation().pathname;

    const isBiggerThanMd = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    let selectedItem = [...primaryLinks, ...secondaryLinks].findIndex((el) => route.includes(el.to));

    const CustomListItem = ({ element, index }) => {

        const translateText = useCallback((text) => {
            let result;
            if (i18n.exists(`dashboard:navbar.${text.toLowerCase()}`)) {
                result = t(`navbar.${text.toLowerCase()}`);
            } else if (i18n.exists(`dashboard:labels.${text.toLowerCase()}`)) {
                result = t(`labels.${text.toLowerCase()}`);
            } else {
                result = text;
            }
            return result;
        }, []);

        return (
            <ListItem key={element.text} disablePadding className='rounded-lg overflow-hidden my-2' >
                <ListItemButton className='rounded-xl' selected={selectedItem === index} to={element.to} component={Link} onClick={() => !isBiggerThanMd && props.handleDrawerClose && props.handleDrawerClose()} >
                    <ListItemIcon color={selectedItem === index ? 'primary' : 'inherit'} >
                        {element.icon && React.cloneElement(element.icon, { color: selectedItem === index ? 'primary' : 'inherit' })}
                    </ListItemIcon>
                    <ListItemText
                        primary={translateText(element.text)}
                        primaryTypographyProps={{
                            color: selectedItem === index ? 'primary' : 'inherit',
                            fontWeight: selectedItem === index ? 'medium' : 'normal',
                            textTransform: "capitalize"
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

            {SHOW_SEARCH_BAR && (<Box className="!sticky bg-white z-10 flex justify-center items-center left-0 px-4 pb-4" sx={{ top: { xs: '48px', sm: '64px' }, display: { xs: 'inherit', xl: 'none' } }}>
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
                        placeholder: t('labels.search'),
                    }}
                />
            </Box>)}

            <Box className="px-4 pb-4" sx={{ minHeight: { xs: `calc(100% - 200px)`, xl: `calc(100% - 150px)` } }}>
                <List >
                    {primaryLinks.map((element, index) => (
                        <CustomListItem key={`primary_links_${index}`} element={element} index={index} />
                    ))}
                </List>
                <Divider />
                <List>
                    <Typography variant='h6' className='!text-md !font-bold !text-gray-400 !mt-4 !mb-2 pl-4'>{t('navbar.my-diary')}</Typography>
                    {secondaryLinks.map((element, index) => (
                        <CustomListItem key={`secondary_links_${index}`} element={element} index={primaryLinks.length + index} />
                    ))}
                </List>
                <Button variant='contained' color='primary' className='!w-full !mt-4' onClick={props.openNewEntityDialog} startIcon={<Add />} >{t('navbar.add-new-button')}</Button>

            </Box>

            <Toolbar className='!sticky bg-white z-10 flex justify-center items-center bottom-0 left-0 py-2 '>
                <LanguageSelector />
            </Toolbar>
        </div>
    );

    return (

        <Box
            component="nav"
            sx={{ width: { lg: props.drawerWidth }, flexShrink: { lg: 0 } }}
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
                        display: { xs: 'block', lg: 'none' },
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
                        display: { xs: 'none', lg: 'block' },
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