import { Box, Icon, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AuthNavbarLink({ icon, name, route, light }) {
  return (
    <Box
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
          color: ({ palette: { white, secondary } }) => (light ? white : secondary.main),
          verticalAlign: "middle",
        }}
      >
        {icon}
      </Icon>
      <Typography
        variant="button"
        fontWeight="regular"
        color={light ? "white" : "dark"}
        textTransform="capitalize"
        sx={{ width: "100%", lineHeight: 0 }}
      >
        &nbsp;{name}
      </Typography>
    </Box>
  );
}

// Typechecking props for the AuthNavbarLink
AuthNavbarLink.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
};

export default AuthNavbarLink;
