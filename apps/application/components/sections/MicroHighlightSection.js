import SoftTypography from '@/components/SoftTypography';
import styled from "@/components/navbar/navbar.module.css";
import ShowIf from '@/components/showIf';
import styles from "@/pages/users/[userId]/home.module.css";
import { Avatar, Box, Container, Grid, SvgIcon, useMediaQuery, useTheme } from '@mui/material';
import boxShadows from "@rob097/common-lib/assets/theme/base/boxShadows";

const MicroHighlightSection = (props) => {

    const theme = useTheme();

    const greaterThanMd = useMediaQuery(theme.breakpoints.up("md"));
    const smallerThanMd = useMediaQuery(theme.breakpoints.down("md"));
    const greaterThanLg = useMediaQuery(theme.breakpoints.up("lg"));
    const smallerThanLg = useMediaQuery(theme.breakpoints.down("lg"));
    const greaterThanXl = useMediaQuery(theme.breakpoints.up("xl"));

    const elements = props.children;
    if (!elements || (elements.length !== 3 && elements.length !== 4)) {
        throw new Error("MicroHighlightSection must have 3 or 4 children");
    }

    return (
        <Box id='support-section' component='section' position="relative" className={props.moveUp && greaterThanXl ? styles.moveUp : ''} /*sx={{ top: { xl: props.moveUp ? '-6rem' : 'unset' } }}*/>

            <Container disableGutters={smallerThanLg} className={greaterThanLg ? styled.navbarContainer : ''}>
                <ShowIf condition={greaterThanMd}>
                    <WhiteBox>
                        <Grid container py={2}>
                            <Grid item md={12 / elements.length} borderRight={'1px solid #d7d7d7'}>
                                {elements[0]}
                            </Grid>
                            <Grid item md={12 / elements.length} borderRight={'1px solid #d7d7d7'}>
                                {elements[1]}
                            </Grid>
                            <Grid item md={12 / elements.length}>
                                {elements[2]}
                            </Grid>
                            <ShowIf condition={elements.length === 4}>
                                <Grid item md={12 / elements.length} borderLeft={'1px solid #d7d7d7'}>
                                    {elements[3]}
                                </Grid>
                            </ShowIf>
                        </Grid>
                    </WhiteBox>

                </ShowIf>

                <ShowIf condition={smallerThanMd}>
                    <Grid container justifyContent="center">
                        <Grid item md={6} justifyContent="center" display="flex" >
                            <WhiteBox>
                                {elements[0]}
                            </WhiteBox>
                        </Grid>
                        <Grid item md={6} justifyContent="center" display="flex">
                            <WhiteBox>
                                {elements[1]}
                            </WhiteBox>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item md={elements.length === 4 ? 6 : 12} justifyContent="center" display="flex">
                            <WhiteBox>
                                {elements[2]}
                            </WhiteBox>
                        </Grid>
                        <ShowIf condition={elements.length === 4}>
                            <Grid item md={6} justifyContent="center" display="flex">
                                <WhiteBox>
                                    {elements[3]}
                                </WhiteBox>
                            </Grid>
                        </ShowIf>
                    </Grid>
                </ShowIf>
            </Container>
        </Box>
    );
}

export default MicroHighlightSection;

export const WhiteBox = ({ children }) => (
    <Box
        py={1.3}
        px={{ xs: 3, sm: 3, lg: 3 }}
        my={2}
        mx={2}
        color={"white"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        left={0}
        zIndex={3}
        sx={({ palette: { white }, functions: { rgba } }) => ({
            backgroundColor: rgba(white.main, 0.8),
            backdropFilter: `saturate(200%) blur(30px)`,
            borderRadius: '10rem',
            boxShadow: boxShadows.tabsBoxShadow.large,
            width: { md: "calc(100% - 48px)", xs: "fit-content" }
        })}
    >{children}</Box>
);

export const SingleElement = (props) => {
    const theme = useTheme();
    const greaterThanMd = useMediaQuery(theme.breakpoints.up("md"));

    // Check if props.avatar is a path or a number
    const isAvatarPath = isNaN(props.avatar);

    return (
        <Grid container justifyContent="center" flexWrap={greaterThanMd ? 'nowrap' : 'wrap'}>
            <Grid item mr={2}>
                <ShowIf condition={isAvatarPath}>
                    <Avatar src={props.avatar} sx={{ width: { lg: 100, xs: 60 }, height: "auto" }} variant="rounded" />
                </ShowIf>
                <ShowIf condition={!isAvatarPath}>
                    <Box sx={{ width: { lg: 100, xs: 60 }, height: { lg: 100, xs: 60 }, fontSize: '5rem' }} className='flex justify-center items-center'>
                        <SoftTypography variant="span" color="primary" fontWeight="bold" m={0} textAlign="center">{props.avatar}</SoftTypography>
                    </Box>
                </ShowIf>
            </Grid>
            <Grid item alignSelf="center">
                <SoftTypography variant="h4" fontWeight="bold" m={0} textAlign="center">{props.title}</SoftTypography>
                <SoftTypography paragraph m={0} textAlign="center">{props.caption}</SoftTypography>
            </Grid>
        </Grid>
    )
};