function navbar(theme, ownerState) {
  const { palette, boxShadows, functions, transitions, breakpoints, rounded } = theme;
  const { transparentNavbar, absolute, light } = ownerState;

  const { dark, white, text, transparent } = palette;
  const { navbarBoxShadow } = boxShadows;
  const { rgba, pxToRem } = functions;

  return {
    boxShadow: transparentNavbar || absolute ? "none" : navbarBoxShadow,
    backdropFilter: transparentNavbar || absolute ? "none" : `saturate(200%) blur(${pxToRem(30)})`,
    backgroundColor:
      transparentNavbar || absolute ? `${transparent} !important` : rgba(white, 0.8),

    color: () => {
      let color;

      if (light) {
        color = white;
      } else if (transparentNavbar) {
        color = text.main;
      } else {
        color = dark.main;
      }

      return color;
    },
    top: absolute ? pxToRem(24) : pxToRem(12),
    width: absolute ? '97%' : '100%',
    left: absolute ? '50%' : '0',
    transform: absolute ? 'translateX(-50%)' : 'none',
    minHeight: pxToRem(75),
    display: "grid",
    alignItems: "center",
    borderRadius: rounded.xl,
    paddingTop: pxToRem(8),
    paddingBottom: pxToRem(8),
    paddingRight: absolute ? pxToRem(8) : 0,
    paddingLeft: absolute ? pxToRem(16) : 0,

    "& > *": {
      transition: transitions.create("all", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "& .MuiToolbar-root": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      [breakpoints.up("sm")]: {
        minHeight: "auto",
        padding: `${pxToRem(4)} ${pxToRem(16)}`,
      },
    },
  };
}

const customContainer = ({ breakpoints }) => ({
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  pt: 0.5,
  pb: 0.5,

  [breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "0",
    paddingBottom: "0",
  },
});

const navbarRow = ({ breakpoints }, { isMini }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",

  [breakpoints.up("md")]: {
    justifyContent: isMini ? "space-between" : "stretch",
    width: isMini ? "100%" : "max-content",
  },

  [breakpoints.up("xl")]: {
    justifyContent: "stretch !important",
    width: "max-content !important",
  },
});

const navbarIconButton = ({ typography: { size }, breakpoints }) => ({
  px: 0.75,

  "& .material-icons, .material-icons-round": {
    fontSize: `${size.md} !important`,
  },

  "& .MuiTypography-root": {
    display: "none",

    [breakpoints.up("sm")]: {
      display: "inline-block",
      lineHeight: 1.2,
      ml: 0.5,
    },
  },
});

const navbarMobileMenu = ({ breakpoints }) => ({
  display: "inline-block",
  lineHeight: 0,

  [breakpoints.up("xl")]: {
    display: "none",
  },
});

export { navbar, customContainer, navbarRow, navbarIconButton, navbarMobileMenu };
