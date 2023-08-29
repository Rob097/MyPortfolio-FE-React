import { useIsMount } from '@/hooks/useIsMount';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import drawerClasses from './swipeableEdgeDrawer.module.scss';

const drawerBleeding = 90;

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 5,
    left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props) {
    const router = useRouter();
    const isMount = useIsMount();
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        if (!newOpen && props.closeIndexModal) {
            props.closeIndexModal();
        }
    };

    // Detect if the current device is a touch device:
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window || navigator.msMaxTouchPoints);
    }, []);

    // if the route changes, close the drawer:
    useEffect(() => {
        setOpen(false);
    }, [router.asPath]);

    // if the index modal is open, open the drawer:
    useEffect(() => {
        if (!isMount && props.indexModalOpen) {
            setOpen(props.indexModalOpen);
        }
    }, [props.indexModalOpen]);

    return (
        <>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
                classes={{ paper: drawerClasses.paperHeight + ' overflow-visible' }}
            >

                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                    className='shadow-lgTop'
                >
                    <Box bgcolor='dark.main' sx={{ pointerEvents: !isTouchDevice && 'all' }} onClick={toggleDrawer(true)} className='rounded-sm'>
                        <Puller />
                        <Box sx={{ p: 2.5 }}>{'\u00A0'}</Box>
                    </Box>

                    <StyledBox sx={{
                        position: 'absolute',
                        top: props.children ? 15 : 25,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        zIndex: 1,
                        pointerEvents: 'all'
                    }}>
                        <Box sx={{ p: 2.5 }} >
                            {props.children ?? '\u00A0'}
                        </Box>
                    </StyledBox>
                </StyledBox>


                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    {props.drawerContent}
                </StyledBox>
            </SwipeableDrawer>
        </>
    );
}

export default SwipeableEdgeDrawer;