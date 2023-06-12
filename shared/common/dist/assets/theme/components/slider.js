"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../base/colors"));
var _borders = _interopRequireDefault(require("../base/borders"));
var _boxShadows = _interopRequireDefault(require("../base/boxShadows"));
var _linearGradient = _interopRequireDefault(require("../functions/linearGradient"));
var _pxToRem = _interopRequireDefault(require("../functions/pxToRem"));
var light = _colors.default.light,
  white = _colors.default.white,
  sliderColors = _colors.default.sliderColors,
  black = _colors.default.black,
  gradients = _colors.default.gradients;
var borderRadius = _borders.default.borderRadius,
  borderWidth = _borders.default.borderWidth;
var sliderBoxShadow = _boxShadows.default.sliderBoxShadow;
var slider = {
  styleOverrides: {
    root: {
      width: "100%",
      "& .MuiSlider-active, & .Mui-focusVisible": {
        boxShadow: "none !important"
      },
      "& .MuiSlider-valueLabel": {
        color: black.main
      }
    },
    rail: {
      height: (0, _pxToRem.default)(3),
      backgroundColor: light.main,
      borderRadius: borderRadius.sm
    },
    track: {
      backgroundImage: (0, _linearGradient.default)(gradients.info.main, gradients.info.state),
      height: (0, _pxToRem.default)(6),
      position: "relative",
      top: (0, _pxToRem.default)(2),
      border: "none",
      borderRadius: borderRadius.lg,
      zIndex: 1
    },
    thumb: {
      width: (0, _pxToRem.default)(15),
      height: (0, _pxToRem.default)(15),
      backgroundColor: white.main,
      zIndex: 10,
      boxShadow: sliderBoxShadow.thumb,
      border: "".concat(borderWidth[1], " solid ").concat(sliderColors.thumb.borderColor),
      "&:hover": {
        boxShadow: "none"
      }
    }
  }
};
var _default = slider;
exports.default = _default;