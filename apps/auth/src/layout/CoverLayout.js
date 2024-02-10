import Footer from "@/components/Footer";
import Navbar from "@/components/headerNavbar";
import { Box, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import PageLayout from "./PageLayout";

function CoverLayout(props) {

  return (
    <>
      <PageLayout background="background.white">
        <Navbar />
        <Grid
          container
          justifyContent="center"
          sx={{
            minHeight: { xs: 'auto', md: `calc(100vh - 80px)` },
            width: "100%",
            margin: 0,
            padding: 0,
            marginTop: props.top
          }}
        >
          <Grid item xs={11} sm={8} md={5} xl={3} >
            <Box
              // mt={props.top} 
              display="flex"
              flexDirection="column"
              justifyContent="center"
              className="h-full"
            >
              <Box pt={3} px={3}>
                {!props.header ? (
                  <>
                    <Box mb={1}>
                      <Typography variant="h3" fontWeight="bold" color={props.color}>
                        {props.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight="regular" color="text">
                      {props.description}
                    </Typography>
                  </>
                ) : (
                  props.header
                )}
              </Box>
              <Box p={3}>{props.children}</Box>
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
                borderBottomLeftRadius: ({ rounded }) => rounded.lg,
              }}
            >
              <Box
                ml={-8}
                height="100%"
                sx={{
                  backgroundImage: `url(${props.image})`,
                  backgroundSize: "cover",
                  transform: "skewX(10deg)",
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Footer />
      </PageLayout>
    </>
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
