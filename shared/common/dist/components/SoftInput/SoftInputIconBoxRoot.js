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
    functions = theme.functions;
  var size = ownerState.size;
  var dark = palette.dark;
  var pxToRem = functions.pxToRem;
  return {
    lineHeight: 0,
    padding: size === "small" ? "".concat(pxToRem(4), " ").concat(pxToRem(10)) : "".concat(pxToRem(8), " ").concat(pxToRem(10)),
    width: pxToRem(39),
    height: "100%",
    color: dark.main
  };
});
exports.default = _default;