"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _borders = _interopRequireDefault(require("../../base/borders"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var borderRadius = _borders.default.borderRadius;
var tableHead = {
  styleOverrides: {
    root: {
      display: "block",
      padding: "".concat((0, _pxToRem.default)(16), " ").concat((0, _pxToRem.default)(16), " 0  ").concat((0, _pxToRem.default)(16)),
      borderRadius: "".concat(borderRadius.xl, " ").concat(borderRadius.xl, " 0 0")
    }
  }
};
var _default = tableHead;
exports.default = _default;