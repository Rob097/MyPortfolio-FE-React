
import colors from "../../base/colors";import pxToRem from "../../functions/pxToRem";
import borders from "../../base/borders";

const { transparent, inputColors } = colors;
const { borderWidth, borderRadius } = borders;

const select = {
  styleOverrides: {
    root: {
      padding: "none",

      "& fieldset": {
        border: "none",
      },
    },
    select: {
      display: "grid",
      alignItems: "center",
      padding: `0 ${pxToRem(12)} !important`,

      "& .Mui-selected": {
        backgroundColor: transparent.main,
      },
    },

    selectMenu: {
      background: "none",
      height: "none",
      minHeight: "none",
      overflow: "unset",
    }
  },
};

export default select;
