import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

// Soft UI Dashboard React components
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";

// Soft UI Dashboard React icons
import ViewInArIcon from '@mui/icons-material/ViewInAr';

import DescriptionIcon from '@mui/icons-material/Description';

import SettingsIcon from '@mui/icons-material/Settings';

// Soft UI Dashboard React base styles
import { useTheme } from '@mui/material/styles';

import { useAuthStore } from "shared/stores/AuthStore";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const [store] = useAuthStore();
  const theme = useTheme();
  const { breakpoints } = theme;

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
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { info } }) =>
            `${linearGradient(
              rgba(info.main, 0.6),
              rgba(info.main, 0.6)
            )}, url(${""})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
          borderRadius: "1rem"
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white, 0.8),
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
              src={""}
              alt="profile-image"
              variant="rounded"
              size="xl"
              sx={{ width: 74, height: 74 }}
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <Box height="100%" mt={0.5} lineHeight={1}>
              <Typography variant="h5" fontWeight="medium">
                {store.user?.firstName} {store.user?.lastName}
              </Typography>
              <Typography variant="button" color="text" fontWeight="medium">
                CEO / Co-Founder
              </Typography>
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
                <Tab label="Bio" icon={<ViewInArIcon />} />
                <Tab label="Projects" icon={<DescriptionIcon />} />
                <Tab label="Diary" icon={<SettingsIcon />} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default Header;