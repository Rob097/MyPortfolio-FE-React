import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import SoftBox from "common-lib/components/SoftBox";
import SoftTypography from "common-lib/components/SoftTypography";

const CustomStepper = (props) => {
    return (
        <Grid container spacing={2} display="flex" width="100%" justifyContent="center">
            <Grid xs={12} lg={8}>
                <SoftBox p={2} mx={3} display="flex" flexDirection="column" alignItems="center" justifyContent="center" >
                    {props.title && <SoftTypography variant="h3" fontWeight="bold">{props.title}</SoftTypography>}
                    {props.subTitle && <SoftTypography variant="h5">{props.subTitle}</SoftTypography>}
                    <SoftBox className="w-full">
                        <Box sx={{ width: '100%' }}>
                            {props.children}
                        </Box>
                    </SoftBox>
                </SoftBox>
            </Grid>
        </Grid>
    );
}

export default CustomStepper;