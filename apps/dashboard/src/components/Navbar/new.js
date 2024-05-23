import Breadcrumbs from "@/components/Breadcrumbs";
import { Add, Search } from '@mui/icons-material';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Settings from '@mui/icons-material/Settings';
import { Avatar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import { t } from 'i18next';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from "react-router-dom";
import { useDashboardStore } from "shared/stores/DashboardStore";
import classes from './navbar.module.scss';

const SHOW_SEARCH_BAR = false;

function Navbar(props) {
  const { t } = useTranslation("dashboard");
  const [store, dispatch] = useDashboardStore();
  const route = useLocation().pathname.split("/").slice(1);

  // Account Menu state: START
  const [anchorElAccount, setAnchorElAccount] = React.useState(false);
  const openAccount = Boolean(anchorElAccount);
  const handleAccountClick = (event) => {
    setAnchorElAccount(event.currentTarget);
  };
  const handleAccountClose = () => {
    setAnchorElAccount(null);
  };
  // Account Menu state: END

  // Notifications Menu state: START
  const [anchorElNotifications, setAnchorElNotifications] = React.useState(false);
  const openNotifications = Boolean(anchorElNotifications);
  const handleNotificationsClick = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };
  const handleNotificationsClose = () => {
    setAnchorElNotifications(null);
  };
  // Notifications Menu state: END

  return (
    <>
      <AppBar
        position="fixed"
        sx={(theme) => ({
          width: { lg: `calc(100% - ${props.drawerWidth}px)` },
          ml: { lg: `${props.drawerWidth}px` },
          marginBottom: theme.spacing(2),
          paddingInline: '1rem !important',
        })}
        color='transparent'
        elevation={0}
        className={classes.customAppBar}
      >
        <Toolbar
          className={classes.customToolbar}
          sx={(theme) => ({
            borderRadius: theme.rounded.lg,
            boxShadow: theme.shadows[3],
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing(2),
            flexWrap: 'nowrap',
          })}
        >
          <Box id="left-side-navbar" className="flex justify-start items-center overflow-x-hidden">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={props.handleDrawerToggle}
              sx={{ mr: 2, display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box color="inherit" className="m-auto" display={{ xs: 'none', sm: 'inherit' }} sx={{ overflowX: "scroll", scrollbarWidth: "none", msOverflowStyle: "none", "&::-webkit-scrollbar": { display: "none" } }}>
              <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} />
            </Box>
          </Box>
          <Box id="right-side-navbar" className="flex justify-center items-center space-x-2 pl-4">
            {/* Search bar: */}
            {SHOW_SEARCH_BAR && (<Box sx={{ display: { xs: 'none', xl: 'inherit' }, alignItems: 'flex-end' }}>
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
            <Button variant='contained' color='primary' disableElevation sx={{ height: '40px', display: { xs: 'none', lg: 'inherit' } }} className='whitespace-nowrap' onClick={props.openNewEntityDialog} startIcon={<Add />} >{t('navbar.add-new-button')}</Button>
            <NotificationsNoneOutlinedIcon fontSize='large' className='cursor-pointer' onClick={handleNotificationsClick} aria-controls={openNotifications ? 'notifications-menu' : undefined} aria-haspopup="true" aria-expanded={openNotifications ? 'true' : undefined} />
            <Avatar alt="Remy Sharp" className='cursor-pointer' src={store.user?.customizations?.profileImage ?? ''} onClick={handleAccountClick} aria-controls={openAccount ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={openAccount ? 'true' : undefined} />
          </Box>
        </Toolbar>
      </AppBar>

      <AccountMenu anchorEl={anchorElAccount} open={openAccount} handleClose={handleAccountClose} />

      <NotificationsMenu anchorEl={anchorElNotifications} open={openNotifications} handleClose={handleNotificationsClose} notifications={[]} />

    </>
  );
}

export default Navbar;

const AccountMenu = (props) => {
  const { t } = useTranslation("dashboard");
  const [store, dispatch] = useDashboardStore();

  function handleLogout() {
    props.handleClose();
    dispatch({
      type: "logout"
    });
    window.location.reload();
  }

  const CustomMenuItem = ({ children, ...rest }) => {
    return (
      <MenuItem
        {...rest}
        className='rounded-xl my-2'
      >
        {children}
      </MenuItem>
    );
  }

  return (

    <Menu
      anchorEl={props.anchorEl}
      id="account-menu"
      open={props.open}
      onClose={props.handleClose}
      onClick={props.handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            paddingInline: 1,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      color='primary'
    >
      <CustomMenuItem onClick={props.handleClose} component={Link} to="/dashboard/profile">
        <Avatar src={store.user?.customizations?.profileImage ?? ''} /> {t('navbar.profile')}
      </CustomMenuItem>
      <Divider />
      <CustomMenuItem onClick={props.handleClose}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        {t('navbar.settings')}
      </CustomMenuItem>
      <CustomMenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        {t('navbar.logout')}
      </CustomMenuItem>
    </Menu>

  );
}

const NotificationsMenu = (props) => {
  const { t } = useTranslation("dashboard");

  const CustomMenuItem = ({ children, ...rest }) => {
    return (
      <MenuItem
        {...rest}
        className='rounded-xl my-2'
      >
        {children}
      </MenuItem>
    );
  }

  return (
    <Menu
      anchorEl={props.anchorEl}
      id="notifications-menu"
      open={props.open}
      onClose={props.handleClose}
      onClick={props.handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            paddingInline: 1,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {
        props.notifications.length === 0 ?
          <Box className="p-2">
            <Typography variant="body2">{t('navbar.no-new-notifications')}</Typography>
          </Box>
          :
          props.notifications.map((notification, index) => (
            <CustomMenuItem key={index}>
              {notification}
            </CustomMenuItem>
          ))
      }

    </Menu>
  );
}