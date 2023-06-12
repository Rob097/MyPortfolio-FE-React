"use strict";

var path = require('path');
var fs = require('fs');
var dotenv = require('dotenv');
module.exports = function getEnvironmentKeys(environment) {
  // Get the root path (assuming your webpack config is in the root of your project!)
  var currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  var basePath = currentPath + '/.env';

  // We're concatenating the environment name to our filename to specify the correct env file!
  var envPath = basePath + '.' + environment;

  // Check if the file exists, otherwise fall back to the production .env
  var finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  var fileEnv = dotenv.config({
    path: finalPath
  }).parsed;

  // reduce it to a nice object, the same as before
  var envKeys = Object.keys(fileEnv).reduce(function (prev, next) {
    prev["process.env.".concat(next)] = fileEnv[next];
    if (fileEnv[next] === 'true' || fileEnv[next] === 'false') {
      prev["process.env.".concat(next)] = fileEnv[next] === 'true';
    } else if (fileEnv[next].includes(":")) {
      prev["process.env.".concat(next)] = JSON.stringify(fileEnv[next]);
    }
    return prev;
  }, {});
  return envKeys;
};