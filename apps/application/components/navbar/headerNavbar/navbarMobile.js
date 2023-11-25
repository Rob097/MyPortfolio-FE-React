import Menu from "@mui/material/Menu";
import PropTypes from "prop-types";
import { NavbarLinks } from './index';

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
      inputprops={{ MenuProps: { disableScrollLock: true } }}
    >
      <NavbarLinks isMobile closeMobileNavbar={close} />
    </Menu>
  );
}

// Typechecking props for the AuthNavbarMenu
NavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
};

export default NavbarMobile;
