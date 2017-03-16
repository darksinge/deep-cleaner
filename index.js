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

function recursiveClean(obj) {
    Object.keys(obj).forEach(function (key) {
      (objIsEmpty(obj[key]) && delete obj[key]) || (obj[key] && typeof obj[key] === 'object') && recursiveClean(obj[key])
    });
    return obj;
  }

function objIsEmpty(obj) {
  if (typeof obj === 'undefined' || obj == null) return true;
  if (obj === "") return true;
  if (obj == {} || obj == []) return true; 
  if (typeof obj != 'object') return false;
  return Object.keys(obj).length == 0;
}

module.exports = function(obj, key) {
  if (Array.isArray(key)) {
    for (var i = 0; i < key.length; i++) {
      removeKey(obj, key[i]);
    }
    return;
  }
  return typeof key === 'undefined' ? recursiveClean(obj) : removeKey(obj, key);
}