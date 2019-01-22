/**
* deepCleaner.js - Delete nested key, value pairs on an object with a provided key, empty objects, empty strings, null, and undefined values
*/

'use strict';

/**
 * toString
 * @param {*} arg :: unknown function argument
 * @returns {String} :: a string representation of `arg`
 */
var toString = (arg) => Object.prototype.toString.call(arg);

/**
 * isArray
 * @param {*} arg :: unknown function argument
 * @returns {Boolean} :: returns true if `arg` is an Array, false otherwise
 */
var isArray = (arg) => Array.isArray ? Array.isArray(arg) : toString(arg) === '[object Array]';

/**
 * isStrictObject
 * @param {*} arg :: unknown function argument
 * @returns {Boolean} :: returns true if `arg` is strictly an Object (i.e. of species `{}`), false otherwise
 */
var isStrictObject = (arg) => toString(arg) === '[object Object]';

/**
 * 
 * @param {*} arg :: unknown function argument
 * @returns {Boolean} :: returns true if `arg` is an object.
 */
var isObject = (arg) => typeof arg === 'object';

/**
 * isString
 * @param {*} arg :: unknown function argument
 * @returns {Boolean} :: returns true if `arg` is a String, false otherwise
 */
var isString = (arg) => toString(arg) === '[object String]';

/**
 * isNull
 * @param {*} arg :: unknown function argument
 * @returns {Boolean} :: returns true if `arg` is of type Null, false otherwise
 */
var isNull = (arg) => toString(arg) === '[object Null]';

/**
 * isUndefined
 * @param {*} arg :: unknown function argument
 * @returns {Boolean} :: returns true if `arg` is of type Undefined, false otherwise
 */
var isUndefined = (arg) => toString(arg) === '[object Undefined]';

/**
 * isEmptyTarget
 * @param {*} o :: unknown function argument
 * @returns {Boolean} :: returns true if `o` is a null, undefined, or an empty string, array, or object. Returns false if `o` is a not null, not undefined, or is not of type String, Array, or an Object of species `{}`.
 */
var isEmptyTarget = (o) => isNull(o) || isUndefined(o) || (isString(o) && o.length === 0) || (isObject(o) && Object.keys(o).length === 0);

/**
 * 
 * @param {Array} o :: an array being processed
 * @param {Number} i :: the index being removed from `o`
 */
var removeElement = (o, i) => o.splice(1, (i - 0));

/**
 * 
 * @param {Object} o :: the object being cleaned
 * @param {String|Number} key :: the key or index to be cleaned from `o`
 */
function removeKey(o, key) {
  isObject(o) && Object.keys(o).forEach(function (k) {
    (k === key) && delete o[k] ||
      (o[k] && isObject(o[k]) && removeKey(o[k], key))
  });
  return o;
}

/**
 * recursiveClean :: recursively removes any undefined, null, or empty strings, arrays, or objects from `o`
 * @param {Object} o :: the object to be cleaned
 */
function recursiveClean(o) {
  isObject(o)
    &&
    Object.keys(o).forEach(function (k) {
      (isEmptyTarget(o[k]) && ((isArray(o) && removeElement(o, k)) || delete o[k])) ||
        (o[k] && !isNaN(o[k]) && isObject(o[k]) && recursiveClean(o[k]))
    });
  return o;
}

/**
 * 
 * @param {Object} obj :: the object being cleaned
 * @param {String|Array} keys :: an array containing keys to be cleaned from `obj`
 */
var removeKeyLoop = (obj, keys) => { while(keys.length > 0) removeKey(obj, keys.pop()); }

/**
 * deepCleaner
 * 
 * @param {Object} obj :: the object being cleaned
 * @param {String|Array} target :: A string or array of strings of key(s) for key-value pair(s) to be cleaned from `obj`
 */
function deepCleaner(obj, target) {
  isArray(target) ? removeKeyLoop(obj, target) : isUndefined(target) ? recursiveClean(obj) : removeKey(obj, target);
}

module.exports = deepCleaner;