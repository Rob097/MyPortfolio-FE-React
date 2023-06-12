"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var inputColors = _colors.default.inputColors;
var borderWidth = _borders.default.borderWidth,
  borderRadius = _borders.default.borderRadius;
var input = {
  styleOverrides: {
    root: {
      display: "flex !important",
      padding: "".concat((0, _pxToRem.default)(8), " ").concat((0, _pxToRem.default)(28), " ").concat((0, _pxToRem.default)(8), " ").concat((0, _pxToRem.default)(12), " !important"),
      border: "".concat(borderWidth[1], " solid ").concat(inputColors.borderColor.main),
      borderRadius: "".concat(borderRadius.md, " !important"),
      "& fieldset": {
        border: "none"
      }
    },
    input: {
      height: (0, _pxToRem.default)(22),
      width: "max-content !important"
    },
    inputSizeSmall: {
      height: (0, _pxToRem.default)(14)
    }
  }
};
var _default = input;
exports.default = _default;