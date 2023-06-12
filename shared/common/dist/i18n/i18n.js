"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _i18next = _interopRequireDefault(require("i18next"));
var _reactI18next = require("react-i18next");
var _en = _interopRequireDefault(require("./en.json"));
var _it = _interopRequireDefault(require("./it.json"));
var resources = {
  en: {
    common: _en.default
  },
  it: {
    common: _it.default
  }
};
_i18next.default.use(_reactI18next.initReactI18next).init({
  resources: resources,
  fallbackLng: "en",
  lng: localStorage.getItem('lang'),
  // language to use
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
var _default = _i18next.default;
exports.default = _default;