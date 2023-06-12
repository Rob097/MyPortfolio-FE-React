"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var transparent = _colors.default.transparent;
var stepper = {
  styleOverrides: {
    root: {
      margin: "".concat((0, _pxToRem.default)(48), " 0"),
      padding: "0 ".concat((0, _pxToRem.default)(12)),
      "&.MuiPaper-root": {
        backgroundColor: transparent.main
      }
    }
  }
};
var _default = stepper;
exports.default = _default;