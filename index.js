/**
* deepCleaner.js - Delete nested key, value pairs on an object with a provided key, empty objects, empty strings, null, and undefined values
*/

'use strict';

function removeKey(obj, key) {
  var o = obj;
  Object.keys(o).forEach(function(_key) {
    ((_key === key || typeof o[_key] != 'undefined' && o[_key] != null && o[_key].length === 0) && delete o[_key]) || 
    (o[_key] && typeof o[_key] === 'object' && removeKey(o[_key], key))
  });
  return obj;
}

module.exports = removeKey;

// function clean(obj, removeKey) {
//   Object.keys(obj).forEach(function(key) {
//     (key === removeKey && obj[key].length === 0) && delete obj[key] ||
//     (obj[key] && typeof obj[key] === 'object') && clean(obj[key], removeKey);
//   });
//   return obj;
// }