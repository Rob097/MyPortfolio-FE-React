import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from "prop-types";
import Navbar from "@/components/navbar/headerNavbar";
import PageLayout from "./PageLayout";
import CustomFooter from './Footer';
import { useRouter } from 'next/router';

function CoverLayout(props) {
  const router = useRouter();

  // check if the path contains "/users" or "/explore"
  const isUsersOrExplore = router.pathname.includes('/users') || router.pathname.includes('/explore');

  return (
    <PageLayout background="background.white">
      <Navbar />
      <Box sx={{
        minHeight: `calc(100vh - 80px)`,
        margin: 0,
        padding: 0,
        width: "100%",
        marginTop: props.top
      }}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {props.children}
      </Box>
      {!isUsersOrExplore && <CustomFooter />}
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
