"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _borders = _interopRequireDefault(require("../base/borders"));
var borderRadius = _borders.default.borderRadius;
var avatar = {
  styleOverrides: {
    root: {
      transition: "all 200ms ease-in-out"
    },
    rounded: {
      borderRadius: borderRadius.lg
    },
    img: {
      height: "auto"
    }
  }
};
var _default = avatar;
exports.default = _default;