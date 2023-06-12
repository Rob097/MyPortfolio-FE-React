"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _InputBase = _interopRequireDefault(require("@mui/material/InputBase"));
var _styles = require("@mui/material/styles");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = (0, _styles.styled)(_InputBase.default)(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var palette = theme.palette,
    boxShadows = theme.boxShadows,
    functions = theme.functions,
    typography = theme.typography,
    borders = theme.borders;
  var size = ownerState.size,
    error = ownerState.error,
    success = ownerState.success,
    iconDirection = ownerState.iconDirection,
    disabled = ownerState.disabled;
  var inputColors = palette.inputColors,
    grey = palette.grey,
    white = palette.white,
    transparent = palette.transparent;
  var inputBoxShadow = boxShadows.inputBoxShadow;
  var pxToRem = functions.pxToRem,
    boxShadow = functions.boxShadow;
  var fontSize = typography.size;
  var borderRadius = borders.borderRadius;

  // styles for the input with size="small"
  var smallStyles = function smallStyles() {
    return {
      fontSize: fontSize.xs,
      padding: "".concat(pxToRem(4), " ").concat(pxToRem(12))
    };
  };

  // styles for the input with size="large"
  var largeStyles = function largeStyles() {
    return {
      padding: pxToRem(12)
    };
  };

  // styles for the focused state of the input
  var focusedBorderColorValue = inputColors.borderColor.focus;
  if (error) {
    focusedBorderColorValue = inputColors.error;
  } else if (success) {
    focusedBorderColorValue = inputColors.success;
  }
  var focusedPaddingLeftValue;
  if (iconDirection === "right") {
    focusedPaddingLeftValue = pxToRem(12);
  } else if (iconDirection === "left") {
    focusedPaddingLeftValue = pxToRem(12);
  }
  var focusedPaddingRightValue;
  if (iconDirection === "right") {
    focusedPaddingRightValue = pxToRem(12);
  } else if (iconDirection === "left") {
    focusedPaddingRightValue = pxToRem(12);
  }
  var focusedBoxShadowValue = boxShadow([0, 0], [0, 2], inputColors.boxShadow, 1);
  if (error) {
    focusedBoxShadowValue = inputBoxShadow.error;
  } else if (success) {
    focusedBoxShadowValue = inputBoxShadow.success;
  }

  // styles for the input with error={true}
  var errorStyles = function errorStyles() {
    return {
      backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23fd5c70' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23fd5c70' stroke='none'/%3E%3C/svg%3E\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right ".concat(pxToRem(12), " center"),
      backgroundSize: "".concat(pxToRem(16), " ").concat(pxToRem(16)),
      borderColor: inputColors.error
    };
  };

  // styles for the input with success={true}
  var successStyles = function successStyles() {
    return {
      backgroundImage: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%2366d432' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right ".concat(pxToRem(12), " center"),
      backgroundSize: "".concat(pxToRem(16), " ").concat(pxToRem(16)),
      borderColor: inputColors.success
    };
  };

  // styles for the input containing an icon
  var withIconStyles = function withIconStyles() {
    var withIconBorderRadiusValue = "0 ".concat(borderRadius.md, " ").concat(borderRadius.md, " 0");
    if (iconDirection === "right") {
      withIconBorderRadiusValue = "".concat(borderRadius.md, " 0 0 ").concat(borderRadius.md);
    }
    var withIconPaddingLeftValue;
    if (iconDirection === "right") {
      withIconPaddingLeftValue = pxToRem(12);
    } else if (iconDirection === "left") {
      withIconPaddingLeftValue = 0;
    }
    var withIconPaddingRightValue;
    if (iconDirection === "right") {
      withIconPaddingRightValue = 0;
    } else if (iconDirection === "left") {
      withIconPaddingRightValue = pxToRem(12);
    }
    return {
      borderColor: transparent.main,
      borderRadius: withIconBorderRadiusValue,
      paddingLeft: withIconPaddingLeftValue,
      paddingRight: withIconPaddingRightValue
    };
  };
  return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
    backgroundColor: disabled ? "".concat(grey[200], " !important") : white.main,
    pointerEvents: disabled ? "none" : "auto"
  }, size === "small" && smallStyles()), size === "large" && largeStyles()), error && errorStyles()), success && successStyles()), (iconDirection === "left" || iconDirection === "right") && withIconStyles()), {}, {
    "&.Mui-focused": {
      borderColor: focusedBorderColorValue,
      paddingLeft: focusedPaddingLeftValue,
      paddingRight: focusedPaddingRightValue,
      boxShadow: focusedBoxShadowValue,
      outline: 0
    },
    "&.MuiInputBase-multiline": {
      padding: "".concat(pxToRem(10), " ").concat(pxToRem(12))
    }
  });
});
exports.default = _default;