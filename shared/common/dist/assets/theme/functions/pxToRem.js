"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
  The pxToRem() function helps you to convert a px unit into a rem unit, 
 */
function pxToRem(number) {
  var baseNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
  return "".concat(number / baseNumber, "rem");
}
var _default = pxToRem;
exports.default = _default;