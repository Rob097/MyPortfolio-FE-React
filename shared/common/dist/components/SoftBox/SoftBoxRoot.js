"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _styles = require("@mui/material/styles");
var _default = (0, _styles.styled)(_Box.default)(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var palette = theme.palette,
    functions = theme.functions,
    borders = theme.borders,
    boxShadows = theme.boxShadows;
  var variant = ownerState.variant,
    bgColor = ownerState.bgColor,
    color = ownerState.color,
    opacity = ownerState.opacity,
    borderRadius = ownerState.borderRadius,
    shadow = ownerState.shadow;
  var gradients = palette.gradients,
    grey = palette.grey,
    white = palette.white;
  var linearGradient = functions.linearGradient;
  var radius = borders.borderRadius;
  var greyColors = {
    "grey-100": grey[100],
    "grey-200": grey[200],
    "grey-300": grey[300],
    "grey-400": grey[400],
    "grey-500": grey[500],
    "grey-600": grey[600],
    "grey-700": grey[700],
    "grey-800": grey[800],
    "grey-900": grey[900]
  };
  var validGradients = ["primary", "secondary", "info", "success", "warning", "error", "dark", "light"];
  var validColors = ["transparent", "white", "black", "primary", "secondary", "info", "success", "warning", "error", "light", "dark", "text", "grey-100", "grey-200", "grey-300", "grey-400", "grey-500", "grey-600", "grey-700", "grey-800", "grey-900"];
  var validBorderRadius = ["xs", "sm", "md", "lg", "xl", "xxl", "section"];
  var validBoxShadows = ["xs", "sm", "md", "lg", "xl", "xxl", "inset"];

  // background value
  var backgroundValue = bgColor;
  if (variant === "gradient") {
    backgroundValue = validGradients.find(function (el) {
      return el === bgColor;
    }) ? linearGradient(gradients[bgColor].main, gradients[bgColor].state) : white.main;
  } else if (validColors.find(function (el) {
    return el === bgColor;
  })) {
    backgroundValue = palette[bgColor] ? palette[bgColor].main : greyColors[bgColor];
  } else {
    backgroundValue = bgColor;
  }

  // color value
  var colorValue = color;
  if (validColors.find(function (el) {
    return el === color;
  })) {
    colorValue = palette[color] ? palette[color].main : greyColors[color];
  }

  // borderRadius value
  var borderRadiusValue = borderRadius;
  if (validBorderRadius.find(function (el) {
    return el === borderRadius;
  })) {
    borderRadiusValue = radius[borderRadius];
  }

  // boxShadow value
  var boxShadowValue = boxShadows;
  if (validBoxShadows.find(function (el) {
    return el === shadow;
  })) {
    boxShadowValue = boxShadows[shadow];
  }
  return {
    opacity: opacity,
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue
  };
});
exports.default = _default;