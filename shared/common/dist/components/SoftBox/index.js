"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _SoftBoxRoot = _interopRequireDefault(require("./SoftBoxRoot"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["variant", "bgColor", "color", "opacity", "borderRadius", "shadow"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SoftBox = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var variant = _ref.variant,
    bgColor = _ref.bgColor,
    color = _ref.color,
    opacity = _ref.opacity,
    borderRadius = _ref.borderRadius,
    shadow = _ref.shadow,
    rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SoftBoxRoot.default, _objectSpread(_objectSpread({}, rest), {}, {
    ref: ref,
    ownerState: {
      variant: variant,
      bgColor: bgColor,
      color: color,
      opacity: opacity,
      borderRadius: borderRadius,
      shadow: shadow
    }
  }));
});

// Setting default values for the props of SoftBox
SoftBox.defaultProps = {
  variant: "contained",
  bgColor: "transparent",
  color: "dark",
  opacity: 1,
  borderRadius: "none",
  shadow: "none"
};

// Typechecking props for the SoftBox
SoftBox.propTypes = {
  variant: _propTypes.default.oneOf(["contained", "gradient"]),
  bgColor: _propTypes.default.string,
  color: _propTypes.default.string,
  opacity: _propTypes.default.number,
  borderRadius: _propTypes.default.string,
  shadow: _propTypes.default.string
};
var _default = SoftBox;
exports.default = _default;