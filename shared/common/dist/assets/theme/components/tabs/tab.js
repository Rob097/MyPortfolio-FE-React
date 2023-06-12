"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typography = _interopRequireDefault(require("../../base/typography"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _colors = _interopRequireDefault(require("../../base/colors"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var size = _typography.default.size,
  fontWeightRegular = _typography.default.fontWeightRegular;
var borderRadius = _borders.default.borderRadius;
var dark = _colors.default.dark;
var tab = {
  styleOverrides: {
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      flex: "1 1 auto",
      textAlign: "center",
      maxWidth: "unset !important",
      minWidth: "unset !important",
      minHeight: "unset !important",
      fontSize: size.md,
      fontWeight: fontWeightRegular,
      textTransform: "none",
      lineHeight: "inherit",
      padding: (0, _pxToRem.default)(4),
      borderRadius: borderRadius.md,
      color: "".concat(dark.main, " !important"),
      opacity: "1 !important",
      "& .material-icons, .material-icons-round": {
        marginBottom: "0 !important",
        marginRight: (0, _pxToRem.default)(4)
      },
      "& svg": {
        marginBottom: "0 !important",
        marginRight: (0, _pxToRem.default)(6)
      }
    },
    labelIcon: {
      paddingTop: (0, _pxToRem.default)(4)
    }
  }
};
var _default = tab;
exports.default = _default;