import styled from "@/components/navbar/navbar.module.scss";
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Box, Container, Grid, useTheme } from "@mui/material";
import SoftButton from '@rob097/common-lib/components/SoftButton';
import ShowIf from "../showIf";

const HeroSection = (props) => {
    const { palette } = useTheme();
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    return (
        <Box id='hero-section' component='section' sx={{ backgroundImage: `linear-gradient(180deg, ${palette.background.white}, ${palette.background.default} 50%);` }}>
            <Container sx={{ padding: isSmallerThan('lg') && "0.5rem"}} disableGutters={isSmallerThan('md')} className={isGreaterThan('lg') ? styled.navbarContainer : ''}>
                <Grid container columnSpacing={10} justifyContent="center">
                    <Grid item md={6} alignSelf="center" width="100%">

                        <div style={{zIndex: 1, position: 'relative'}}>
                            {props.children}
                        </div>

                        <ShowIf condition={props.buttons != null}>
                            <Box id="call-to-action" mt={4} mb={8}>
                                <ShowIf condition={props.buttons[0] != null}>
                                    <SoftButton variant="contained" color="dark" size="medium" sx={{ borderRadius: '50px' }}>{props.buttons[0].label}</SoftButton>
                                </ShowIf>
                                <ShowIf condition={props.buttons[1] != null}>
                                    <SoftButton href={props.buttons[1].link} variant="outlined" color="dark" size="medium" className="ml-2" sx={{ borderRadius: '50px' }}>{props.buttons[1].label}</SoftButton>
                                </ShowIf>
                            </Box>
                        </ShowIf>
                    </Grid>
                    <Grid item md={6} alignSelf="center" className='flex justify-center items-center'>
                        <img src={props.img} style={{height: '30em', borderRadius: '1rem'}}/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default HeroSection;