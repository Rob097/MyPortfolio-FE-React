import { useTheme } from '@mui/system';
import Box from '@mui/material/Box';
import SoftTypography from "common-lib/components/SoftTypography";

const HomePage = () => {
    const theme = useTheme();
    return (
        <Box bgcolor='success.main' height="100%" mt={0.5} lineHeight={1}>
            <SoftTypography theme={theme} variant="h1" color="text" fontWeight="medium">
                Home Page
            </SoftTypography>
        </Box>
    )
}

export default HomePage;