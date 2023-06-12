"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _colors = _interopRequireDefault(require("../../theme/base/colors"));
var info = _colors.default.info,
  dark = _colors.default.dark;
var globals = {
  html: {
    scrollBehavior: "smooth"
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0
  },
  "a, a:link, a:visited": {
    textDecoration: "none !important"
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: "".concat(dark.main, " !important"),
    transition: "color 150ms ease-in !important"
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: "".concat(info.main, " !important")
  }
};
var _default = globals;
exports.default = _default;