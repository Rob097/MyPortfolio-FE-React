import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import SoftTypography from "common-new/components/SoftTypography";

const CustomStepper = (props) => {
    return (
        <Grid container spacing={2} display="flex" width="100%" justifyContent="center">
            <Grid xs={12} lg={8}>
                <Box p={2} mx={3} display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
                    {props.title && <SoftTypography variant="h3" fontWeight="bold">{props.title}</SoftTypography>}
                    {props.subTitle && <SoftTypography variant="h5">{props.subTitle}</SoftTypography>}
                    <Box className="w-full">
                        <Box sx={{ width: '100%' }}>
                            {props.children}
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default CustomStepper;