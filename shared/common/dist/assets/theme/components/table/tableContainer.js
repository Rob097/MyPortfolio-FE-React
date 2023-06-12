"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _boxShadows = _interopRequireDefault(require("../../base/boxShadows"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var white = _colors.default.white;
var xxl = _boxShadows.default.xxl;
var borderRadius = _borders.default.borderRadius;
var tableContainer = {
  styleOverrides: {
    root: {
      backgroundColor: white.main,
      boxShadow: xxl,
      borderRadius: borderRadius.xl
    }
  }
};
var _default = tableContainer;
exports.default = _default;