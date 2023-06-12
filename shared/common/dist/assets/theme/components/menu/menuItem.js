"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _typography = _interopRequireDefault(require("../../base/typography"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var light = _colors.default.light,
  text = _colors.default.text,
  dark = _colors.default.dark;
var borderRadius = _borders.default.borderRadius;
var size = _typography.default.size;
var menuItem = {
  styleOverrides: {
    root: {
      minWidth: (0, _pxToRem.default)(160),
      minHeight: "unset",
      padding: "".concat((0, _pxToRem.default)(4.8), " ").concat((0, _pxToRem.default)(16)),
      borderRadius: borderRadius.md,
      fontSize: size.sm,
      color: text.main,
      transition: "background-color 300ms ease, color 300ms ease",
      "&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
        backgroundColor: light.main,
        color: dark.main
      }
    }
  }
};
var _default = menuItem;
exports.default = _default;