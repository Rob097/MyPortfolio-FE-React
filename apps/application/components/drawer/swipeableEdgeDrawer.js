import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import * as React from 'react';
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
    top: 8,
    left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props) {
    const { window } = props;
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
        if (!newOpen && props.closeIndexModal) {
            props.closeIndexModal();
        }
    };

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <SwipeableDrawer
                container={container}
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
                    <Puller />
                    <Box sx={{ p: 2.5 }}>{'\u00A0'}</Box>

                    <StyledBox sx={{
                        position: 'absolute',
                        top: props.pullerContent ? 15 : 25,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        zIndex: 1,
                        pointerEvents: 'all'
                    }}>
                        <Box sx={{ p: 2.5, pointerEvents: 'all' }} onClick={toggleDrawer(true)} >
                            {props.pullerContent ?? '\u00A0'}
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
                    {
                        !props.indexModalState ?
                            props.drawerContent[0]
                            :
                            props.drawerContent[1]
                    }
                </StyledBox>
            </SwipeableDrawer>
        </>
    );
}

export default SwipeableEdgeDrawer;