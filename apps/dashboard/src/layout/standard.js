import Navbar from '@/components/Navbar/new';
import Sidebar from '@/components/Sidenav/new';
import { fetcher } from "@/services/base.service";
import { UserService } from "@/services/user.service";
import Box from '@mui/material/Box';
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

  return (

    <Box sx={{ display: 'flex' }}>
      <Navbar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />

      <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerTransitionEnd={handleDrawerTransitionEnd} handleDrawerClose={handleDrawerClose} />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: "background.main", paddingTop: "100px" }}
        className='min-h-screen text-dark-main'
      >
        {promiseInProgress && <Loading adaptToComponent />}
        <Outlet />
      </Box>
    </Box>
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
    }
  }, [store.user, authStore.user]);

  useEffect(() => {
    if (data) {
      dispatch({ type: "replaceUser", payload: { user: data.content } });
    }
  }, [data]);

}