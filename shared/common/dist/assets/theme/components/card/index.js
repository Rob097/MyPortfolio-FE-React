"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _boxShadows = _interopRequireDefault(require("../../base/boxShadows"));
var _rgba = _interopRequireDefault(require("../../functions/rgba"));
var black = _colors.default.black,
  white = _colors.default.white;
var borderWidth = _borders.default.borderWidth,
  borderRadius = _borders.default.borderRadius;
var xxl = _boxShadows.default.xxl;
var card = {
  styleOverrides: {
    root: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      backgroundColor: white.main,
      backgroundClip: "border-box",
      border: "".concat(borderWidth[0], " solid ").concat((0, _rgba.default)(black.main, 0.125)),
      borderRadius: borderRadius.xl,
      boxShadow: xxl
    }
  }
};
var _default = card;
exports.default = _default;