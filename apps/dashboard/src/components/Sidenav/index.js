import { Button, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import SidenavCollapse from "components/Sidenav/SidenavCollapse";
import SidenavRoot from "components/Sidenav/SidenavRoot";
import sidenavLogoLabel from "components/Sidenav/styles/sidenav";
import { setMiniSidenav, useSoftUIController } from "shared/stores/DashboardStore";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const splitted = pathname.split("/").slice(1);
  const collapseName = splitted[splitted.length - 1];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, route, href }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            color={color}
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink to={route} key={key}>
          <SidenavCollapse
            color={color}
            key={key}
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <Typography
          key={key}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          opacity={0.6}
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </Typography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} />;
    }

    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <Box pt={3} pb={1} px={4} textAlign="center">
        <Box
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <Typography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </Typography>
        </Box>
        <Box component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <Box component="img" src={brand} alt="Soft UI Logo" width="2rem" />}
          <Box
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <Typography component="h6" variant="button" fontWeight="medium">
              {brandName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <List>{renderRoutes}</List>
      <Box pt={2} my={2} mx={2} mt="auto">
        <Box mt={2}>
          <Button
            component="a"
            href="https://creative-tim.com/product/soft-ui-dashboard-pro-react"
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            color={color}
            fullWidth
          >
            upgrade to pro
          </Button>
        </Box>
        <Box mt={2} className="flex justify-center">
          <LanguageSelector />
        </Box>
      </Box>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
