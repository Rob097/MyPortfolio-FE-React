import Box from '@mui/material/Box';
import PropTypes from "prop-types";

function PageLayout({ background, children }) {
  return (
    <Box
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgcolor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </Box>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};

export default PageLayout;
