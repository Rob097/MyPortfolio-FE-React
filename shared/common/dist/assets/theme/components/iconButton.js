"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../base/colors"));
var transparent = _colors.default.transparent;
var iconButton = {
  styleOverrides: {
    root: {
      "&:hover": {
        backgroundColor: transparent.main
      }
    }
  }
};
var _default = iconButton;
exports.default = _default;