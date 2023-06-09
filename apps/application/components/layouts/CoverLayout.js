import Box from '@mui/material/Box';
import PropTypes from "prop-types";
import Navbar from "../navbar";
import PageLayout from "./PageLayout";

function CoverLayout(props) {
  return (
    <PageLayout background="#ffffff">
      <Navbar
        action={{
          type: "external",
          route: "https://creative-tim.com/product/soft-ui-dashboard-react",
          label: "free download",
          color: "dark",
        }}
      />
      <Box sx={{
        minHeight: "75vh",
        margin: 0,
        padding: 0,
        marginTop: props.top
      }}>{props.children}</Box>

    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  color: "info",
  top: 10,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
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
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
