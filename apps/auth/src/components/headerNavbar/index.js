import WhiteBar from "@/components/whiteBar";
import tailwindConfig from '@/../tailwind.config';
import Box from '@mui/material/Box';
import Icon from "@mui/material/Icon";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import LanguageSelector from "./languageSelector";
import NavbarLink from "./navbarLink";
import NavbarMobile from "./navbarMobile";
import { useTranslation } from 'react-i18next';

function Navbar({ transparent, light, action }) {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(true);
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
        containerStyles={{ opacity: (show ? 1 : 0), position: 'fixed', zIndex: (show ? 40 : -1), transform: 'translateX(-50%)', left: '50%', transition: 'all 0.5s ease-in-out 0s' }}
      >

        <Box component={Link} href="/" py={transparent ? 1.5 : 0.75} lineHeight={1}>
          <Typography variant="h4" fontWeight="bold" color={light ? "white" : "dark"}>
            <span className='text-primary-main'>My</span><span className='text-dark-main'>Portfolio</span>
          </Typography>
        </Box>

        {!mobileView ? <NavbarLinks closeMobileNavbar={closeMobileNavbar} light={light} /> : <NavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}

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

      </WhiteBar>
    </>
  );
}

export const NavbarLinks = ({ isMobile, closeMobileNavbar, light }) => {
  const { t } = useTranslation("auth");

  return (
    <>
      <Box color="inherit" m={0} p={0} className={isMobile ? "block" : "flex"}>
        <NavbarLink icon="auto_awesome" name={t('navbar.dashboard')} route="/dashboard" light={light} closeMobileNavbar={closeMobileNavbar} />
        <NavbarLink icon="people" name={t('navbar.sign-in')} route="/sign-in" light={light} closeMobileNavbar={closeMobileNavbar} />
        <NavbarLink icon="account_circle" name={t('navbar.sign-up')} route="/sign-up" light={light} closeMobileNavbar={closeMobileNavbar} />
        <NavbarLink icon="volunteer_activism" name={t('navbar.explore')} route="https://www.my-portfolio.it/explore/people" light={light} closeMobileNavbar={closeMobileNavbar} />
      </Box>
      <Box >
        <LanguageSelector isMobile={isMobile} />
      </Box>
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
