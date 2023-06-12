"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typography = _interopRequireDefault(require("../../base/typography"));
var _colors = _interopRequireDefault(require("../../base/colors"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var size = _typography.default.size,
  fontWeightRegular = _typography.default.fontWeightRegular;
var grey = _colors.default.grey,
  dark = _colors.default.dark,
  secondary = _colors.default.secondary;
var stepLabel = {
  styleOverrides: {
    label: {
      marginTop: "".concat((0, _pxToRem.default)(8), " !important"),
      fontWeight: fontWeightRegular,
      fontSize: size.md,
      color: grey[300],
      "&.Mui-active": {
        fontWeight: "".concat(fontWeightRegular, " !important"),
        color: "".concat(dark.main, " !important")
      },
      "&.Mui-completed": {
        fontWeight: "".concat(fontWeightRegular, " !important"),
        color: "".concat(secondary.main, " !important")
      }
    }
  }
};
var _default = stepLabel;
exports.default = _default;