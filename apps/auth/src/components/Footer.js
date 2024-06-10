/* import FacebookIcon from "@mui/icons-material/Facebook";
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

export default Footer; */

import * as React from "react";

function Navbar() {
  const navLinks = [
    { href: "https://www.my-portfolio.it#pricing", text: "Pricing" },
    { href: "https://www.my-portfolio.it#about-the-project", text: "About us" },
    { href: "https://www.my-portfolio.it#features", text: "Features" },
    { href: "/auth/sign-up", text: "Register" },
    { href: "https://www.my-portfolio.it/contact-us", text: "Contact us" },
    { href: "https://www.my-portfolio.it/support", text: "Support us" },
  ];

  return (
    <nav className="flex flex-row max-md:flex max-md:flex-col max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:mx-auto">
      <a
        href="#home"
        className="mx-auto text-2xl font-bold leading-9 cursor-pointer pointer-events-auto text-slate-700 max-md:my-auto"
      >
        <span className="text-orange-500">My</span>
        <span className="text-slate-700">Portfolio</span>
      </a>
      <span className="flex gap-5 justify-between self-center pl-4 mx-4 my-auto border-l-2 border-solid border-l-[black] max-md:flex-wrap max-md:self-center max-md:max-w-full max-md:border-l-0 max-md:border-solid max-md:border-l-[black]">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="self-start text-lg leading-7 cursor-pointer pointer-events-auto text-zinc-900"
          >
            {link.text}
          </a>
        ))}
      </span>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="box-border flex relative flex-col shrink-0 mx-auto mt-5 w-full max-w-[1920px]">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
          <div className="flex-1 m-auto text-sm leading-5 text-right text-gray-700">
            © 2024 MyPortfolio
          </div>
        </div>
      </div>
    </footer>
  );
}

function MyComponent() {
  return (
    <div className="flex flex-col items-center px-16 pt-12 pb-5 max-md:px-5">
      <header className="flex flex-col items-start w-full max-w-[1176px] max-md:max-w-full">
        <div className="flex gap-5 justify-between self-stretch w-full max-md:flex-wrap max-md:max-w-full"></div>
        <div className="flex gap-5 justify-between mt-5 max-w-full w-[641px] max-md:flex-wrap"></div>
      </header>
      <Navbar />
      <Footer />
    </div>
  );
}

export default MyComponent;