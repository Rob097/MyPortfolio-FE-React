"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _breakpoints = _interopRequireDefault(require("../base/breakpoints"));
var _pxToRem = _interopRequireDefault(require("../functions/pxToRem"));
var _container;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _breakpoints$values = _breakpoints.default.values,
  sm = _breakpoints$values.sm,
  md = _breakpoints$values.md,
  lg = _breakpoints$values.lg,
  xl = _breakpoints$values.xl,
  xxl = _breakpoints$values.xxl;
var SM = "@media (min-width: ".concat(sm, "px)");
var MD = "@media (min-width: ".concat(md, "px)");
var LG = "@media (min-width: ".concat(lg, "px)");
var XL = "@media (min-width: ".concat(xl, "px)");
var XXL = "@media (min-width: ".concat(xxl, "px)");
var sharedClasses = {
  paddingRight: "".concat((0, _pxToRem.default)(24), " !important"),
  paddingLeft: "".concat((0, _pxToRem.default)(24), " !important"),
  marginRight: "auto !important",
  marginLeft: "auto !important",
  width: "100% !important",
  position: "relative"
};
var container = (_container = {}, (0, _defineProperty2.default)(_container, SM, {
  ".MuiContainer-root": _objectSpread(_objectSpread({}, sharedClasses), {}, {
    maxWidth: "540px !important"
  })
}), (0, _defineProperty2.default)(_container, MD, {
  ".MuiContainer-root": _objectSpread(_objectSpread({}, sharedClasses), {}, {
    maxWidth: "720px !important"
  })
}), (0, _defineProperty2.default)(_container, LG, {
  ".MuiContainer-root": _objectSpread(_objectSpread({}, sharedClasses), {}, {
    maxWidth: "960px !important"
  })
}), (0, _defineProperty2.default)(_container, XL, {
  ".MuiContainer-root": _objectSpread(_objectSpread({}, sharedClasses), {}, {
    maxWidth: "1140px !important"
  })
}), (0, _defineProperty2.default)(_container, XXL, {
  ".MuiContainer-root": _objectSpread(_objectSpread({}, sharedClasses), {}, {
    maxWidth: "1320px !important"
  })
}), _container);
var _default = container;
exports.default = _default;