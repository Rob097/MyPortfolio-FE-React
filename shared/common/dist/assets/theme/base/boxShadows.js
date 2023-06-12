"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../theme/base/colors"));
var _boxShadow = _interopRequireDefault(require("../../theme/functions/boxShadow"));
var black = _colors.default.black,
  white = _colors.default.white,
  info = _colors.default.info,
  inputColors = _colors.default.inputColors,
  tabs = _colors.default.tabs;
var boxShadows = {
  xs: (0, _boxShadow.default)([0, 2], [9, -5], black.main, 0.15),
  sm: (0, _boxShadow.default)([0, 5], [10, 0], black.main, 0.12),
  md: "".concat((0, _boxShadow.default)([0, 4], [6, -1], black.light, 0.12), ", ").concat((0, _boxShadow.default)([0, 2], [4, -1], black.light, 0.07)),
  lg: "".concat((0, _boxShadow.default)([0, 8], [26, -4], black.light, 0.15), ", ").concat((0, _boxShadow.default)([0, 8], [9, -5], black.light, 0.06)),
  xl: (0, _boxShadow.default)([0, 23], [45, -11], black.light, 0.25),
  xxl: (0, _boxShadow.default)([0, 20], [27, 0], black.main, 0.05),
  inset: (0, _boxShadow.default)([0, 1], [2, 0], black.main, 0.075, "inset"),
  navbarBoxShadow: "".concat((0, _boxShadow.default)([0, 0], [1, 1], white.main, 0.9, "inset"), ", ").concat((0, _boxShadow.default)([0, 20], [27, 0], black.main, 0.05)),
  buttonBoxShadow: {
    main: "".concat((0, _boxShadow.default)([0, 4], [7, -1], black.main, 0.11), ", ").concat((0, _boxShadow.default)([0, 2], [4, -1], black.main, 0.07)),
    stateOf: "".concat((0, _boxShadow.default)([0, 3], [5, -1], black.main, 0.09), ", ").concat((0, _boxShadow.default)([0, 2], [5, -1], black.main, 0.07)),
    stateOfNotHover: (0, _boxShadow.default)([0, 0], [0, 3.2], info.main, 0.5)
  },
  inputBoxShadow: {
    focus: (0, _boxShadow.default)([0, 0], [0, 2], inputColors.boxShadow, 1),
    error: (0, _boxShadow.default)([0, 0], [0, 2], inputColors.error, 0.6),
    success: (0, _boxShadow.default)([0, 0], [0, 2], inputColors.success, 0.6)
  },
  sliderBoxShadow: {
    thumb: (0, _boxShadow.default)([0, 1], [13, 0], black.main, 0.2)
  },
  tabsBoxShadow: {
    indicator: (0, _boxShadow.default)([0, 1], [5, 1], tabs.indicator.boxShadow, 1)
  }
};
var _default = boxShadows;
exports.default = _default;