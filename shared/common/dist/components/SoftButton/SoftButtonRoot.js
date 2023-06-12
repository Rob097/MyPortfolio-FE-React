"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Button = _interopRequireDefault(require("@mui/material/Button"));
var _styles = require("@mui/material/styles");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = (0, _styles.styled)(_Button.default)(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var palette = theme.palette,
    functions = theme.functions,
    borders = theme.borders;
  var color = ownerState.color,
    variant = ownerState.variant,
    size = ownerState.size,
    circular = ownerState.circular,
    iconOnly = ownerState.iconOnly;
  var white = palette.white,
    dark = palette.dark,
    text = palette.text,
    transparent = palette.transparent,
    gradients = palette.gradients;
  var boxShadow = functions.boxShadow,
    linearGradient = functions.linearGradient,
    pxToRem = functions.pxToRem,
    rgba = functions.rgba;
  var borderRadius = borders.borderRadius;

  // styles for the button with variant="contained"
  var containedStyles = function containedStyles() {
    // background color value
    var backgroundValue = palette[color] ? palette[color].main : white.main;

    // backgroundColor value when button is focused
    var focusedBackgroundValue = palette[color] ? palette[color].focus : white.focus;

    // boxShadow value
    var boxShadowValue = palette[color] ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5) : boxShadow([0, 0], [0, 3.2], dark.main, 0.5);

    // color value
    var colorValue = white.main;
    if (color === "white" || !palette[color]) {
      colorValue = text.main;
    } else if (color === "light") {
      colorValue = gradients.dark.state;
    }

    // color value when button is focused
    var focusedColorValue = white.main;
    if (color === "white") {
      focusedColorValue = text.main;
    } else if (color === "primary" || color === "error" || color === "dark") {
      focusedColorValue = white.main;
    }
    return {
      background: backgroundValue,
      color: colorValue,
      "&:hover": {
        backgroundColor: backgroundValue
      },
      "&:focus:not(:hover)": {
        backgroundColor: focusedBackgroundValue,
        boxShadow: boxShadowValue
      },
      "&:disabled": {
        backgroundColor: backgroundValue,
        color: focusedColorValue
      }
    };
  };

  // styles for the button with variant="outlined"
  var outliedStyles = function outliedStyles() {
    // background color value
    var backgroundValue = color === "white" ? rgba(white.main, 0.1) : transparent.main;

    // color value
    var colorValue = palette[color] ? palette[color].main : white.main;

    // boxShadow value
    var boxShadowValue = palette[color] ? boxShadow([0, 0], [0, 3.2], palette[color].main, 0.5) : boxShadow([0, 0], [0, 3.2], white.main, 0.5);

    // border color value
    var borderColorValue = palette[color] ? palette[color].main : rgba(white.main, 0.75);
    if (color === "white") {
      borderColorValue = rgba(white.main, 0.75);
    }
    return {
      background: backgroundValue,
      color: colorValue,
      borderColor: borderColorValue,
      "&:hover": {
        background: transparent.main,
        borderColor: colorValue
      },
      "&:focus:not(:hover)": {
        background: transparent.main,
        boxShadow: boxShadowValue
      },
      "&:active:not(:hover)": {
        backgroundColor: colorValue,
        color: white.main,
        opacity: 0.85
      },
      "&:disabled": {
        color: colorValue,
        borderColor: colorValue
      }
    };
  };

  // styles for the button with variant="gradient"
  var gradientStyles = function gradientStyles() {
    // background value
    var backgroundValue = color === "white" || !gradients[color] ? white.main : linearGradient(gradients[color].main, gradients[color].state);

    // color value
    var colorValue = white.main;
    if (color === "white") {
      colorValue = text.main;
    } else if (color === "light") {
      colorValue = gradients.dark.state;
    }
    return {
      background: backgroundValue,
      color: colorValue,
      "&:focus:not(:hover)": {
        boxShadow: "none"
      },
      "&:disabled": {
        background: backgroundValue,
        color: colorValue
      }
    };
  };

  // styles for the button with variant="text"
  var textStyles = function textStyles() {
    // color value
    var colorValue = palette[color] ? palette[color].main : white.main;

    // color value when button is focused
    var focusedColorValue = palette[color] ? palette[color].focus : white.focus;
    return {
      color: colorValue,
      "&:hover": {
        color: focusedColorValue
      },
      "&:focus:not(:hover)": {
        color: focusedColorValue
      }
    };
  };

  // styles for the button with circular={true}
  var circularStyles = function circularStyles() {
    return {
      borderRadius: borderRadius.section
    };
  };

  // styles for the button with iconOnly={true}
  var iconOnlyStyles = function iconOnlyStyles() {
    // width, height, minWidth and minHeight values
    var sizeValue = pxToRem(38);
    if (size === "small") {
      sizeValue = pxToRem(25.4);
    } else if (size === "large") {
      sizeValue = pxToRem(52);
    }

    // padding value
    var paddingValue = "".concat(pxToRem(11), " ").concat(pxToRem(11), " ").concat(pxToRem(10));
    if (size === "small") {
      paddingValue = pxToRem(4.5);
    } else if (size === "large") {
      paddingValue = pxToRem(16);
    }
    return {
      width: sizeValue,
      minWidth: sizeValue,
      height: sizeValue,
      minHeight: sizeValue,
      padding: paddingValue,
      "& .material-icons": {
        marginTop: 0
      },
      "&:hover, &:focus, &:active": {
        transform: "none"
      }
    };
  };
  return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, variant === "contained" && containedStyles()), variant === "outlined" && outliedStyles()), variant === "gradient" && gradientStyles()), variant === "text" && textStyles()), circular && circularStyles()), iconOnly && iconOnlyStyles());
});
exports.default = _default;