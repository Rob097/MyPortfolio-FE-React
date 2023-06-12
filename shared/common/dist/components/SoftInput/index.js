"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _SoftInputIconBoxRoot = _interopRequireDefault(require("./SoftInputIconBoxRoot"));
var _SoftInputIconRoot = _interopRequireDefault(require("./SoftInputIconRoot"));
var _SoftInputRoot = _interopRequireDefault(require("./SoftInputRoot"));
var _SoftInputWithIconRoot = _interopRequireDefault(require("./SoftInputWithIconRoot"));
var _DashboardStore = require("context/DashboardStore");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["size", "icon", "error", "success", "disabled"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SoftInput = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var size = _ref.size,
    icon = _ref.icon,
    error = _ref.error,
    success = _ref.success,
    disabled = _ref.disabled,
    rest = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var template;
  var _useSoftUIController = (0, _DashboardStore.useSoftUIController)(),
    _useSoftUIController2 = (0, _slicedToArray2.default)(_useSoftUIController, 1),
    controller = _useSoftUIController2[0];
  var direction = controller.direction;
  var iconDirection = icon.direction;
  if (icon.component && icon.direction === "left") {
    template = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SoftInputWithIconRoot.default, {
      ref: ref,
      ownerState: {
        error: error,
        success: success,
        disabled: disabled
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SoftInputIconBoxRoot.default, {
        ownerState: {
          size: size
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SoftInputIconRoot.default, {
          fontSize: "small",
          ownerState: {
            size: size
          },
          children: icon.component
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SoftInputRoot.default, _objectSpread(_objectSpread({}, rest), {}, {
        ownerState: {
          size: size,
          error: error,
          success: success,
          iconDirection: iconDirection,
          direction: direction,
          disabled: disabled
        }
      }))]
    });
  } else if (icon.component && icon.direction === "right") {
    template = /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SoftInputWithIconRoot.default, {
      ref: ref,
      ownerState: {
        error: error,
        success: success,
        disabled: disabled
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SoftInputRoot.default, _objectSpread(_objectSpread({}, rest), {}, {
        ownerState: {
          size: size,
          error: error,
          success: success,
          iconDirection: iconDirection,
          direction: direction,
          disabled: disabled
        }
      })), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SoftInputIconBoxRoot.default, {
        ownerState: {
          size: size
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SoftInputIconRoot.default, {
          fontSize: "small",
          ownerState: {
            size: size
          },
          children: icon.component
        })
      })]
    });
  } else {
    template = /*#__PURE__*/(0, _jsxRuntime.jsx)(_SoftInputRoot.default, _objectSpread(_objectSpread({}, rest), {}, {
      ref: ref,
      ownerState: {
        size: size,
        error: error,
        success: success,
        disabled: disabled
      }
    }));
  }
  return template;
});

// Setting default values for the props of SoftInput
SoftInput.defaultProps = {
  size: "medium",
  icon: {
    component: false,
    direction: "none"
  },
  error: false,
  success: false,
  disabled: false
};

// Typechecking props for the SoftInput
SoftInput.propTypes = {
  size: _propTypes.default.oneOf(["small", "medium", "large"]),
  icon: _propTypes.default.shape({
    component: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.bool]),
    direction: _propTypes.default.oneOf(["none", "left", "right"])
  }),
  error: _propTypes.default.bool,
  success: _propTypes.default.bool,
  disabled: _propTypes.default.bool
};
var _default = SoftInput;
exports.default = _default;