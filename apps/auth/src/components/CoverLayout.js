import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import SoftTypography from "common-lib/components/SoftTypography";
import AuthNavbar from "./AuthNavbar/AuthNavbar";
import PageLayout from "./PageLayout";
import Footer from "./Footer";

function CoverLayout({ color, header, title, description, image, top, children }) {
  return (
    <PageLayout background="white">
      <AuthNavbar
        action={{
          type: "external",
          route: "https://creative-tim.com/product/soft-ui-dashboard-react",
          label: "free download",
          color: "dark",
        }}
      />
      <Grid
        container
        justifyContent="center"
        sx={{
          minHeight: "75vh",
          margin: 0,
        }}
      >
        <Grid item xs={11} sm={8} md={5} xl={3}>
          <Box mt={top}>
            <Box pt={3} px={3}>
              {!header ? (
                <>
                  <Box mb={1}>
                    <SoftTypography variant="h3" fontWeight="bold" color={color} textGradient>
                      {title}
                    </SoftTypography>
                  </Box>
                  <SoftTypography variant="body2" fontWeight="regular" color="text">
                    {description}
                  </SoftTypography>
                </>
              ) : (
                header
              )}
            </Box>
            <Box p={3}>{children}</Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box
            height="100%"
            display={{ xs: "none", md: "block" }}
            position="relative"
            right={{ md: "-12rem", xl: "-16rem" }}
            mr={-16}
            sx={{
              transform: "skewX(-10deg)",
              overflow: "hidden",
              borderBottomLeftRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
            }}
          >
            <Box
              ml={-8}
              height="100%"
              sx={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                transform: "skewX(10deg)",
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
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
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
