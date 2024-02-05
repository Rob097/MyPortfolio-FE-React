import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Grid, Typography } from "@mui/material";
import Box from '@mui/material/Box';

function Footer() {
  return (
    <Box component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <Box display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
            <Box mr={{ xs: 2, lg: 3, xl: 6 }}>
              <Typography component="a" href="#" variant="body2" color="secondary">
                Company
              </Typography>
            </Box>
            <Box mr={{ xs: 2, lg: 3, xl: 6 }}>
              <Typography component="a" href="#" variant="body2" color="secondary">
                About Us
              </Typography>
            </Box>
            <Box mr={{ xs: 0, lg: 3, xl: 6 }}>
              <Typography component="a" href="#" variant="body2" color="secondary">
                Team
              </Typography>
            </Box>
            <Box mr={{ xs: 2, lg: 3, xl: 6 }}>
              <Typography component="a" href="#" variant="body2" color="secondary">
                Product
              </Typography>
            </Box>
            <Box mr={{ xs: 2, lg: 3, xl: 6 }}>
              <Typography component="a" href="#" variant="body2" color="secondary">
                Blog
              </Typography>
            </Box>
            <Box>
              <Typography component="a" href="#" variant="body2" color="secondary">
                Pricing
              </Typography>
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
          <Typography variant="body2" color="secondary">
            Copyright &copy; 2021 Soft by Creative Tim.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
