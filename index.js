/**
 * deepCleaner.js - Delete nested key, value pairs on an object with a provided key, empty objects, empty strings, null, and undefined values
 */

'use strict';

var _ = require('lodash');

var Cleaner = function () { }

Cleaner.prototype.clean = function (obj) {
  Object.keys(obj).forEach(function (key) {
    console.log('key: ' + this.removeKey);
    (key === this.removeKey && delete obj[key]) || (obj[key] && typeof obj[key] === 'object') && this.clean(obj[key])
  });
  return obj;
}

Cleaner.prototype.create = function (opts) {
  if (opts instanceof String) {
    this.removeKey = opts;
    opts = {};
  } else {
    this.removeKey = opts.removeKey || null;
  }
  this.cleanArrays = opts.cleanArrays || true;
  this.cleanObjects = opts.cleanObjects || true;
  this.cleanStrings = opts.cleanStrings || true;
  this.cloneObject = opts.cloneObject || false;

  
}

module.exports = Cleaner;