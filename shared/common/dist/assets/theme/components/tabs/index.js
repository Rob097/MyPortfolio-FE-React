"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../base/colors"));
var _borders = _interopRequireDefault(require("../../base/borders"));
var _boxShadows = _interopRequireDefault(require("../../base/boxShadows"));
var _pxToRem = _interopRequireDefault(require("../../functions/pxToRem"));
var grey = _colors.default.grey,
  white = _colors.default.white;
var borderRadius = _borders.default.borderRadius;
var tabsBoxShadow = _boxShadows.default.tabsBoxShadow;
var tabs = {
  styleOverrides: {
    root: {
      position: "relative",
      backgroundColor: grey[100],
      borderRadius: borderRadius.lg,
      minHeight: "unset",
      padding: (0, _pxToRem.default)(4)
    },
    flexContainer: {
      height: "100%",
      position: "relative",
      zIndex: 10
    },
    fixed: {
      overflow: "unset !important",
      overflowX: "unset !important"
    },
    vertical: {
      "& .MuiTabs-indicator": {
        width: "100%"
      }
    },
    indicator: {
      height: "100%",
      borderRadius: borderRadius.md,
      backgroundColor: white.main,
      boxShadow: tabsBoxShadow.indicator,
      transition: "all 500ms ease"
    }
  }
};
var _default = tabs;
exports.default = _default;