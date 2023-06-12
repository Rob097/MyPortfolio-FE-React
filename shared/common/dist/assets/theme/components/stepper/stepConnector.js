"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _borders = _interopRequireDefault(require("../../base/borders"));
var _colors = _interopRequireDefault(require("../../base/colors"));
var dark = _colors.default.dark;
var borderWidth = _borders.default.borderWidth,
  borderColor = _borders.default.borderColor;
var stepConnector = {
  styleOverrides: {
    root: {
      color: borderColor,
      transition: "all 200ms linear",
      "&.Mui-active": {
        color: dark.main
      },
      "&.Mui-completed": {
        color: dark.main
      }
    },
    alternativeLabel: {
      top: "14%",
      left: "-50%",
      right: "50%"
    },
    line: {
      borderWidth: "".concat(borderWidth[2], " !important"),
      borderColor: "currentColor"
    }
  }
};
var _default = stepConnector;
exports.default = _default;