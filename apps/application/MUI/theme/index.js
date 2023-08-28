import tailwindConfig from '@/tailwind.config.js';
import { createTheme } from '@mui/material/styles';
import boxShadow from '@rob097/common-lib/assets/theme/functions/boxShadow';
import hexToRgb from '@rob097/common-lib/assets/theme/functions/hexToRgb';
import linearGradient from '@rob097/common-lib/assets/theme/functions/linearGradient';
import pxToRem from '@rob097/common-lib/assets/theme/functions/pxToRem';
import rgba from '@rob097/common-lib/assets/theme/functions/rgba';
import typography from './typography';

const { colors } = tailwindConfig.theme;

// create an object with the values of the breakpoints transforming them to numbers
const breakpoints = Object.keys(tailwindConfig.theme.screens).reduce((result, key) => {
    result[key] = parseInt(tailwindConfig.theme.screens[key].replace('px', ''));
    return result;
}, {});


export default createTheme({

    breakpoints: { values: breakpoints },
    palette: colors,
    typography: typography,
    boxShadows: tailwindConfig.theme.boxShadow,
    functions: {
        boxShadow,
        hexToRgb,
        linearGradient,
        pxToRem,
        rgba,
    },
    rounded: tailwindConfig.theme.borderRadius,
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    color: colors.white,
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    backgroundColor: colors.white,
                },
            },
        }
    },
});