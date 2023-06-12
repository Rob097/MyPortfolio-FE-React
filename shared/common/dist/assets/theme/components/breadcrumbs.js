"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../base/colors"));
var _typography = _interopRequireDefault(require("../base/typography"));
var grey = _colors.default.grey;
var size = _typography.default.size;
var breadcrumbs = {
  styleOverrides: {
    li: {
      lineHeight: 0
    },
    separator: {
      fontSize: size.sm,
      color: grey[600]
    }
  }
};
var _default = breadcrumbs;
exports.default = _default;