import SoftButton from '@/components/SoftButton';
import styled from "@/components/navbar/navbar.module.css";
import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import ShowIf from "../showIf";

const HeroSection = (props) => {
    const theme = useTheme();

    const smallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
    const smallerThanLg = useMediaQuery(theme.breakpoints.down("lg"));
    const greaterThanLg = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <Box id='hero-section' component='section' sx={{ backgroundImage: 'linear-gradient(180deg, #ffffff, #fdf8f7 50%);' }}>
            <Container sx={{ padding: smallerThanLg && "0.5rem" }} disableGutters={smallerThanMd} className={greaterThanLg ? styled.navbarContainer : ''}>
                <Grid container columnSpacing={10} justifyContent="center">
                    <Grid item md={6} alignSelf="center" width="100%">

                        {props.children}

                        <ShowIf condition={props.buttons != null}>
                            <Box id="call-to-action" mt={4} mb={8}>
                                <ShowIf condition={props.buttons[0] != null}>
                                    <SoftButton variant="contained" color="dark" size="medium" sx={{ borderRadius: '50px' }}>{props.buttons[0].label}</SoftButton>
                                </ShowIf>
                                <ShowIf condition={props.buttons[1] != null}>
                                    <SoftButton variant="outlined" color="dark" size="medium"  className="ml-2" sx={{ borderRadius: '50px' }}>{props.buttons[1].label}</SoftButton>
                                </ShowIf>
                            </Box>
                        </ShowIf>
                    </Grid>
                    <Grid item md={6} alignSelf="center">
                        <img width="100%" height="auto" src={props.img} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default HeroSection;