"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var step = {
  styleOverrides: {
    root: {
      padding: "0 ".concat((0, _pxToRem.default)(6))
    }
  }
};
var _default = step;
exports.default = _default;