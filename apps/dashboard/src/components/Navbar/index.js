import LogoutIcon from '@mui/icons-material/Logout';
import { Modal, TextField, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Breadcrumbs from "components/Breadcrumbs";
import NotificationItem from "components/NotificationItem";
import { useAuthStore } from "shared/stores/AuthStore";
import {
  setMiniSidenav,
  setOpenConfigurator,
  setTransparentNavbar,
  useSoftUIController,
} from "shared/stores/DashboardStore";
import * as React from 'react';
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from "react-router-dom";
import {
  customContainer,
  navbar,
  navbarIconButton,
  navbarMobileMenu,
  navbarRow,
} from "./styles";

function Navbar({ absolute, light, isMini }) {
  const { t, i18n } = useTranslation(["dashboard", "common"]);
  const navigate = useNavigate();
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [authStore, authDispatch] = useAuthStore();

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const openSignOutConfirm = () => setOpenSignOutModal(true);
  const closeSignOutModal = () => setOpenSignOutModal(false);

  function handleSignOut() {
    authDispatch({
      type: "logout"
    });
    navigate('/');
  }

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        image={<img src={""} alt="person" />}
        title={["New message", "from Laur"]}
        date="13 minutes ago"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        image={<img src={""} alt="person" />}
        title={["New album", "by Travis Scott"]}
        date="1 day"
        onClick={handleCloseMenu}
      />
      <NotificationItem
        color="secondary"
        image={
          <Icon fontSize="small" sx={{ color: ({ palette: { white } }) => white }}>
            payment
          </Icon>
        }
        title={["", "Payment successfully completed"]}
        date="2 days"
        onClick={handleCloseMenu}
      />
    </Menu>
  );

  const SignOutConfirmModal = () => (
    <Modal
      id="sign-out-modal"
      open={openSignOutModal}
      handleClose={closeSignOutModal}
      handleConfirm={handleSignOut}
      title="Logout"
      confirmLabel={t('common:confirm')}
      closeLabel={t('common:cancel')}
    >
      <Typography sx={{ mt: 2 }}>
        {t('dashboard:navbar.sign-out-confirm')}
      </Typography>
    </Modal>
  )

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => customContainer(theme)}>
        <Box color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </Box>
        {isMini ? null : (
          <Box sx={(theme) => navbarRow(theme, { isMini })}>
            <Box pr={1}>
              <TextField
                placeholder="Type here..."
                icon={{ component: "search", direction: "left" }}
              />
            </Box>
            <Box color={light ? "white" : "inherit"}>

              {authStore?.isLoggedIn &&
                <>
                  <IconButton sx={navbarIconButton} size="small" onClick={openSignOutConfirm}>
                    <LogoutIcon
                      sx={({ palette: { dark, white } }) => ({
                        color: light ? white : dark.main,
                      })}
                    />
                    <Typography
                      variant="button"
                      fontWeight="medium"
                      color={light ? "white" : "dark"}
                    >
                      {t('dashboard:navbar.sign-out-button')}
                    </Typography>
                  </IconButton>
                  <SignOutConfirmModal />
                </>
              }
              <IconButton
                size="small"
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon className={light ? "text-white" : "text-dark"}>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;