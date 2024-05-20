
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { styled } from "@mui/material/styles";
import { forwardRef, useState } from "react";
import ShowIf from "../ShowIf";

const TextArea = forwardRef(({ maxLength, error, ...rest }, ref) => {
    const [count, setCount] = useState(0);
    const handleCount = (event) => {
        setCount(event.target.value.length);
    };

    return (
        <>
            <StyledTextArea {...rest} ref={ref} ownerState={{ error }} onChange={handleCount} maxLength={maxLength && maxLength} />
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

const StyledTextArea = styled(TextareaAutosize)(({ theme, ownerState }) => {
    const { error } = ownerState;

    const grey = {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
    };

    return {
        width: '100%',
        maxWidth: '100%',
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.5',
        padding: '12px',
        borderRadius: '6px 6px 0 6px',
        color: theme.palette.mode === 'dark' ? theme.palette.gray[300] : theme.palette.gray[900],
        background: theme.palette.mode === 'dark' ? theme.palette.gray[900] : '#fff',
        border: `1px solid ${error ? 'red' : theme.palette.mode === 'dark' ? theme.palette.gray[700] : theme.palette.gray[200]}`,
        boxShadow: `0px 2px 2px ${theme.palette.mode === 'dark' ? theme.palette.gray[900] : theme.palette.gray[50]}`,
        '&:hover': {
            borderColor: !error && theme.palette.primary[400],
        },
        '&:focus': {
            borderColor: !error && theme.palette.primary[400],
            boxShadow: `0 0 0 3px ${theme.palette.mode === 'dark' ? theme.palette.primary[500] : theme.palette.primary[200]}`,
        },
        // firefox
        '&:focus-visible': {
            outline: 0,
        },
    };
});

export default TextArea;