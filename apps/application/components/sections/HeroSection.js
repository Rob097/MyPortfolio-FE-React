import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import tailwindConfig from '@/tailwind.config.js';
import { Box, Button, Container, Grid, Tooltip } from "@mui/material";
import ShowIf from '@/components/utils/showIf';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = (props) => {
    const { colors } = tailwindConfig.theme;
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    return (
        <Box id='hero-section' component='section' sx={{ backgroundImage: `linear-gradient(180deg, ${colors.white}, ${colors.background.main} 50%);` }}>
            <Container sx={{ padding: isSmallerThan('lg') && "0.5rem" }} disableGutters={isSmallerThan('md')} className={isGreaterThan('lg') ? whiteBarClasses.customContainer : ''}>
                <Grid container columnSpacing={10} justifyContent="center">
                    <Grid item md={6} alignSelf="center" width="100%">

                        <div style={{ zIndex: 1, position: 'relative' }}>
                            {props.children}
                        </div>

                        <ShowIf condition={props.buttons != null}>
                            <Box id="call-to-action" mt={4} mb={2}>
                                <ShowIf condition={props.buttons[0] != null && props.buttons[0].link !== undefined}>
                                    <Tooltip title={props.buttons[0].tooltip} placement="top" arrow>
                                        <Box component='span' className={props.buttons[0].disabled ? 'cursor-not-allowed' : ''}>
                                            <Link href={props.buttons[0].link} download={props.buttons[0].isDownload} target={props.buttons[0].isDownload ? '_blank' : ''}>
                                                <Button variant="contained" color="dark" size="medium" className="mr-2" sx={{ borderRadius: '50px' }} disabled={props.buttons[0].disabled}>{props.buttons[0].label}</Button>
                                            </Link>
                                        </Box>
                                    </Tooltip>
                                </ShowIf>
                                <ShowIf condition={props.buttons[1] != null && props.buttons[1].link !== undefined}>
                                    <Tooltip title={props.buttons[1].tooltip} placement="top" arrow>
                                        <Box component='span' className={props.buttons[1].disabled ? 'cursor-not-allowed' : ''}>
                                            <Link href={props.buttons[1].link} download={props.buttons[1].isDownload} target={props.buttons[1].isDownload ? '_blank' : ''} >
                                                <Button variant="outlined" color="dark" size="medium" sx={{ borderRadius: '50px' }} disabled={props.buttons[1].disabled}>{props.buttons[1].label}</Button>
                                            </Link>
                                        </Box>
                                    </Tooltip>
                                </ShowIf>
                            </Box>
                        </ShowIf>

                        <Box className="flex justify-start" mb={2}>
                            <ShowIf condition={props.customizations?.socials?.linkedin}>
                                <Link href={`https://www.linkedin.com/in/${props.customizations?.socials?.linkedin}`} target="_blank" className="mr-2">
                                    <img src="/images/linkedin.svg" />
                                </Link>
                            </ShowIf>
                            <ShowIf condition={props.customizations?.socials?.twitter}>
                                <Link href={`https://twitter.com/${props.customizations?.socials?.twitter}`} target="_blank" className="mr-2">
                                    <img src="/images/twitterx.svg" />
                                </Link>
                            </ShowIf>
                            <ShowIf condition={props.customizations?.socials?.instagram}>
                                <Link href={`https://www.instagram.com/${props.customizations?.socials?.instagram}`} target="_blank">
                                    <img src="/images/instagram.svg" />
                                </Link>
                            </ShowIf>
                            <ShowIf condition={props.customizations?.socials?.facebook}>
                                <Link href={`https://www.facebook.com/${props.customizations?.socials?.facebook}`} target="_blank">
                                    <img src="/images/facebook.svg" />
                                </Link>
                            </ShowIf>
                        </Box>

                    </Grid>
                    <Grid item md={6} alignSelf="center" className='flex justify-center items-center'>
                        <Image 
                            src={props.img.src ?? '/images/default-profile-image.webp'} 
                            width={400} 
                            height={500}
                            style={{ maxHeight: '30em', maxWidth: '100%', borderRadius: '1rem', minHeight: '500px', width: 'auto' }} 
                            alt={props.img.alt} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default HeroSection;