import Navbar from '@/components/Navbar/new';
import Sidebar from '@/components/Sidenav/new';
import { CustomSnackProvider, SnackbarUtilsConfigurator, displayMessages } from '@/components/alerts';
import { User } from "@/models/user.model";
import { fetcher } from "@/services/base.service";
import { UserService } from "@/services/user.service";
import Box from '@mui/material/Box';
import jwtDecode from "jwt-decode";
import { useEffect, useState } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from "shared/components/Loading";
import { useAuthStore } from "shared/stores/AuthStore";
import { useDashboardStore } from "shared/stores/DashboardStore";
import { View } from "shared/utilities/criteria";
import useSWR from 'swr';

const drawerWidth = 300;

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { promiseInProgress } = usePromiseTracker();

  authLogicsForAllPages();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // sidebar will collapse when the screen is smaller than lg
  return (
    <CustomSnackProvider>
      <SnackbarUtilsConfigurator />
      <Box sx={{ display: 'flex' }}>
        <Navbar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />

        <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerTransitionEnd={handleDrawerTransitionEnd} handleDrawerClose={handleDrawerClose} />

        <Box
          component="main"
          sx={{ flexGrow: 1, py: 3, px: { xs: 1, md: 3 }, width: { lg: `calc(100% - ${drawerWidth}px)` }, backgroundColor: "background.main", paddingTop: "100px" }}
          className='flex flex-col max-w-full min-h-screen text-dark-main'
        >
          {promiseInProgress && <Loading adaptToComponent />}
          <Outlet />
        </Box>
      </Box>
    </CustomSnackProvider>
  );
}

export default ResponsiveDrawer;

function authLogicsForAllPages() {
  const [authStore, authDispatch] = useAuthStore();
  const [store, dispatch] = useDashboardStore();
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR(UserService.getByIdUrl(authStore.user.id, View.verbose), fetcher);

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      navigate('/auth/sign-in');
    } else if (authStore.user && authStore.user.customizations && authStore.user.customizations.isSet !== true) {
      navigate('/auth/setup');
    } else if (authStore.isLoggedIn && authStore.token) {
      // check if the token is expired:
      const decodedToken = jwtDecode(authStore.token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        displayMessages([{ text: "Session expired, please login again", level: 'error' }]);
        authDispatch({ type: "logout" });
        dispatch({ type: "logout" });
        navigate('/auth/sign-in');
      }
    }
  }, [store.user, authStore.user]);

  useEffect(() => {
    if (data) {
      const user = new User(data.content);
      dispatch({ type: "replaceUser", payload: { user: user } });
    }
  }, [data]);

}