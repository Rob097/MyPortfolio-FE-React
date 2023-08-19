import Box from '@mui/material/Box';
import Icon from "@mui/material/Icon";
import Typography from '@mui/material/Typography';
import Link from "next/link";
import PropTypes from "prop-types";

function NavbarLink({ icon, name, route, light }) {
  return (
    <Box
      component={Link}
      href={route}
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

// Typechecking props for the NavbarLink
NavbarLink.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
};

export default NavbarLink;
