"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typography = _interopRequireDefault(require("../../base/typography"));
var _colors = _interopRequireDefault(require("../../base/colors"));
// import pxToRem from "../../functions/pxToRem";

var size = _typography.default.size;
var text = _colors.default.text;
var dialogContentText = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main
    }
  }
};
var _default = dialogContentText;
exports.default = _default;