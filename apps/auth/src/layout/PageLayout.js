import tailwindConfig from '@/../tailwind.config.js';
import Box from '@mui/material/Box';
import PropTypes from "prop-types";

function PageLayout(props) {
  return (
    <Box
      width="100%"
      height="100%"
      minHeight="100vh"
      bgcolor={tailwindConfig.theme.colors.white}
      sx={{ display: 'flow-root', overflowX: { xs: 'hidden', md: "visible" } }}
    >
      {props.children}
    </Box>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;