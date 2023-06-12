"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Typography = _interopRequireDefault(require("@mui/material/Typography"));
var _styles = require("@mui/material/styles");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = (0, _styles.styled)(_Typography.default)(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var palette = theme.palette,
    typography = theme.typography,
    functions = theme.functions;
  var color = ownerState.color,
    textTransform = ownerState.textTransform,
    verticalAlign = ownerState.verticalAlign,
    fontWeight = ownerState.fontWeight,
    opacity = ownerState.opacity,
    textGradient = ownerState.textGradient;
  var gradients = palette.gradients,
    transparent = palette.transparent;
  var fontWeightLight = typography.fontWeightLight,
    fontWeightRegular = typography.fontWeightRegular,
    fontWeightMedium = typography.fontWeightMedium,
    fontWeightBold = typography.fontWeightBold;
  var linearGradient = functions.linearGradient;

  // fontWeight styles
  var fontWeights = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold
  };

  // styles for the typography with textGradient={true}
  var gradientStyles = function gradientStyles() {
    return {
      backgroundImage: color !== "inherit" && color !== "text" && color !== "white" && gradients[color] ? linearGradient(gradients[color].main, gradients[color].state) : linearGradient(gradients.dark.main, gradients.dark.state),
      display: "inline-block",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: transparent.main,
      position: "relative",
      zIndex: 1
    };
  };
  return _objectSpread({
    opacity: opacity,
    textTransform: textTransform,
    verticalAlign: verticalAlign,
    textDecoration: "none",
    color: color === "inherit" || !palette[color] ? "inherit" : palette[color].main,
    fontWeight: fontWeights[fontWeight] && fontWeights[fontWeight]
  }, textGradient && gradientStyles());
});
exports.default = _default;