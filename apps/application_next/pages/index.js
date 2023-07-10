import SoftTypography from "common-lib/components/SoftTypography";
import { useTheme } from '@mui/system'

function HomePage() {
    const theme = useTheme();
    return (
        <>
            <h1>The Home Page</h1>
            <SoftTypography theme={theme} variant="h1" color="text" fontWeight="medium">
                CEO / Co-Founder
            </SoftTypography>
        </>
    )
}

export default HomePage;