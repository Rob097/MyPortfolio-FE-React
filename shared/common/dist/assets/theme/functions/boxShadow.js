"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _rgba = _interopRequireDefault(require("common-lib/assets/theme/functions/rgba"));
var _pxToRem = _interopRequireDefault(require("common-lib/assets/theme/functions/pxToRem"));
/**
  The boxShadow() function helps you to create a box shadow for an element
 */

function boxShadow() {
  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var color = arguments.length > 2 ? arguments[2] : undefined;
  var opacity = arguments.length > 3 ? arguments[3] : undefined;
  var inset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
  var _offset = (0, _slicedToArray2.default)(offset, 2),
    x = _offset[0],
    y = _offset[1];
  var _radius = (0, _slicedToArray2.default)(radius, 2),
    blur = _radius[0],
    spread = _radius[1];
  return "".concat(inset, " ").concat((0, _pxToRem.default)(x), " ").concat((0, _pxToRem.default)(y), " ").concat((0, _pxToRem.default)(blur), " ").concat((0, _pxToRem.default)(spread), " ").concat((0, _rgba.default)(color, opacity));
}
var _default = boxShadow;
exports.default = _default;