"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _boxShadows = _interopRequireDefault(require("../../base/boxShadows"));
var _typography = _interopRequireDefault(require("../../base/typography"));
var _colors = _interopRequireDefault(require("../../base/colors"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var lg = _boxShadows.default.lg;
var size = _typography.default.size;
var text = _colors.default.text,
  white = _colors.default.white,
  transparent = _colors.default.transparent,
  light = _colors.default.light,
  dark = _colors.default.dark,
  gradients = _colors.default.gradients;
var borderRadius = _borders.default.borderRadius;
var autocomplete = {
  styleOverrides: {
    popper: {
      boxShadow: lg,
      padding: (0, _pxToRem.default)(8),
      fontSize: size.sm,
      color: text.main,
      textAlign: "left",
      backgroundColor: "".concat(white.main, " !important"),
      borderRadius: borderRadius.md
    },
    paper: {
      boxShadow: "none",
      backgroundColor: transparent.main
    },
    option: {
      padding: "".concat((0, _pxToRem.default)(4.8), " ").concat((0, _pxToRem.default)(16)),
      borderRadius: borderRadius.md,
      fontSize: size.sm,
      color: text.main,
      transition: "background-color 300ms ease, color 300ms ease",
      "&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
        backgroundColor: light.main,
        color: dark.main
      },
      '&[aria-selected="true"]': {
        backgroundColor: "".concat(light.main, " !important"),
        color: "".concat(dark.main, " !important")
      }
    },
    noOptions: {
      fontSize: size.sm,
      color: text.main
    },
    groupLabel: {
      color: dark.main
    },
    loading: {
      fontSize: size.sm,
      color: text.main
    },
    tag: {
      display: "flex",
      alignItems: "center",
      height: "auto",
      padding: (0, _pxToRem.default)(4),
      backgroundColor: gradients.dark.state,
      color: white.main,
      "& .MuiChip-label": {
        lineHeight: 1.2,
        padding: "0 ".concat((0, _pxToRem.default)(10), " 0 ").concat((0, _pxToRem.default)(4))
      },
      "& .MuiSvgIcon-root, & .MuiSvgIcon-root:hover, & .MuiSvgIcon-root:focus": {
        color: white.main,
        marginRight: 0
      }
    }
  }
};
var _default = autocomplete;
exports.default = _default;