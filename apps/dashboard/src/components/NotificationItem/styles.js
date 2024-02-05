function menuItem(theme) {
  const { palette, rounded, transitions } = theme;

  const { secondary, light } = palette;

  return {
    display: "flex",
    alignItems: "center",
    width: "100%",
    color: secondary.main,
    py: 1,
    px: 2,
    borderRadius: rounded.md,
    transition: transitions.create("background-color", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    "&:not(:last-child)": {
      mb: 1.25,
    },

    "&:hover": {
      backgroundColor: light.main,
    },
  };
}

function menuImage(theme, ownerState) {
  const { functions, palette, rounded } = theme;
  const { color } = ownerState;

  const { linearGradient } = functions;

  return {
    display: "grid",
    placeItems: "center",
    backgroundImage: palette[color]
      ? linearGradient(palette[color].main, palette[color].state)
      : linearGradient(palette.dark.main, palette.dark.state),
      borderRadius: '12px',

    "& img": {
      width: "100%",
      borderRadius: rounded.lg,
    },
  };
}

export { menuItem, menuImage };
