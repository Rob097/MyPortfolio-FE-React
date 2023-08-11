import SoftTypography from '@rob097/common-lib/components/SoftTypography';
import styled from "@/components/navbar/navbar.module.scss";
import ShowIf from '@/components/showIf';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import styles from "@/pages/users/[userId]/home.module.css";
import { Avatar, Box, Container, Grid, useTheme } from '@mui/material';
import boxShadows from "@rob097/common-lib/assets/theme/base/boxShadows";

const MicroHighlightSection = (props) => {
    const { palette } = useTheme();
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    const elements = props.children;
    if (!elements || (elements.length !== 3 && elements.length !== 4)) {
        throw new Error("MicroHighlightSection must have 3 or 4 children");
    }

    return (
        <Box id='support-section' component='section' position="relative" className={props.moveUp && isGreaterThan('xl') ? styles.moveUp : ''} /*sx={{ top: { xl: props.moveUp ? '-6rem' : 'unset' } }}*/>
            <Container disableGutters={isSmallerThan('lg')} className={isGreaterThan('lg') ? styled.navbarContainer : ''}>
                <ShowIf condition={isGreaterThan('md')}>
                    <WhiteBox>
                        <Grid container py={2}>
                            <Grid item md={12 / elements.length} borderRight={`1px solid ${palette.sliderColors.thumb.borderColor}`}>
                                {elements[0]}
                            </Grid>
                            <Grid item md={12 / elements.length} borderRight={`1px solid ${palette.sliderColors.thumb.borderColor}`}>
                                {elements[1]}
                            </Grid>
                            <Grid item md={12 / elements.length}>
                                {elements[2]}
                            </Grid>
                            <ShowIf condition={elements.length === 4}>
                                <Grid item md={12 / elements.length} borderLeft={`1px solid ${palette.sliderColors.thumb.borderColor}`}>
                                    {elements[3]}
                                </Grid>
                            </ShowIf>
                        </Grid>
                    </WhiteBox>

                </ShowIf>

                <ShowIf condition={isSmallerThan('md')}>
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
    const { isGreaterThan } = useBreakpoints();

    // Check if props.avatar is a path or a number
    const isAvatarPath = isNaN(props.avatar);

    return (
        <Grid container justifyContent="center" flexWrap={isGreaterThan('md') ? 'nowrap' : 'wrap'}>
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