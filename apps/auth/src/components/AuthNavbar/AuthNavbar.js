import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";
import breakpoints from "common-lib/assets/theme/base/breakpoints";
import Box from '@mui/material/Box';
import SoftButton from "common-lib/components/SoftButton";
import SoftTypography from "common-lib/components/SoftTypography";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthNavbarLink from "./AuthNavbarLink";
import AuthNavbarMobile from "./AuthNavbarMobile";
import LanguageSelector from "./LanguageSelector";
import boxShadows from "common-lib/assets/theme/base/boxShadows"
import styles from './navbar.module.css';

function AuthNavbar({ transparent, light, action }) {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  useEffect(() => {
    // A function that sets the display state for the AuthNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <Container className={styles.navbarContainer}>
      <Box
        py={1.5}
        px={{ xs: transparent ? 4 : 5, sm: transparent ? 2 : 5, lg: transparent ? 0 : 5 }}
        my={2}
        mx={3}
        width="calc(100% - 48px)"
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="absolute"
        left={0}
        zIndex={3}
        sx={({ palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
          borderRadius: '10rem',
          boxShadow: transparent ? "none" : boxShadows["md"]
        })}
      >
        <Box component={Link} to="/" py={transparent ? 1.5 : 0.75} lineHeight={1}>
          <SoftTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
            Soft UI Dashboard
          </SoftTypography>
        </Box>
        <Box color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <AuthNavbarLink icon="donut_large" name="dashboard" route="/dashboard" light={light} />
          <AuthNavbarLink icon="person" name="profile" route="/profile" light={light} />
          <AuthNavbarLink
            icon="account_circle"
            name="sign up"
            route="/auth/sign-up"
            light={light}
          />
          <AuthNavbarLink
            icon="key"
            name="sign in"
            route="/auth/sign-in"
            light={light}
          />
        </Box>
        {action &&
          (action.type === "internal" ? (
            <Box display={{ xs: "none", lg: "inline-block" }}>
              <SoftButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                circular
              >
                {action.label}
              </SoftButton>
            </Box>
          ) : (
            <Box display={{ xs: "none", lg: "inline-block" }}>
              {/* <SoftButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                circular
              >
                {action.label}
              </SoftButton> */}
              <LanguageSelector />
            </Box>
          ))}
        <Box
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
        </Box>
      </Box>
      {mobileView && <AuthNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

// Setting default values for the props of AuthNavbar
AuthNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the AuthNavbar
AuthNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default AuthNavbar;
