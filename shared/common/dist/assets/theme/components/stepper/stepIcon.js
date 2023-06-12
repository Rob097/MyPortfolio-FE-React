"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var _boxShadow = _interopRequireDefault(require("../../functions/boxShadow"));
var dark = _colors.default.dark,
  white = _colors.default.white;
var borderWidth = _borders.default.borderWidth,
  borderColor = _borders.default.borderColor;
var stepIcon = {
  styleOverrides: {
    root: {
      background: white.main,
      fill: white.main,
      stroke: white.main,
      strokeWidth: (0, _pxToRem.default)(10),
      width: (0, _pxToRem.default)(13),
      height: (0, _pxToRem.default)(13),
      border: "".concat(borderWidth[2], " solid ").concat(borderColor),
      borderRadius: "50%",
      zIndex: 99,
      transition: "all 200ms linear",
      "&.Mui-active": {
        background: dark.main,
        fill: dark.main,
        stroke: dark.main,
        borderColor: dark.main,
        boxShadow: (0, _boxShadow.default)([0, 0], [0, 2], dark.main, 1)
      },
      "&.Mui-completed": {
        background: dark.main,
        fill: dark.main,
        stroke: dark.main,
        borderColor: dark.main,
        boxShadow: (0, _boxShadow.default)([0, 0], [0, 2], dark.main, 1)
      }
    }
  }
};
var _default = stepIcon;
exports.default = _default;