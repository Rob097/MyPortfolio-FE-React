"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _typography = _interopRequireDefault(require("../../base/typography"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var dark = _colors.default.dark,
  white = _colors.default.white,
  grey = _colors.default.grey,
  inputColors = _colors.default.inputColors;
var size = _typography.default.size,
  fontWeightRegular = _typography.default.fontWeightRegular;
var borderWidth = _borders.default.borderWidth,
  borderRadius = _borders.default.borderRadius;
var inputBase = {
  styleOverrides: {
    root: {
      display: "grid !important",
      placeItems: "center !important",
      width: "100% !important",
      height: "auto !important",
      padding: "".concat((0, _pxToRem.default)(8), " ").concat((0, _pxToRem.default)(12)),
      fontSize: "".concat(size.sm, " !important"),
      fontWeight: "".concat(fontWeightRegular, " !important"),
      lineHeight: "1.4 !important",
      color: "".concat(grey[700], " !important"),
      backgroundColor: "".concat(white.main, " !important"),
      backgroundClip: "padding-box !important",
      border: "".concat(borderWidth[1], " solid ").concat(inputColors.borderColor.main),
      appearance: "none !important",
      borderRadius: borderRadius.md,
      transition: "box-shadow 150ms ease, border-color 150ms ease, padding 150ms ease !important"
    },
    input: {
      width: "100% !important",
      height: "".concat((0, _pxToRem.default)(22)),
      padding: "0 !important",
      "&::-webkit-input-placeholder": {
        color: "".concat(dark.main, " !important")
      }
    }
  }
};
var _default = inputBase;
exports.default = _default;