"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _boxShadows = _interopRequireDefault(require("../../base/boxShadows"));
var _rgba = _interopRequireDefault(require("../../functions/rgba"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var _linearGradient = _interopRequireDefault(require("../../functions/linearGradient"));
var white = _colors.default.white,
  light = _colors.default.light,
  gradients = _colors.default.gradients;
var borderWidth = _borders.default.borderWidth;
var md = _boxShadows.default.md;
var switchButton = {
  defaultProps: {
    disableRipple: true
  },
  styleOverrides: {
    root: {
      width: (0, _pxToRem.default)(40),
      height: (0, _pxToRem.default)(20),
      margin: "".concat((0, _pxToRem.default)(4), " 0"),
      padding: 0,
      borderRadius: (0, _pxToRem.default)(160),
      transition: "transform 250ms ease-in"
    },
    switchBase: {
      padding: 0,
      top: "50%",
      transform: "translate(".concat((0, _pxToRem.default)(2), ", -50%)"),
      transition: "transform 250ms ease-in-out",
      "&.Mui-checked": {
        transform: "translate(".concat((0, _pxToRem.default)(22), ", -50%)"),
        "& + .MuiSwitch-track": {
          backgroundColor: "".concat((0, _rgba.default)(gradients.dark.state, 0.95), " !important"),
          borderColor: "".concat((0, _rgba.default)(gradients.dark.state, 0.95), " !important"),
          opacity: 1
        }
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: "0.3 !important"
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        backgroundImage: (0, _linearGradient.default)(gradients.info.main, gradients.info.state)
      }
    },
    thumb: {
      width: (0, _pxToRem.default)(16),
      height: (0, _pxToRem.default)(16),
      backgroundColor: white.main,
      boxShadow: md,
      top: "50%"
    },
    track: {
      backgroundColor: (0, _rgba.default)(gradients.dark.state, 0.1),
      border: "".concat(borderWidth[1], " solid ").concat(light.main),
      borderRadius: (0, _pxToRem.default)(160),
      opacity: 1,
      transition: "background-color 250ms ease, border-color 200ms ease"
    },
    checked: {}
  }
};
var _default = switchButton;
exports.default = _default;