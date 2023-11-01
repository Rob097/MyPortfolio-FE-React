import ShowIf from '@/components/utils/showIf';
import whiteBarClasses from '@/components/whiteBar/whiteBar.module.scss';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import WhiteBar from '../whiteBar';
import sectionsClasses from "./sections.module.scss";

const MicroHighlightSection = (props) => {
    const { isGreaterThan, isSmallerThan } = useBreakpoints();

    const elements = props.children;
    if (!elements || (elements.length !== 3 && elements.length !== 4)) {
        throw new Error("MicroHighlightSection must have 3 or 4 children");
    }

    return (
        <Box id='support-section' component='section' position="relative" className={props.moveUp && isGreaterThan('xl') ? sectionsClasses.moveUp : ''}>
            <Container disableGutters={isSmallerThan('lg')} className={isGreaterThan('lg') ? whiteBarClasses.customContainer : ''}>
                <ShowIf condition={isGreaterThan('lg')}>
                    <WhiteBar>
                        <Grid container py={2}>
                            <Grid item lg={12 / elements.length} className='border-0 border-r border-solid'>
                                {elements[0]}
                            </Grid>
                            <Grid item lg={12 / elements.length} className='border-0 border-r border-solid'>
                                {elements[1]}
                            </Grid>
                            <Grid item lg={12 / elements.length}>
                                {elements[2]}
                            </Grid>
                            <ShowIf condition={elements.length === 4}>
                                <Grid item lg={12 / elements.length} className='border-0 border-l border-solid'>
                                    {elements[3]}
                                </Grid>
                            </ShowIf>
                        </Grid>
                    </WhiteBar>

                </ShowIf>

                <ShowIf condition={isSmallerThan('lg')}>
                    <Grid container justifyContent="center">
                        <Grid item lg={6} justifyContent="center" display="flex" >
                            <WhiteBar>
                                {elements[0]}
                            </WhiteBar>
                        </Grid>
                        <Grid item lg={6} justifyContent="center" display="flex">
                            <WhiteBar>
                                {elements[1]}
                            </WhiteBar>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                        <Grid item lg={elements.length === 4 ? 6 : 12} justifyContent="center" display="flex">
                            <WhiteBar>
                                {elements[2]}
                            </WhiteBar>
                        </Grid>
                        <ShowIf condition={elements.length === 4}>
                            <Grid item lg={6} justifyContent="center" display="flex">
                                <WhiteBar>
                                    {elements[3]}
                                </WhiteBar>
                            </Grid>
                        </ShowIf>
                    </Grid>
                </ShowIf>
            </Container>
        </Box>
    );
}

export default MicroHighlightSection;

export const SingleElement = (props) => {
    const { isGreaterThan } = useBreakpoints();

    // Check if props.avatar is a path or a number
    const isAvatarPath = isNaN(props.avatar);

    return (
        <Grid container justifyContent="center" flexWrap={isGreaterThan('md') ? 'nowrap' : 'wrap'} className='h-full' sx={{ width: { xs: '45vw', sm: '15em', lg: 'auto' } }}>
            <Grid item mx={'auto'} xs={12} lg={4} mr={{ lg: 4 }} ml={{ lg: 2 }} >
                <ShowIf condition={isAvatarPath}>
                    <Avatar src={props.avatar} sx={{ width: { lg: 100, xs: 60 }, height: "auto" }} variant="rounded" />
                </ShowIf>
                <ShowIf condition={!isAvatarPath}>
                    <Box sx={{ fontSize: '5rem', minHeight: '1em' }} className='flex justify-center lg:justify-end items-center w-full h-full'>
                        <Typography variant="span" color="primary" fontWeight="bold" m={0} textAlign="center">{props.avatar}</Typography>
                    </Box>
                </ShowIf>
            </Grid>
            <Grid item alignSelf="center" mr={{ md: 2 }} xs={12} lg={8}>
                <Typography variant="h4" fontWeight="bold" m={0} className='text-center lg:text-left'>{props.title}</Typography>
                <Typography paragraph m={0} className='text-center lg:text-left'>{props.caption}</Typography>
            </Grid>
        </Grid>
    )
};