"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var dialogActions = {
  styleOverrides: {
    root: {
      padding: (0, _pxToRem.default)(16)
    }
  }
};
var _default = dialogActions;
exports.default = _default;