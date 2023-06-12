"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Icon = _interopRequireDefault(require("@mui/material/Icon"));
var _styles = require("@mui/material/styles");
var _default = (0, _styles.styled)(_Icon.default)(function (_ref) {
  var theme = _ref.theme,
    ownerState = _ref.ownerState;
  var typography = theme.typography;
  var size = ownerState.size;
  var fontWeightBold = typography.fontWeightBold,
    fontSize = typography.size;
  return {
    fontWeight: fontWeightBold,
    fontSize: size === "small" && "".concat(fontSize.md, " !important")
  };
});
exports.default = _default;