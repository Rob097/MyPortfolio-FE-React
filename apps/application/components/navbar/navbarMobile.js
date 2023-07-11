import Menu from "@mui/material/Menu";
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import NavbarLink from "./navbarLink";
import LanguageSelector from "./languageSelector";

function NavbarMobile({ open, close }) {
  const { width } = open && open.getBoundingClientRect();

  return (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      MenuListProps={{ style: { width: `calc(${width}px - 4rem)` } }}
    >
      <Box px={0.5}>
        <NavbarLink icon="donut_large" name="dashboard" route="/dashboard" />
        <NavbarLink icon="person" name="profile" route="/profile" />
        <NavbarLink icon="account_circle" name="sign up" route="/authentication/sign-up" />
        <NavbarLink icon="key" name="sign in" route="/authentication/sign-in" />
        <LanguageSelector isMobile />
      </Box>
    </Menu>
  );
}

// Typechecking props for the AuthNavbarMenu
NavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
};

export default NavbarMobile;
