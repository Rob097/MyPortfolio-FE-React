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
var radio = {
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
      borderRadius: "50%",
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
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='15px' width='15px'%3E%3Ccircle cx='50%' cy='50%' r='3' fill='%23fff' /%3E%3C/svg%3E\"), ".concat((0, _linearGradient.default)(gradients.dark.main, gradients.dark.state)),
        borderColor: gradients.dark.main
      },
      "&:hover": {
        backgroundColor: transparent.main
      }
    },
    colorSecondary: {
      backgroundColor: transparent.main,
      "&.Mui-checked": {
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='15px' width='15px'%3E%3Ccircle cx='50%' cy='50%' r='3' fill='%23fff' /%3E%3C/svg%3E\"), ".concat((0, _linearGradient.default)(gradients.dark.main, gradients.dark.state)),
        borderColor: gradients.dark.main
      },
      "&:hover": {
        backgroundColor: transparent.main
      }
    }
  }
};
var _default = radio;
exports.default = _default;