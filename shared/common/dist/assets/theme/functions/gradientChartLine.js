"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _rgba = _interopRequireDefault(require("../../theme/functions/rgba"));
/**
  The gradientChartLine() function helps you to create a gradient color for the chart line
 */

function gradientChartLine(chart, color) {
  var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.2;
  var ctx = chart.getContext("2d");
  var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
  var primaryColor = (0, _rgba.default)(color, opacity).toString();
  gradientStroke.addColorStop(1, primaryColor);
  gradientStroke.addColorStop(0.2, "rgba(72, 72, 176, 0.0)");
  gradientStroke.addColorStop(0, "rgba(203, 12, 159, 0)");
  return gradientStroke;
}
var _default = gradientChartLine;
exports.default = _default;