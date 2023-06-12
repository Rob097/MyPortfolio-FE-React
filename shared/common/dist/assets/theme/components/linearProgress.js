"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _borders = _interopRequireDefault(require("../base/borders"));
var _colors = _interopRequireDefault(require("../base/colors"));
var _pxToRem = _interopRequireDefault(require("../functions/pxToRem"));
var borderRadius = _borders.default.borderRadius;
var light = _colors.default.light;
var linearProgress = {
  styleOverrides: {
    root: {
      height: (0, _pxToRem.default)(3),
      borderRadius: borderRadius.md,
      overflow: "visible",
      position: "relative"
    },
    colorPrimary: {
      backgroundColor: light.main
    },
    colorSecondary: {
      backgroundColor: light.main
    },
    bar: {
      height: (0, _pxToRem.default)(6),
      borderRadius: borderRadius.sm,
      position: "absolute",
      transform: "translate(0, ".concat((0, _pxToRem.default)(-1.5), ") !important"),
      transition: "width 0.6s ease !important"
    }
  }
};
var _default = linearProgress;
exports.default = _default;