export default function defineTypography(tailwindConfig, { breakpoints }) {
    const { colors } = tailwindConfig.theme;

    const baseProperties = {
        fontFamily: tailwindConfig.theme.fontFamily.montserrat,
        fontWeightLight: tailwindConfig.theme.fontWeight.light,
        fontWeightRegular: tailwindConfig.theme.fontWeight.normal,
        fontWeightMedium: tailwindConfig.theme.fontWeight.medium,
        fontWeightBold: tailwindConfig.theme.fontWeight.bold,
    };

    const baseHeadingProperties = {
        fontFamily: baseProperties.fontFamily,
        color: colors.dark.main,
        fontWeight: baseProperties.fontWeightMedium,
    };

    const baseBodyProperties = {
        fontFamily: baseProperties.fontFamily,
        color: colors.text.main,
        fontWeight: baseProperties.fontWeightRegular,
    };

    const typography = {
        fontFamily: baseProperties.fontFamily,
        fontWeightLight: baseProperties.fontWeightLight,
        fontWeightRegular: baseProperties.fontWeightRegular,
        fontWeightMedium: baseProperties.fontWeightMedium,
        fontWeightBold: baseProperties.fontWeightBold,

        h1: {
            fontSize: tailwindConfig.theme.fontSize['7xl'][0],
            lineHeight: tailwindConfig.theme.fontSize['7xl'][1].lineHeight,
            [breakpoints.down("md")]: {
                fontSize: tailwindConfig.theme.fontSize['6xl'][0],
                lineHeight: tailwindConfig.theme.fontSize['6xl'][1].lineHeight,
            },
            ...baseHeadingProperties,
        },
        h2: {
            fontSize: tailwindConfig.theme.fontSize['4xl'][0],
            lineHeight: tailwindConfig.theme.fontSize['4xl'][1].lineHeight,
            ...baseHeadingProperties,
        },
        h3: {
            fontSize: tailwindConfig.theme.fontSize['3xl'][0],
            lineHeight: tailwindConfig.theme.fontSize['3xl'][1].lineHeight,
            ...baseHeadingProperties,
        },
        h4: {
            fontSize: tailwindConfig.theme.fontSize['2xl'][0],
            lineHeight: tailwindConfig.theme.fontSize['2xl'][1].lineHeight,
            ...baseHeadingProperties,
        },
        h5: {
            fontSize: tailwindConfig.theme.fontSize.xl[0],
            lineHeight: tailwindConfig.theme.fontSize.xl[1].lineHeight,
            ...baseHeadingProperties,
        },
        h6: {
            fontSize: tailwindConfig.theme.fontSize.base[0],
            lineHeight: tailwindConfig.theme.fontSize.base[1].lineHeight,
            ...baseHeadingProperties,
        },
        subtitle1: {
            fontFamily: tailwindConfig.theme.fontFamily,
            fontSize: tailwindConfig.theme.fontSize.xl[0],
            fontWeight: tailwindConfig.theme.fontWeight.normal,
            lineHeight: tailwindConfig.theme.fontSize.xl[1].lineHeight,
            ...baseBodyProperties,
        },
        subtitle2: {
            fontFamily: tailwindConfig.theme.fontFamily,
            fontSize: tailwindConfig.theme.fontSize.lg[0],
            fontWeight: tailwindConfig.theme.fontWeight.normal,
            lineHeight: tailwindConfig.theme.fontSize.lg[1].lineHeight,
            ...baseBodyProperties,
        },
        body1: {
            fontFamily: tailwindConfig.theme.fontFamily,
            fontSize: tailwindConfig.theme.fontSize.xl[0],
            fontWeight: tailwindConfig.theme.fontWeight.normal,
            lineHeight: tailwindConfig.theme.fontSize.xl[1].lineHeight,
            ...baseBodyProperties,
        },
        body2: {
            fontFamily: tailwindConfig.theme.fontFamily,
            fontSize: tailwindConfig.theme.fontSize.base[0],
            fontWeight: tailwindConfig.theme.fontWeight.normal,
            lineHeight: tailwindConfig.theme.fontSize.base[1].lineHeight,
            ...baseBodyProperties,
        },
        button: {
            fontFamily: tailwindConfig.theme.fontFamily,
            fontSize: tailwindConfig.theme.fontSize.base[0],
            fontWeight: tailwindConfig.theme.fontWeight.medium,
            lineHeight: tailwindConfig.theme.fontSize.base[1].lineHeight,
            ...baseBodyProperties,
        },
        caption: {
            fontFamily: tailwindConfig.theme.fontFamily,
            fontSize: tailwindConfig.theme.fontSize.xs[0],
            fontWeight: tailwindConfig.theme.fontWeight.normal,
            lineHeight: tailwindConfig.theme.fontSize.xs[1].lineHeight,
            ...baseBodyProperties,
        },
        overline: {
            fontFamily: tailwindConfig.theme.fontFamily,
            fontSize: tailwindConfig.theme.fontSize.xs[0],
            fontWeight: tailwindConfig.theme.fontWeight.normal,
            lineHeight: tailwindConfig.theme.fontSize.xs[1].lineHeight,
            ...baseBodyProperties,
        },

        size: {
            xs: tailwindConfig.theme.fontSize.xs[0],
            sm: tailwindConfig.theme.fontSize.sm[0],
            md: tailwindConfig.theme.fontSize.base[0],
            lg: tailwindConfig.theme.fontSize.lg[0],
            xl: tailwindConfig.theme.fontSize.xl[0],
            '2xl': tailwindConfig.theme.fontSize['2xl'][0],
            '3xl': tailwindConfig.theme.fontSize['3xl'][0],
            '4xl': tailwindConfig.theme.fontSize['4xl'][0],
            '5xl': tailwindConfig.theme.fontSize['5xl'][0],
            '6xl': tailwindConfig.theme.fontSize['6xl'][0],
            '7xl': tailwindConfig.theme.fontSize['7xl'][0],
        }
    };

    return typography;

}