"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageNotFound = exports.NotAllowed = exports.ErrorPage = void 0;
var _reactRouterDom = require("react-router-dom");
var _jsxRuntime = require("react/jsx-runtime");
var ErrorPage = function ErrorPage() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
      role: "alert",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: "An error occured"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: "An error occured inside the page"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
        to: "/",
        children: "Home Page"
      })]
    })
  });
};
exports.ErrorPage = ErrorPage;
var PageNotFound = function PageNotFound() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("main", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
        children: "An error occured"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: "Could not find this page"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Link, {
        to: "/",
        children: "Home Page"
      })]
    })
  });
};
exports.PageNotFound = PageNotFound;
var NotAllowed = function NotAllowed() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
    children: "You are not allowed to visit this page."
  });
};
exports.NotAllowed = NotAllowed;