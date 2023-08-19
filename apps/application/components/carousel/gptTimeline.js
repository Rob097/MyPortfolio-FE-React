
import { Box, Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import classes from "./timeline.module.scss";


const mockItems = [
    {
        title: 'Event 1',
        description: 'Description for Event 1',
        date: '2023-08-19',
    },
    {
        title: 'Event 2',
        description: 'Description for Event 2',
        date: '2023-08-20',
    },
    {
        title: 'Event 3',
        description: 'Description for Event 3',
        date: '2023-08-21',
    },
    {
        title: 'Event 4',
        description: 'Description for Event 4',
        date: '2023-08-22',
    },
    // Add more mock items as needed
];

const TimelineCustom = () => {
    return (
        <>
            <Grid container className="relative w-full h-full flex justify-center items-center" style={{ minHeight: '30vh' }}>
                <Grid item xs={12} lg={1.2} className={' relative flex justify-center items-center z-10'}>
                    <Box className='flex justify-content items-center' sx={{ transform: { xs: 'rotate(90deg)', lg: 'rotate(0)' } }}>
                        <img src="/images/arrow.png" alt='avatar' />
                    </Box>
                </Grid>
                <Grid item xs={12} lg={1.2} className={' relative flex justify-center items-center z-10'}>
                    <Avatar id="testa" variant='rounding' className='border-4 border-primary-main bg-white text-dark-main shadow-xl' sx={{ width: 100, height: 100 }}>
                        <Typography variant="h4">2023</Typography>
                    </Avatar>
                </Grid>
                <Grid item xs={12} lg={3} className={' relative flex justify-center items-center z-10 h-full'}>
                    <Box className='h-full w-1 lg:h-1 lg:w-full bg-primary-main z-0 rounded-2xl'
                        sx={{ minHeight: { xs: '10em', lg: '0' } }}
                    >
                    </Box>
                </Grid>
                <Grid item xs={12} lg={1.2} className={' relative flex justify-center items-center z-10'}>
                    <Avatar id="testa" variant='rounding' className='border-4 border-primary-main bg-white text-dark-main shadow-xl' sx={{ width: 100, height: 100 }}>
                        <Typography variant="h4">2023</Typography>
                    </Avatar>
                </Grid>
                <Grid item xs={12} lg={3} className={'relative flex justify-center items-center z-10 h-full'}>
                    <Box className='h-full w-1 lg:h-1 lg:w-full bg-primary-main z-0 rounded-2xl'
                        sx={{ minHeight: { xs: '10em', lg: '0' } }}
                    />
                </Grid>
                <Grid item xs={12} lg={1.2} className={' relative flex justify-center items-center z-10'}>
                    <Avatar id="testa" variant='rounding' className='border-4 border-primary-main bg-white text-dark-main shadow-xl' sx={{ width: 100, height: 100 }}>
                        <Typography variant="h4">2023</Typography>
                    </Avatar>
                </Grid>
                <Grid item xs={12} lg={1.2} className={' relative flex justify-start items-center h-full z-10'}>
                    {/* <Grid container className="h-full">
                        <Grid item xs={12} lg={6} className={' relative flex justify-center items-center z-10'}>
                            <Box className='h-full w-1 lg:h-1 lg:w-full bg-primary-main z-0 rounded-2xl'
                                sx={{ minHeight: { xs: '10em', lg: '0' } }}
                            />
                        </Grid>
                        <Grid item xs={12} lg={6} className={' relative flex justify-start items-start z-10'}>
                            <Box className='h-full w-1 bg-primary-main z-0 rounded-2xl'
                                sx={{ minHeight: { xs: '0', lg: '7em' }, transform: 'translateY(50%)' }}
                            />
                        </Grid>
                    </Grid> */}

                    <Box className='w-1/2 h-1/2'
                        style={{ borderTop: '1px solid black', borderRight: '1px solid black' }}
                    >

                    </Box>

                </Grid>
            </Grid>
        </>
    );
};

export default TimelineCustom;