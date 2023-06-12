"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _borders = _interopRequireDefault(require("../../base/borders"));
var _colors = _interopRequireDefault(require("../../base/colors"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var borderWidth = _borders.default.borderWidth;
var light = _colors.default.light;
var tableCell = {
  styleOverrides: {
    root: {
      padding: "".concat((0, _pxToRem.default)(12), " ").concat((0, _pxToRem.default)(16)),
      borderBottom: "".concat(borderWidth[1], " solid ").concat(light.main)
    }
  }
};
var _default = tableCell;
exports.default = _default;