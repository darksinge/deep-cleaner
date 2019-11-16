/**
 * utils.js  contains helper functions that are used for deep-cleaner.
 */
'use strict'

/**
 * Gets the string representation of `arg`
 * @param {Any} arg  unknown function argument
 * @returns {String}  a string representation of `arg`
 */
const repr = (arg) => {
  return Object.prototype.toString.call(arg)
}

/**
 * Checks if the argument is an array
 * @param {Any} arg  unknown function argument
 * @returns {Boolean}  returns true if `arg` is an Array, false otherwise
 */
const isArray = (arg) => {
  return Array.isArray ? Array.isArray(arg) : repr(arg) === '[object Array]'
}

/**
 * Checks if the argument is an object.
 * @param {Any} arg  unknown function argument
 * @returns {Boolean}  returns true if `arg` is an object.
 */
const isObject = (arg) => {
  return repr(arg) === '[object Object]'
}

/**
 * Checks if the argument is a string.
 * @param {Any} arg  unknown function argument
 * @returns {Boolean}  returns true if `arg` is a String, false otherwise
*/
const isString = (arg) => {
  return repr(arg) === '[object String]'
}

/**
 * Checks if the argument is null.
 * @param {Any} arg  unknown function argument
 * @returns {Boolean}  returns true if `arg` is of type Null, false otherwise
 */
const isNull = (arg) => {
  return repr(arg) === '[object Null]'
}

/**
 * Checks if the argument is undefined.
 * @param {Any} arg  unknown function argument
 * @returns {Boolean}  Returns true if `arg` is of type Undefined, false otherwise
 */
const isUndefined = (arg) => {
  return repr(arg) === '[object Undefined]'
}

/**
 * Checks if the argument is an empty string, array, or object.
 *
 * @param {Any} arg  unknown function argument
 * @returns {Boolean}  Returns true if `arg` is an empty string,
 *  array, or object. Also returns true is `arg` is null or
 *  undefined. Returns true otherwise.
 */
const isEmpty = (arg) => {
  return (
    isUndefined(arg) ||
          isNull(arg) ||
          (isString(arg) && arg.length === 0) ||
          (isArray(arg) && arg.length === 0) ||
          (isObject(arg) && Object.keys(arg).length === 0)
  )
}

module.exports = {
  repr,
  isArray,
  isObject,
  isString,
  isNull,
  isUndefined,
  isEmpty
}
