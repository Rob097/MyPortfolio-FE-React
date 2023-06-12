"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _borders = _interopRequireDefault(require("../../base/borders"));
var _boxShadows = _interopRequireDefault(require("../../base/boxShadows"));
var borderRadius = _borders.default.borderRadius;
var xxl = _boxShadows.default.xxl;
var dialog = {
  styleOverrides: {
    paper: {
      borderRadius: borderRadius.lg,
      boxShadow: xxl
    },
    paperFullScreen: {
      borderRadius: 0
    }
  }
};
var _default = dialog;
exports.default = _default;