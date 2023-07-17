import Grid from "@mui/material/Grid";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Box from '@mui/material/Box';
import SoftTypography from "@rob097/common-lib/components/SoftTypography";

function Footer() {
  return (
    <Box component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <Box display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
            <Box mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Company
              </SoftTypography>
            </Box>
            <Box mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                About Us
              </SoftTypography>
            </Box>
            <Box mr={{ xs: 0, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Team
              </SoftTypography>
            </Box>
            <Box mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Product
              </SoftTypography>
            </Box>
            <Box mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Blog
              </SoftTypography>
            </Box>
            <Box>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Pricing
              </SoftTypography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Box display="flex" justifyContent="center" mt={1} mb={3}>
            <Box mr={3} color="secondary">
              <FacebookIcon fontSize="small" />
            </Box>
            <Box mr={3} color="secondary">
              <TwitterIcon fontSize="small" />
            </Box>
            <Box mr={3} color="secondary">
              <InstagramIcon fontSize="small" />
            </Box>
            <Box mr={3} color="secondary">
              <PinterestIcon fontSize="small" />
            </Box>
            <Box color="secondary">
              <LinkedInIcon fontSize="small" />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <SoftTypography variant="body2" color="secondary">
            Copyright &copy; 2021 Soft by Creative Tim.
          </SoftTypography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
