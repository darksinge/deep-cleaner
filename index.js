/**
 * deepCleaner.js - delete nested key value pairs on an object.
 */

/**
 * 
 * @param {String} removeKey - name of the key to be recursively deleted from object
 * @param {Object} obj - the object being cleaned
 */
module.exports = function (removeKey, obj) {
  function deepCleaner(obj) {
    Object.keys(obj).forEach(function (key) {
      (key === removeKey && delete obj[key]) || (obj[key] && typeof obj[key] === 'object') && deepClean(obj[key])
    });
    return obj;
  }
  return deepCleaner(obj);
}