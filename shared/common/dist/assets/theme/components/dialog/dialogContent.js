"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typography = _interopRequireDefault(require("../../base/typography"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _colors = _interopRequireDefault(require("../../base/colors"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var size = _typography.default.size;
var text = _colors.default.text;
var borderWidth = _borders.default.borderWidth,
  borderColor = _borders.default.borderColor;
var dialogContent = {
  styleOverrides: {
    root: {
      padding: (0, _pxToRem.default)(16),
      fontSize: size.md,
      color: text.main
    },
    dividers: {
      borderTop: "".concat(borderWidth[1], " solid ").concat(borderColor),
      borderBottom: "".concat(borderWidth[1], " solid ").concat(borderColor)
    }
  }
};
var _default = dialogContent;
exports.default = _default;