"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _chromaJs = _interopRequireDefault(require("chroma-js"));
/**
  The hexToRgb() function helps you to change the hex color code to rgb
  using chroma-js library.
 */

function hexToRgb(color) {
  return (0, _chromaJs.default)(color).rgb().join(", ");
}
var _default = hexToRgb;
exports.default = _default;