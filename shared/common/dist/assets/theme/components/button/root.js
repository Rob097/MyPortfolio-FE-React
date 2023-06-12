"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typography = _interopRequireDefault(require("../../base/typography"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var fontWeightBold = _typography.default.fontWeightBold,
  size = _typography.default.size;
var borderRadius = _borders.default.borderRadius;
var root = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: size.xs,
  fontWeight: fontWeightBold,
  borderRadius: borderRadius.md,
  padding: "".concat((0, _pxToRem.default)(12), " ").concat((0, _pxToRem.default)(24)),
  lineHeight: 1.4,
  textAlign: "center",
  textTransform: "uppercase",
  userSelect: "none",
  backgroundSize: "150% !important",
  backgroundPositionX: "25% !important",
  transition: "all 150ms ease-in",
  "&:hover": {
    transform: "scale(1.02)"
  },
  "&:disabled": {
    pointerEvent: "none",
    opacity: 0.65
  },
  "& .material-icons": {
    fontSize: (0, _pxToRem.default)(15),
    marginTop: (0, _pxToRem.default)(-2)
  }
};
var _default = root;
exports.default = _default;