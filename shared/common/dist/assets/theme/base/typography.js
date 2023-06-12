"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _colors = _interopRequireDefault(require("../../theme/base/colors"));
var _pxToRem = _interopRequireDefault(require("../../theme/functions/pxToRem"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * The base typography styles for the Soft UI Dashboard React.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * You can add new typography style using this file.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * You can customized the typography styles for the entire Soft UI Dashboard React using thie file.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var dark = _colors.default.dark;
var baseProperties = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  fontSizeXXS: (0, _pxToRem.default)(10.4),
  fontSizeXS: (0, _pxToRem.default)(12),
  fontSizeSM: (0, _pxToRem.default)(14),
  fontSizeMD: (0, _pxToRem.default)(16),
  fontSizeLG: (0, _pxToRem.default)(18),
  fontSizeXL: (0, _pxToRem.default)(20)
};
var baseHeadingProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightMedium
};
var baseDisplayProperties = {
  fontFamily: baseProperties.fontFamily,
  color: dark.main,
  fontWeight: baseProperties.fontWeightLight,
  lineHeight: 1.2
};
var typography = {
  fontFamily: baseProperties.fontFamily,
  fontWeightLight: baseProperties.fontWeightLight,
  fontWeightRegular: baseProperties.fontWeightRegular,
  fontWeightMedium: baseProperties.fontWeightMedium,
  fontWeightBold: baseProperties.fontWeightBold,
  h1: _objectSpread({
    fontSize: (0, _pxToRem.default)(48),
    lineHeight: 1.25
  }, baseHeadingProperties),
  h2: _objectSpread({
    fontSize: (0, _pxToRem.default)(36),
    lineHeight: 1.3
  }, baseHeadingProperties),
  h3: _objectSpread({
    fontSize: (0, _pxToRem.default)(30),
    lineHeight: 1.375
  }, baseHeadingProperties),
  h4: _objectSpread({
    fontSize: (0, _pxToRem.default)(24),
    lineHeight: 1.375
  }, baseHeadingProperties),
  h5: _objectSpread({
    fontSize: (0, _pxToRem.default)(20),
    lineHeight: 1.375
  }, baseHeadingProperties),
  h6: _objectSpread({
    fontSize: (0, _pxToRem.default)(16),
    lineHeight: 1.625
  }, baseHeadingProperties),
  subtitle1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.625
  },
  subtitle2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,
    fontWeight: baseProperties.fontWeightMedium,
    lineHeight: 1.6
  },
  body1: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXL,
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.625
  },
  body2: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeMD,
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.6
  },
  button: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeSM,
    fontWeight: baseProperties.fontWeightBold,
    lineHeight: 1.5,
    textTransform: "uppercase"
  },
  caption: {
    fontFamily: baseProperties.fontFamily,
    fontSize: baseProperties.fontSizeXS,
    fontWeight: baseProperties.fontWeightRegular,
    lineHeight: 1.25
  },
  overline: {
    fontFamily: baseProperties.fontFamily
  },
  d1: _objectSpread({
    fontSize: (0, _pxToRem.default)(80)
  }, baseDisplayProperties),
  d2: _objectSpread({
    fontSize: (0, _pxToRem.default)(72)
  }, baseDisplayProperties),
  d3: _objectSpread({
    fontSize: (0, _pxToRem.default)(64)
  }, baseDisplayProperties),
  d4: _objectSpread({
    fontSize: (0, _pxToRem.default)(56)
  }, baseDisplayProperties),
  d5: _objectSpread({
    fontSize: (0, _pxToRem.default)(48)
  }, baseDisplayProperties),
  d6: _objectSpread({
    fontSize: (0, _pxToRem.default)(40)
  }, baseDisplayProperties),
  size: {
    xxs: baseProperties.fontSizeXXS,
    xs: baseProperties.fontSizeXS,
    sm: baseProperties.fontSizeSM,
    md: baseProperties.fontSizeMD,
    lg: baseProperties.fontSizeLG,
    xl: baseProperties.fontSizeXL
  },
  lineHeight: {
    sm: 1.25,
    md: 1.5,
    lg: 2
  }
};
var _default = typography;
exports.default = _default;