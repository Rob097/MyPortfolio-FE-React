
import Grid from "@mui/material/Grid";
import { setLayout, useSoftUIController } from "context/DashboardStore";
import SoftBox from "components/SoftBox";
import Navbar from "components/Navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

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
      <SoftBox py={3} style={{ minHeight: '200vh' }}>
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
