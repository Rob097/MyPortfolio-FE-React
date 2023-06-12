"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _typography = _interopRequireDefault(require("../../base/typography"));
var _boxShadows = _interopRequireDefault(require("../../base/boxShadows"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var white = _colors.default.white,
  text = _colors.default.text,
  info = _colors.default.info,
  secondary = _colors.default.secondary;
var size = _typography.default.size;
var buttonBoxShadow = _boxShadows.default.buttonBoxShadow;
var contained = {
  base: {
    backgroundColor: white.main,
    minHeight: (0, _pxToRem.default)(40),
    color: text.main,
    boxShadow: buttonBoxShadow.main,
    padding: "".concat((0, _pxToRem.default)(12), " ").concat((0, _pxToRem.default)(24)),
    "&:hover": {
      backgroundColor: white.main,
      boxShadow: buttonBoxShadow.stateOf
    },
    "&:focus": {
      boxShadow: buttonBoxShadow.stateOf
    },
    "&:active, &:active:focus, &:active:hover": {
      opacity: 0.85,
      boxShadow: buttonBoxShadow.stateOf
    },
    "&:disabled": {
      boxShadow: buttonBoxShadow.main
    },
    "& .material-icon, .material-icons-round, svg": {
      fontSize: "".concat((0, _pxToRem.default)(16), " !important")
    }
  },
  small: {
    minHeight: (0, _pxToRem.default)(32),
    padding: "".concat((0, _pxToRem.default)(8), " ").concat((0, _pxToRem.default)(32)),
    fontSize: size.xs,
    "& .material-icon, .material-icons-round, svg": {
      fontSize: "".concat((0, _pxToRem.default)(12), " !important")
    }
  },
  large: {
    minHeight: (0, _pxToRem.default)(47),
    padding: "".concat((0, _pxToRem.default)(14), " ").concat((0, _pxToRem.default)(64)),
    fontSize: size.sm,
    "& .material-icon, .material-icons-round, svg": {
      fontSize: "".concat((0, _pxToRem.default)(22), " !important")
    }
  },
  primary: {
    backgroundColor: info.main,
    "&:hover": {
      backgroundColor: info.main
    },
    "&:focus:not(:hover)": {
      backgroundColor: info.focus,
      boxShadow: buttonBoxShadow.stateOfNotHover
    }
  },
  secondary: {
    backgroundColor: secondary.main,
    "&:hover": {
      backgroundColor: secondary.main
    },
    "&:focus:not(:hover)": {
      backgroundColor: secondary.focus,
      boxShadow: buttonBoxShadow.stateOfNotHover
    }
  }
};
var _default = contained;
exports.default = _default;