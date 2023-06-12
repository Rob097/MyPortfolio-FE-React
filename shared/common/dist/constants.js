"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROLES = exports.PERMISSIONS = exports.METHODS = void 0;
/** AUTHENTICATION */
var ROLES = {
  ROLE_BASIC: "ROLE_BASIC",
  ROLE_ADMIN: "ROLE_ADMIN"
};
exports.ROLES = ROLES;
var PERMISSIONS = {
  USERS_READ: "users_read" // Permette di leggere i dati degli utenti
};

/** GLOBAL */
exports.PERMISSIONS = PERMISSIONS;
var METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH"
};
exports.METHODS = METHODS;