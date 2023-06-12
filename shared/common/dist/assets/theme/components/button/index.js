"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _root = _interopRequireDefault(require("../../components/button/root"));
var _contained = _interopRequireDefault(require("../../components/button/contained"));
var _outlined = _interopRequireDefault(require("../../components/button/outlined"));
var _text = _interopRequireDefault(require("../../components/button/text"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var button = {
  defaultProps: {
    disableRipple: true
  },
  styleOverrides: {
    root: _objectSpread({}, _root.default),
    contained: _objectSpread({}, _contained.default.base),
    containedSizeSmall: _objectSpread({}, _contained.default.small),
    containedSizeLarge: _objectSpread({}, _contained.default.large),
    containedPrimary: _objectSpread({}, _contained.default.primary),
    containedSecondary: _objectSpread({}, _contained.default.secondary),
    outlined: _objectSpread({}, _outlined.default.base),
    outlinedSizeSmall: _objectSpread({}, _outlined.default.small),
    outlinedSizeLarge: _objectSpread({}, _outlined.default.large),
    outlinedPrimary: _objectSpread({}, _outlined.default.primary),
    outlinedSecondary: _objectSpread({}, _outlined.default.secondary),
    text: _objectSpread({}, _text.default.base),
    textSizeSmall: _objectSpread({}, _text.default.small),
    textSizeLarge: _objectSpread({}, _text.default.large),
    textPrimary: _objectSpread({}, _text.default.primary),
    textSecondary: _objectSpread({}, _text.default.secondary)
  }
};
var _default = button;
exports.default = _default;