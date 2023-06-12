"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pxToRem = _interopRequireDefault(require("../functions/pxToRem"));
var _colors = _interopRequireDefault(require("../base/colors"));
var _boxShadows = _interopRequireDefault(require("../base/boxShadows"));
var _borders = _interopRequireDefault(require("../base/borders"));
var transparent = _colors.default.transparent;
var lg = _boxShadows.default.lg;
var borderRadius = _borders.default.borderRadius;
var popover = {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: lg,
      padding: (0, _pxToRem.default)(8),
      borderRadius: borderRadius.lg
    }
  }
};
var _default = popover;
exports.default = _default;