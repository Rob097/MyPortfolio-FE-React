"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../base/colors"));
var _borders = _interopRequireDefault(require("../base/borders"));
var _rgba = _interopRequireDefault(require("../functions/rgba"));
var _pxToRem = _interopRequireDefault(require("../functions/pxToRem"));
var white = _colors.default.white;
var borderRadius = _borders.default.borderRadius;
var sidenav = {
  styleOverrides: {
    root: {
      width: (0, _pxToRem.default)(250),
      whiteSpace: "nowrap",
      border: "none"
    },
    paper: {
      width: (0, _pxToRem.default)(250),
      backgroundColor: (0, _rgba.default)(white.main, 0.8),
      backdropFilter: "saturate(200%) blur(".concat((0, _pxToRem.default)(30), ")"),
      height: "calc(100vh - ".concat((0, _pxToRem.default)(32), ")"),
      margin: (0, _pxToRem.default)(16),
      borderRadius: borderRadius.xl,
      border: "none"
    },
    paperAnchorDockedLeft: {
      borderRight: "none"
    }
  }
};
var _default = sidenav;
exports.default = _default;