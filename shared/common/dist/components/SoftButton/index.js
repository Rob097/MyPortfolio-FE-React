"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _SoftButtonRoot = _interopRequireDefault(require("./SoftButtonRoot"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["color", "variant", "size", "circular", "iconOnly", "children"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SoftButton = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var color = _ref.color,
    variant = _ref.variant,
    size = _ref.size,
    circular = _ref.circular,
    iconOnly = _ref.iconOnly,
    children = _ref.children,
    rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SoftButtonRoot.default, _objectSpread(_objectSpread({}, rest), {}, {
    ref: ref,
    color: "primary",
    variant: variant === "gradient" ? "contained" : variant,
    size: size,
    ownerState: {
      color: color,
      variant: variant,
      size: size,
      circular: circular,
      iconOnly: iconOnly
    },
    children: children
  }));
});

// Setting default values for the props of SoftButton
SoftButton.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "white",
  circular: false,
  iconOnly: false
};

// Typechecking props for the SoftButton
SoftButton.propTypes = {
  size: _propTypes.default.oneOf(["small", "medium", "large"]),
  variant: _propTypes.default.oneOf(["text", "contained", "outlined", "gradient"]),
  color: _propTypes.default.oneOf(["white", "primary", "secondary", "info", "success", "warning", "error", "light", "dark"]),
  circular: _propTypes.default.bool,
  iconOnly: _propTypes.default.bool,
  children: _propTypes.default.node.isRequired
};
var _default = SoftButton;
exports.default = _default;