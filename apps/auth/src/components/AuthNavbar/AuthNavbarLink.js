import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import SoftBox from "common-lib/components/SoftBox";
import SoftTypography from "common-lib/components/SoftTypography";

function AuthNavbarLink({ icon, name, route, light }) {
  return (
    <SoftBox
      component={Link}
      to={route}
      mx={1}
      p={1}
      display="flex"
      alignItems="center"
      sx={{ cursor: "pointer", userSelect: "none" }}
    >
      <Icon
        sx={{
          color: ({ palette: { white, secondary } }) => (light ? white.main : secondary.main),
          verticalAlign: "middle",
        }}
      >
        {icon}
      </Icon>
      <SoftTypography
        variant="button"
        fontWeight="regular"
        color={light ? "white" : "dark"}
        textTransform="capitalize"
        sx={{ width: "100%", lineHeight: 0 }}
      >
        &nbsp;{name}
      </SoftTypography>
    </SoftBox>
  );
}

// Typechecking props for the AuthNavbarLink
AuthNavbarLink.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
};

export default AuthNavbarLink;
