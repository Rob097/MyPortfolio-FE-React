"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _borders = _interopRequireDefault(require("../../base/borders"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var borderRadius = _borders.default.borderRadius;
var cardMedia = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: "".concat((0, _pxToRem.default)(16), " ").concat((0, _pxToRem.default)(16), " 0")
    },
    media: {
      width: "auto"
    }
  }
};
var _default = cardMedia;
exports.default = _default;