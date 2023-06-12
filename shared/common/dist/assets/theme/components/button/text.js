"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _typography = _interopRequireDefault(require("../../base/typography"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var transparent = _colors.default.transparent,
  info = _colors.default.info,
  secondary = _colors.default.secondary,
  grey = _colors.default.grey;
var size = _typography.default.size;
var buttonText = {
  base: {
    backgroundColor: transparent.main,
    height: "max-content",
    color: info.main,
    boxShadow: "none",
    padding: "".concat((0, _pxToRem.default)(6), " ").concat((0, _pxToRem.default)(12)),
    "&:hover": {
      backgroundColor: transparent.main,
      boxShadow: "none",
      color: info.focus
    },
    "&:focus": {
      boxShadow: "none",
      color: info.focus
    },
    "&:active, &:active:focus, &:active:hover": {
      opacity: 0.85,
      boxShadow: "none"
    },
    "&:disabled": {
      color: grey[600],
      boxShadow: "none"
    },
    "& .material-icons, .material-icons-round, svg, span": {
      fontSize: "".concat((0, _pxToRem.default)(16), " !important")
    }
  },
  small: {
    fontSize: size.xs,
    "& .material-icons, .material-icons-round, svg, span": {
      fontSize: "".concat((0, _pxToRem.default)(12), " !important")
    }
  },
  large: {
    fontSize: size.sm,
    "& .material-icons, .material-icons-round, svg, span": {
      fontSize: "".concat((0, _pxToRem.default)(22), " !important")
    }
  },
  primary: {
    color: info.main,
    backgroundColor: transparent.main,
    "&:hover": {
      color: info.focus,
      backgroundColor: transparent.main
    },
    "&:focus:not(:hover)": {
      color: info.focus,
      backgroundColor: transparent.focus,
      boxShadow: "none"
    }
  },
  secondary: {
    color: secondary.focus,
    backgroundColor: transparent.main,
    "&:hover": {
      color: secondary.focus,
      backgroundColor: transparent.main
    },
    "&:focus:not(:hover)": {
      color: secondary.focus,
      backgroundColor: transparent.focus,
      boxShadow: "none"
    }
  }
};
var _default = buttonText;
exports.default = _default;