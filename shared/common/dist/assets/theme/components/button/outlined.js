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
var transparent = _colors.default.transparent,
  light = _colors.default.light,
  info = _colors.default.info,
  secondary = _colors.default.secondary;
var size = _typography.default.size;
var buttonBoxShadow = _boxShadows.default.buttonBoxShadow;
var outlined = {
  base: {
    minHeight: (0, _pxToRem.default)(42),
    color: light.main,
    borderColor: light.main,
    padding: "".concat((0, _pxToRem.default)(12), " ").concat((0, _pxToRem.default)(24)),
    "&:hover": {
      opacity: 0.75,
      backgroundColor: transparent.main
    },
    "&:focus:not(:hover)": {
      boxShadow: buttonBoxShadow.stateOfNotHover
    },
    "& .material-icon, .material-icons-round, svg": {
      fontSize: "".concat((0, _pxToRem.default)(16), " !important")
    }
  },
  small: {
    minHeight: (0, _pxToRem.default)(34),
    padding: "".concat((0, _pxToRem.default)(8), " ").concat((0, _pxToRem.default)(32)),
    fontSize: size.xs,
    "& .material-icon, .material-icons-round, svg": {
      fontSize: "".concat((0, _pxToRem.default)(12), " !important")
    }
  },
  large: {
    minHeight: (0, _pxToRem.default)(49),
    padding: "".concat((0, _pxToRem.default)(14), " ").concat((0, _pxToRem.default)(64)),
    fontSize: size.sm,
    "& .material-icon, .material-icons-round, svg": {
      fontSize: "".concat((0, _pxToRem.default)(22), " !important")
    }
  },
  primary: {
    backgroundColor: transparent.main,
    borderColor: info.main,
    "&:hover": {
      backgroundColor: transparent.main
    },
    "&:focus:not(:hover)": {
      boxShadow: buttonBoxShadow.stateOfNotHover
    }
  },
  secondary: {
    backgroundColor: transparent.main,
    borderColor: secondary.main,
    "&:hover": {
      backgroundColor: transparent.main
    },
    "&:focus:not(:hover)": {
      boxShadow: buttonBoxShadow.stateOfNotHover
    }
  }
};
var _default = outlined;
exports.default = _default;