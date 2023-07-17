import { useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import PropTypes from "prop-types";
function PageLayout(props) {
  const theme = useTheme();
  const { palette } = theme;
  const background = palette[props.background] ? palette[props.background] : props.background;

  return (
    <Box
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgcolor={background}
      sx={{ overflowX: "hidden" }}
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
