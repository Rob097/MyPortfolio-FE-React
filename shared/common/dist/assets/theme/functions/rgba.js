"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hexToRgb = _interopRequireDefault(require("../../theme/functions/hexToRgb"));
/**
  The rgba() function helps you to create a rgba color code, it uses the hexToRgb() function
  to convert the hex code into rgb for using it inside the rgba color format.
 */

function rgba(color, opacity) {
  return "rgba(".concat((0, _hexToRgb.default)(color), ", ").concat(opacity, ")");
}
var _default = rgba;
exports.default = _default;