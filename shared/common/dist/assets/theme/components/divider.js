"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../base/colors"));
var _rgba = _interopRequireDefault(require("../functions/rgba"));
var _pxToRem = _interopRequireDefault(require("../functions/pxToRem"));
var dark = _colors.default.dark,
  transparent = _colors.default.transparent,
  white = _colors.default.white;
var divider = {
  styleOverrides: {
    root: {
      backgroundColor: transparent.main,
      backgroundImage: "linear-gradient(to right, ".concat((0, _rgba.default)(dark.main, 0), ", ").concat((0, _rgba.default)(dark.main, 0.5), ", ").concat((0, _rgba.default)(dark.main, 0), ") !important"),
      height: (0, _pxToRem.default)(1),
      margin: "".concat((0, _pxToRem.default)(16), " 0"),
      borderBottom: "none",
      opacity: 0.25
    },
    vertical: {
      backgroundColor: transparent.main,
      backgroundImage: "linear-gradient(to bottom, ".concat((0, _rgba.default)(dark.main, 0), ", ").concat((0, _rgba.default)(dark.main, 0.5), ", ").concat((0, _rgba.default)(dark.main, 0), ") !important"),
      width: (0, _pxToRem.default)(1),
      height: "100%",
      margin: "0 ".concat((0, _pxToRem.default)(16)),
      borderRight: "none"
    },
    light: {
      backgroundColor: transparent.main,
      backgroundImage: "linear-gradient(to right, ".concat((0, _rgba.default)(white.main, 0), ", ").concat((0, _rgba.default)(white.main, 0.5), ", ").concat((0, _rgba.default)(white.main, 0), ") !important"),
      "&.MuiDivider-vertical": {
        backgroundImage: "linear-gradient(to bottom, ".concat((0, _rgba.default)(white.main, 0), ", ").concat((0, _rgba.default)(white.main, 0.5), ", ").concat((0, _rgba.default)(white.main, 0), ") !important")
      }
    }
  }
};
var _default = divider;
exports.default = _default;