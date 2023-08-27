import tailwindConfig from '@/tailwind.config';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from "@mui/material/Icon";
import Typography from '@mui/material/Typography';
import { Link } from "next/link";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import WhiteBar from "@/components/whiteBar";
import LanguageSelector from "./languageSelector";
import NavbarLink from "./navbarLink";
import NavbarMobile from "./navbarMobile";

function Navbar({ transparent, light, action }) {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [show, setShow] = useState(true);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  const { screens } = tailwindConfig.theme;
  const lgBreakpoint = parseInt(screens.lg.replace('px', ''));

  useEffect(() => {
    let previousScrollPosition = 0;
    let currentScrollPosition = 0;

    window.addEventListener('scroll', function (e) {

      // Get the new Value
      currentScrollPosition = window.scrollY;

      //Subtract the two and conclude
      if (previousScrollPosition - currentScrollPosition < 0) {
        setShow(false);
      } else if (previousScrollPosition - currentScrollPosition > 0) {
        setShow(true);
      }

      // Update the previous value
      previousScrollPosition = currentScrollPosition;
    });
  }, []);

  useEffect(() => {
    // A function that sets the display state for the NavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < lgBreakpoint) {
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

    <>
      <WhiteBar
        containerStyles={{ opacity: (show ? 1 : 0), position: 'fixed', zIndex: (show ? 40 : 0), transform: 'translateX(-50%)', left: '50%', transition: 'all 0.5s ease-in-out 0s' }}
      >
        <Box component={Link} to="/" py={transparent ? 1.5 : 0.75} lineHeight={1}>
          <Typography variant="h4" fontWeight="bold" color={light ? "white" : "dark"}>
            <span className='text-primary-main'>My</span><span className='text-dark-main'>Portfolio</span>
          </Typography>
        </Box>
        <Box color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <NavbarLink icon="donut_large" name="dashboard" route="/" light={light} />
          <NavbarLink icon="person" name="profile" route="/users/user1/home" light={light} />
          <NavbarLink
            icon="account_circle"
            name="sign up"
            route="/auth/sign-up"
            light={light}
          />
          <NavbarLink
            icon="key"
            name="sign in"
            route="/auth/sign-in"
            light={light}
          />
        </Box>
        {action &&
          (action.type === "internal" ? (
            <Box display={{ xs: "none", lg: "inline-block" }}>
              <Button
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                circular
              >
                {action.label}
              </Button>
            </Box>
          ) : (
            <Box display={{ xs: "none", lg: "inline-block" }}>
              {/* <Button
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
              </Button> */}
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
        {mobileView && <NavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
      </WhiteBar>
    </>
  );
}

// Setting default values for the props of Navbar
Navbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the Navbar
Navbar.propTypes = {
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

export default Navbar;
