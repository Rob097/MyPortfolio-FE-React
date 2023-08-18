import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Box, Container, Grid } from "@mui/material";
import Button from '@mui/material/Button';
import ShowIf from "../showIf";
import tailwindConfig from '@/tailwind.config.js';

const HeroSection = (props) => {
    const { colors } = tailwindConfig.theme;
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    return (
        <Box id='hero-section' component='section' sx={{ backgroundImage: `linear-gradient(180deg, ${colors.white}, ${colors.background.main} 50%);` }}>
            <Container sx={{ padding: isSmallerThan('lg') && "0.5rem"}} disableGutters={isSmallerThan('md')} className={isGreaterThan('lg') ? whiteBarClasses.customContainer : ''}>
                <Grid container columnSpacing={10} justifyContent="center">
                    <Grid item md={6} alignSelf="center" width="100%">

                        <div style={{zIndex: 1, position: 'relative'}}>
                            {props.children}
                        </div>

                        <ShowIf condition={props.buttons != null}>
                            <Box id="call-to-action" mt={4} mb={8}>
                                <ShowIf condition={props.buttons[0] != null}>
                                    <Button variant="contained" color="dark" size="medium" sx={{ borderRadius: '50px' }}>{props.buttons[0].label}</Button>
                                </ShowIf>
                                <ShowIf condition={props.buttons[1] != null}>
                                    <Button href={props.buttons[1].link} variant="outlined" color="dark" size="medium" className="ml-2" sx={{ borderRadius: '50px' }}>{props.buttons[1].label}</Button>
                                </ShowIf>
                            </Box>
                        </ShowIf>
                    </Grid>
                    <Grid item md={6} alignSelf="center" className='flex justify-center items-center'>
                        <img src={props.img} style={{maxHeight: '30em', maxWidth: '100%', borderRadius: '1rem'}}/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default HeroSection;