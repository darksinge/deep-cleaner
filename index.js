/**
* deepCleaner.js - Delete nested key, value pairs on an object with a provided key, empty objects, empty strings, null, and undefined values
*/

'use strict';

var _ = require('lodash');

module.exports = function(obj, removeKey) {
  function clean(obj, removeKey) {
    Object.keys(obj).forEach(function(key) {
      (key === removeKey && obj[key].length === 0) && delete obj[key] ||
      (obj[key] && typeof obj[key] === 'object') && clean(obj[key], removeKey);
    });
    return obj;
  }
}
