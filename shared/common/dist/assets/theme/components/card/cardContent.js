"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var cardContent = {
  styleOverrides: {
    root: {
      marginTop: 0,
      marginBottom: 0,
      padding: "".concat((0, _pxToRem.default)(8), " ").concat((0, _pxToRem.default)(24), " ").concat((0, _pxToRem.default)(24))
    }
  }
};
var _default = cardContent;
exports.default = _default;