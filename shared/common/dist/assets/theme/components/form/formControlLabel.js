"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _typography = _interopRequireDefault(require("../../base/typography"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var dark = _colors.default.dark;
var size = _typography.default.size,
  fontWeightBold = _typography.default.fontWeightBold;
var formControlLabel = {
  styleOverrides: {
    root: {
      display: "block",
      minHeight: (0, _pxToRem.default)(24),
      marginBottom: (0, _pxToRem.default)(2)
    },
    label: {
      display: "inline-block",
      fontSize: size.sm,
      fontWeight: fontWeightBold,
      color: dark.main,
      lineHeight: 1,
      transform: "translateY(".concat((0, _pxToRem.default)(1), ")"),
      marginLeft: (0, _pxToRem.default)(4),
      "&.Mui-disabled": {
        color: dark.main
      }
    }
  }
};
var _default = formControlLabel;
exports.default = _default;