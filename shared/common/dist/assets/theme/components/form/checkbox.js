"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _borders = _interopRequireDefault(require("../../base/borders"));
var _colors = _interopRequireDefault(require("../../base/colors"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var _linearGradient = _interopRequireDefault(require("../../functions/linearGradient"));
var borderWidth = _borders.default.borderWidth,
  borderColor = _borders.default.borderColor;
var transparent = _colors.default.transparent,
  gradients = _colors.default.gradients,
  info = _colors.default.info;
var checkbox = {
  styleOverrides: {
    root: {
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      width: (0, _pxToRem.default)(20),
      height: (0, _pxToRem.default)(20),
      marginRight: (0, _pxToRem.default)(6),
      padding: 0,
      color: transparent.main,
      border: "".concat(borderWidth[1], " solid ").concat(borderColor),
      borderRadius: (0, _pxToRem.default)(5.6),
      transition: "all 250ms ease",
      "&:hover": {
        backgroundColor: transparent.main
      },
      "& .MuiSvgIcon-root": {
        fill: transparent.main
      },
      "&.Mui-focusVisible": {
        border: "".concat(borderWidth[2], " solid ").concat(info.main, " !important")
      }
    },
    colorPrimary: {
      backgroundColor: transparent.main,
      "&.Mui-checked": {
        backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M6 10l3 3l6-6'/%3e%3c/svg%3e\"), ".concat((0, _linearGradient.default)(gradients.dark.main, gradients.dark.state)),
        borderColor: gradients.dark.main
      },
      "&:hover": {
        backgroundColor: transparent.main
      }
    },
    colorSecondary: {
      backgroundColor: transparent.main,
      "&.Mui-checked": {
        backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 22 22'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='M6 10l3 3l6-6'/%3e%3c/svg%3e\"), ".concat((0, _linearGradient.default)(gradients.dark.main, gradients.dark.state)),
        borderColor: gradients.dark.main
      },
      "&:hover": {
        backgroundColor: transparent.main
      }
    }
  }
};
var _default = checkbox;
exports.default = _default;