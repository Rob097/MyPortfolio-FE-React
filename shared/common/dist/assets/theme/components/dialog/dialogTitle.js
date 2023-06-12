"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typography = _interopRequireDefault(require("../../base/typography"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var size = _typography.default.size;
var dialogTitle = {
  styleOverrides: {
    root: {
      padding: (0, _pxToRem.default)(16),
      fontSize: size.xl
    }
  }
};
var _default = dialogTitle;
exports.default = _default;