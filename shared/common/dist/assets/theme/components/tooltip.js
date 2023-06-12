"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Fade = _interopRequireDefault(require("@mui/material/Fade"));
var _colors = _interopRequireDefault(require("../base/colors"));
var _typography = _interopRequireDefault(require("../base/typography"));
var _borders = _interopRequireDefault(require("../base/borders"));
var _pxToRem = _interopRequireDefault(require("../functions/pxToRem"));
var black = _colors.default.black,
  light = _colors.default.light;
var size = _typography.default.size,
  fontWeightRegular = _typography.default.fontWeightRegular;
var borderRadius = _borders.default.borderRadius;
var tooltip = {
  defaultProps: {
    arrow: true,
    TransitionComponent: _Fade.default
  },
  styleOverrides: {
    tooltip: {
      maxWidth: (0, _pxToRem.default)(200),
      backgroundColor: black.main,
      color: light.main,
      fontSize: size.sm,
      fontWeight: fontWeightRegular,
      textAlign: "center",
      borderRadius: borderRadius.md,
      opacity: 0.7,
      padding: "".concat((0, _pxToRem.default)(5), " ").concat((0, _pxToRem.default)(8), " ").concat((0, _pxToRem.default)(4))
    },
    arrow: {
      color: black.main
    }
  }
};
var _default = tooltip;
exports.default = _default;