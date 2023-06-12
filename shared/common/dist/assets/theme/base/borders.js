"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../theme/base/colors"));
var _pxToRem = _interopRequireDefault(require("../../theme/functions/pxToRem"));
/**
 * The base border styles for the Soft UI Dashboard React.
 * You can add new border width, border color or border radius using this file.
 * You can customized the borders value for the entire Soft UI Dashboard React using thie file.
 */

var grey = _colors.default.grey;
var borders = {
  borderColor: grey[300],
  borderWidth: {
    0: 0,
    1: (0, _pxToRem.default)(1),
    2: (0, _pxToRem.default)(2),
    3: (0, _pxToRem.default)(3),
    4: (0, _pxToRem.default)(4),
    5: (0, _pxToRem.default)(5)
  },
  borderRadius: {
    xs: (0, _pxToRem.default)(2),
    sm: (0, _pxToRem.default)(4),
    md: (0, _pxToRem.default)(8),
    lg: (0, _pxToRem.default)(12),
    xl: (0, _pxToRem.default)(16),
    xxl: (0, _pxToRem.default)(24),
    section: (0, _pxToRem.default)(160)
  }
};
var _default = borders;
exports.default = _default;