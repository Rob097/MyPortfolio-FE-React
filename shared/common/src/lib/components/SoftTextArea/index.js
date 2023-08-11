import { forwardRef, useState } from "react";
import SoftTextAreaRoot from "./SoftTextAreaRoot";
import Box from '@mui/material/Box';
import ShowIf from "../showIf";
import FormHelperText from '@mui/material/FormHelperText';
import { Grid } from "@mui/material";

const SoftTextArea = forwardRef(({ maxLength, error, ...rest }, ref) => {
    const [count, setCount] = useState(0);
    const handleCount = (event) => {
        setCount(event.target.value.length);
    };

    return (
        <>
            <SoftTextAreaRoot {...rest} ref={ref} ownerState={{ error }} onChange={handleCount} maxLength={maxLength && maxLength} />
            <Grid container>
                <Grid item xs={12} md={6}>
                    <ShowIf condition={rest.helpertext !== undefined}>
                        <Box mb={1} ml={0.5}>
                            <FormHelperText id={rest.helpertext} style={{ marginLeft: '0' }} error={error}>{rest.helpertext}</FormHelperText>
                        </Box>
                    </ShowIf>
                </Grid>
                <Grid item xs={12} md={6}>
                    <ShowIf condition={maxLength !== undefined}>
                        <Box width="100%">
                            <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%" height="100%">
                                {count} / {maxLength}
                            </Box>
                        </Box>
                    </ShowIf>
                </Grid>
            </Grid>
        </>
    );

});

export default SoftTextArea;