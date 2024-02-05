import boxShadow from '@/utilities/functions/boxShadow';
import hexToRgb from '@/utilities/functions/hexToRgb';
import linearGradient from '@/utilities/functions/linearGradient';
import pxToRem from '@/utilities/functions/pxToRem';
import rgba from '@/utilities/functions/rgba';
import { createTheme } from '@mui/material/styles';
import defineTypography from './typography';

export default function createCustomTheme(tailwindConfig) {
    const { colors } = tailwindConfig.theme;

    // create an object with the values of the breakpoints transforming them to numbers
    const breakpoints = Object.keys(tailwindConfig.theme.screens).reduce((result, key) => {
        result[key] = parseInt(tailwindConfig.theme.screens[key].replace('px', ''));
        return result;
    }, {});

    const typography = defineTypography(tailwindConfig, createTheme({breakpoints: { values: breakpoints }}));

    return createTheme({

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
}