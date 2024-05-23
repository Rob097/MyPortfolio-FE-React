import Navbar from '@/components/Navbar/new';
import Sidebar from '@/components/Sidenav/new';
import { CustomSnackProvider, SnackbarUtilsConfigurator, displayMessages } from '@/components/alerts';
import { User } from "@/models/user.model";
import { fetcher } from "@/services/base.service";
import { UserService } from "@/services/user.service";
import { School, Widgets, Work } from '@mui/icons-material';
import { Button, Card, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import jwtDecode from "jwt-decode";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePromiseTracker } from 'react-promise-tracker';
import { Link, Outlet, useNavigate } from 'react-router-dom';
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
  const [isNewEntityDialogOpen, setIsNewEntityDialogOpen] = useState(false);

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

  function openNewEntityDialog() {
    setIsNewEntityDialogOpen(true);
  }

  function closeNewEntityDialog() {
    setIsNewEntityDialogOpen(false);
  }

  // sidebar will collapse when the screen is smaller than lg
  return (
    <CustomSnackProvider>
      <SnackbarUtilsConfigurator />
      <Box sx={{ display: 'flex' }}>
        <Navbar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} openNewEntityDialog={openNewEntityDialog} />

        <Sidebar drawerWidth={drawerWidth} mobileOpen={mobileOpen} handleDrawerTransitionEnd={handleDrawerTransitionEnd} handleDrawerClose={handleDrawerClose} openNewEntityDialog={openNewEntityDialog} />

        <Box
          component="main"
          sx={{ flexGrow: 1, py: 3, px: { xs: 1, md: 3 }, width: { lg: `calc(100% - ${drawerWidth}px)` }, backgroundColor: "background.main", paddingTop: "100px" }}
          className='flex flex-col max-w-full min-h-screen text-dark-main'
        >
          {promiseInProgress && <Loading adaptToComponent />}
          <Outlet />
        </Box>
      </Box>

      <NewEntityDialog isOpen={isNewEntityDialogOpen} onClose={closeNewEntityDialog} />

    </CustomSnackProvider>
  );
}

export default ResponsiveDrawer;

function authLogicsForAllPages() {
  const [authStore, authDispatch] = useAuthStore();
  const [store, dispatch] = useDashboardStore();
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR(UserService.getByIdUrl(authStore.user?.id, View.verbose), fetcher);

  useEffect(() => {
    if (window.location.pathname !== '/dashboard/404' && window.location.pathname !== '/dashboard/500') {
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
    }
  }, [store.user, authStore.user]);

  useEffect(() => {
    if (data) {
      const user = new User(data.content);
      dispatch({ type: "replaceUser", payload: { user: user } });
    }
  }, [data]);

}

// Dialog to let the user decide to create a new Project, Education or Experience.
const NewEntityDialog = ({ isOpen, onClose }) => {
  const { t } = useTranslation("dashboard");

  const CustomButton = ({ children, icon, ...rest }) => {
    return (
      <Card
        {...rest}
        className='!rounded-md !m-2 !p-2 !cursor-pointer hover:bg-gray-100 w-40 h-40 flex flex-col justify-center items-center space-y-2'
      >
        {icon && icon}
        {children}
      </Card>
    );
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      keepMounted
    >
      <DialogTitle id="alert-dialog-title" variant='h4' className='text-center sm:text-left'>
        {t('navbar.add-new-title')}
      </DialogTitle>
      <DialogContent>
        <Box className='flex flex-row flex-wrap justify-center'>
          <Link to="/dashboard/projects/new" onClick={onClose}>
            <CustomButton icon={<Widgets fontSize='medium' color='primary' />}>
              <Typography variant='h5'>{t('labels.project')}</Typography>
            </CustomButton>
          </Link>
          <Link to="/dashboard/educations/new" onClick={onClose}>
            <CustomButton icon={<School fontSize='medium' color='primary' />}>
              <Typography variant='h5'>{t('labels.education')}</Typography>
            </CustomButton>
          </Link>
          <Link to="/dashboard/experiences/new" onClick={onClose}>
            <CustomButton icon={<Work fontSize='medium' color='primary' />}>
              <Typography variant='h5'>{t('labels.experience')}</Typography>
            </CustomButton>
          </Link>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined' color="primary">
          {t('labels.close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
