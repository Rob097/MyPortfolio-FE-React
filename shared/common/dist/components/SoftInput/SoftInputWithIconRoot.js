"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _styles = require("@mui/material/styles");
var _default = (0, _styles.styled)("div")(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var palette = theme.palette,
    functions = theme.functions,
    borders = theme.borders;
  var error = ownerState.error,
    success = ownerState.success,
    disabled = ownerState.disabled;
  var inputColors = palette.inputColors,
    grey = palette.grey,
    white = palette.white;
  var pxToRem = functions.pxToRem;
  var borderRadius = borders.borderRadius,
    borderWidth = borders.borderWidth;

  // border color value
  var borderColorValue = inputColors.borderColor.main;
  if (error) {
    borderColorValue = inputColors.error;
  } else if (success) {
    borderColorValue = inputColors.success;
  }
  return {
    display: "flex",
    alignItems: "center",
    backgroundColor: disabled ? grey[200] : white.main,
    border: "".concat(borderWidth[1], " solid"),
    borderRadius: borderRadius.md,
    borderColor: borderColorValue,
    "& .MuiInputBase-input": {
      height: pxToRem(20)
    }
  };
});
exports.default = _default;