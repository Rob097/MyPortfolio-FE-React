"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _SoftTypographyRoot = _interopRequireDefault(require("./SoftTypographyRoot"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["color", "fontWeight", "textTransform", "verticalAlign", "textGradient", "opacity", "children"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SoftTypography = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var color = _ref.color,
    fontWeight = _ref.fontWeight,
    textTransform = _ref.textTransform,
    verticalAlign = _ref.verticalAlign,
    textGradient = _ref.textGradient,
    opacity = _ref.opacity,
    children = _ref.children,
    rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SoftTypographyRoot.default, _objectSpread(_objectSpread({}, rest), {}, {
    ref: ref,
    ownerState: {
      color: color,
      textTransform: textTransform,
      verticalAlign: verticalAlign,
      fontWeight: fontWeight,
      opacity: opacity,
      textGradient: textGradient
    },
    children: children
  }));
});

// Setting default values for the props of SoftTypography
SoftTypography.defaultProps = {
  color: "dark",
  fontWeight: false,
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1
};

// Typechecking props for the SoftTypography
SoftTypography.propTypes = {
  color: _propTypes.default.oneOf(["inherit", "primary", "secondary", "info", "success", "warning", "error", "light", "dark", "text", "white"]),
  fontWeight: _propTypes.default.oneOf([false, "light", "regular", "medium", "bold"]),
  textTransform: _propTypes.default.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
  verticalAlign: _propTypes.default.oneOf(["unset", "baseline", "sub", "super", "text-top", "text-bottom", "middle", "top", "bottom"]),
  textGradient: _propTypes.default.bool,
  children: _propTypes.default.node.isRequired,
  opacity: _propTypes.default.number
};
var _default = SoftTypography;
exports.default = _default;