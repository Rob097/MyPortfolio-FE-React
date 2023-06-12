"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
  The linearGradient() function helps you to create a linear gradient color background
 */
function linearGradient(color, colorState) {
  var angle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 310;
  return "linear-gradient(".concat(angle, "deg, ").concat(color, ", ").concat(colorState, ")");
}
var _default = linearGradient;
exports.default = _default;