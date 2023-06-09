
import Grid from "@mui/material/Grid";
import { setLayout, useSoftUIController, setMiniSidenav } from "context/DashboardStore";
import SoftBox from "components/SoftBox";
import Navbar from "components/Navbar";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import brand from "assets/images/logo-ct.png";
import Sidenav from "components/Sidenav";

// Soft UI Dashboard React icons
import Shop from "assets/Icons/Shop";
import Office from "assets/Icons/Office";
import Settings from "assets/Icons/Settings";
import Document from "assets/Icons/Document";
import SpaceShip from "assets/Icons/SpaceShip";
import CustomerSupport from "assets/Icons/CustomerSupport";
import CreditCard from "assets/Icons/CreditCard";
import Cube from "assets/Icons/Cube";

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <Shop size="12px" />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <p>tables</p>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <p>billing</p>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="12px" />,
    component: <p>virtual-reality</p>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <Settings size="12px" />,
    component: <p>rtl</p>,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <p>profile</p>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <p>sign-in</p>,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <p>sign-up</p>,
    noCollapse: true,
  },
];

function Dashboard() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, sidenavColor } = controller;
  const { pathname } = useLocation();
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  useEffect(() => {
    setLayout(dispatch, "dashboard");
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
    <SoftBox
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
      <Navbar />
      <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Soft UI Dashboard"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
      <SoftBox py={3} style={{ minHeight: '200vh' }}>
        <SoftBox mb={3}>
          <Outlet />
        </SoftBox>
        <SoftBox mb={3}>
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
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
            </Grid>
            <Grid item xs={12} lg={5}>
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

export default Dashboard;
