"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _boxShadows = _interopRequireDefault(require("../../base/boxShadows"));
var _typography = _interopRequireDefault(require("../../base/typography"));
var _colors = _interopRequireDefault(require("../../base/colors"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var lg = _boxShadows.default.lg;
var size = _typography.default.size;
var text = _colors.default.text,
  white = _colors.default.white;
var borderRadius = _borders.default.borderRadius;
var menu = {
  defaultProps: {
    disableAutoFocusItem: true
  },
  styleOverrides: {
    paper: {
      minWidth: (0, _pxToRem.default)(160),
      boxShadow: lg,
      padding: "".concat((0, _pxToRem.default)(16), " ").concat((0, _pxToRem.default)(8)),
      fontSize: size.sm,
      color: text.main,
      textAlign: "left",
      backgroundColor: "".concat(white.main, " !important"),
      borderRadius: borderRadius.md
    }
  }
};
var _default = menu;
exports.default = _default;