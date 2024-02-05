
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Navbar from "components/Navbar";
import Sidenav from "components/Sidenav";
import { setLayout, setMiniSidenav, useSoftUIController } from "shared/stores/DashboardStore";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

// Soft UI Dashboard React icons
import CreditCardIcon from '@mui/icons-material/CreditCard';

import ViewInArIcon from '@mui/icons-material/ViewInAr';

import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import DescriptionIcon from '@mui/icons-material/Description';

import BusinessIcon from '@mui/icons-material/Business';

import StorefrontIcon from '@mui/icons-material/Storefront';

import RocketIcon from '@mui/icons-material/Rocket';
import { Typography } from '@mui/material';

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "home",
    icon: <StorefrontIcon />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <BusinessIcon />,
    component: <p>tables</p>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCardIcon />,
    component: <p>billing</p>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <ViewInArIcon />,
    component: <p>virtual-reality</p>,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "profile",
    icon: <SupportAgentIcon />,
    component: <p>profile</p>,
    noCollapse: true,
    navbar: {
      absolute: true,
      light: true
    }
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/auth/sign-in",
    icon: <DescriptionIcon />,
    component: <p>sign-in</p>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/auth/sign-up",
    icon: <RocketIcon />,
    component: <p>sign-up</p>,
    noCollapse: true,
  },
];

function Dashboard() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, sidenavColor } = controller;
  const { pathname } = useLocation();
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [currentRoute, setCurrentRoute] = useState();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
    setCurrentRoute(routes.filter(route => route.route === pathname)?.[0]);
  }, [pathname]);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  return (
    <Box
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      <Navbar absolute={currentRoute?.navbar?.absolute} light={currentRoute?.navbar?.light} />
      <Sidenav
        color={sidenavColor}
        brand={""}
        brandName="Soft UI Dashboard"
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <Box py={currentRoute?.navbar?.absolute ? 0 : 3} style={{ minHeight: '200vh' }}>
        <Box mb={3}>
          <Outlet />
          <h1 className='text-7xl font-bold underline'>This is a test</h1>
          <Typography variant="h1">This is a test</Typography>
          <a href="https://www.google.com">This is a test of a link</a>
        </Box>
        <Box mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              {/* <MiniStatisticsCard
                title={{ text: "today's money" }}
                count="$53,000"
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              /> */}
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
            </Grid>
          </Grid>
        </Box>
        <Box mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
            </Grid>
            <Grid item xs={12} lg={5}>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
