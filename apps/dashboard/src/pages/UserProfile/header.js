import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// Soft UI Dashboard React components
import Box from '@mui/material/Box';
import SoftTypography from "@rob097/common-lib/components/SoftTypography";
// import SoftAvatar from "@rob097/common-lib/components/SoftAvatar";
import Avatar from "@mui/material/Avatar";

// Soft UI Dashboard React icons
import Cube from "@rob097/common-lib/assets/Icons/Cube";
import Document from "@rob097/common-lib/assets/Icons/Document";
import Settings from "@rob097/common-lib/assets/Icons/Settings";

// Soft UI Dashboard React base styles
import breakpoints from "@rob097/common-lib/assets/theme/base/breakpoints";

// Images
import burceMars from "@rob097/common-lib/assets/images/bruce-mars.jpg";
import curved0 from "@rob097/common-lib/assets/images/curved-images/curved0.jpg";

import { useAuthStore } from "context/AuthStore";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [store] = useAuthStore();

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <Box position="relative">
      <Box
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
          borderRadius: "1rem"
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={burceMars}
              alt="profile-image"
              variant="rounded"
              size="xl"
              sx={{ width: 74, height: 74 }}
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {store.user?.firstName} {store.user?.lastName}
              </SoftTypography>
              <SoftTypography variant="button" color="text" fontWeight="medium">
                CEO / Co-Founder
              </SoftTypography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                <Tab label="Bio" icon={<Cube />} />
                <Tab label="Projects" icon={<Document />} />
                <Tab label="Diary" icon={<Settings />} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default Header;