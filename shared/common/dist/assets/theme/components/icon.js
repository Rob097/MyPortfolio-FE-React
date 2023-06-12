"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pxToRem = _interopRequireDefault(require("../functions/pxToRem"));
var icon = {
  defaultProps: {
    baseClassName: "material-icons-round material-icons",
    fontSize: "inherit"
  },
  styleOverrides: {
    fontSizeInherit: {
      fontSize: "inherit !important"
    },
    fontSizeSmall: {
      fontSize: "".concat((0, _pxToRem.default)(20), " !important")
    },
    fontSizeLarge: {
      fontSize: "".concat((0, _pxToRem.default)(36), " !important")
    }
  }
};
var _default = icon;
exports.default = _default;