"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var transparent = _colors.default.transparent;
var select = {
  styleOverrides: {
    select: {
      display: "grid",
      alignItems: "center",
      padding: "0 ".concat((0, _pxToRem.default)(12), " !important"),
      "& .Mui-selected": {
        backgroundColor: transparent.main
      }
    },
    selectMenu: {
      background: "none",
      height: "none",
      minHeight: "none",
      overflow: "unset"
    },
    icon: {
      display: "none"
    }
  }
};
var _default = select;
exports.default = _default;