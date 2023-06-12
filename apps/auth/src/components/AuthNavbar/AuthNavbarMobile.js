import Menu from "@mui/material/Menu";
import SoftBox from "common-lib/components/SoftBox";
import PropTypes from "prop-types";
import AuthNavbarLink from "./AuthNavbarLink";

function AuthNavbarMobile({ open, close }) {
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
      <SoftBox px={0.5}>
        <AuthNavbarLink icon="donut_large" name="dashboard" route="/dashboard" />
        <AuthNavbarLink icon="person" name="profile" route="/profile" />
        <AuthNavbarLink icon="account_circle" name="sign up" route="/authentication/sign-up" />
        <AuthNavbarLink icon="key" name="sign in" route="/authentication/sign-in" />
      </SoftBox>
    </Menu>
  );
}

// Typechecking props for the AuthNavbarMenu
AuthNavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
};

export default AuthNavbarMobile;
