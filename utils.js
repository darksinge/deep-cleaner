/**
 * utils.js :: contains helper functions that are used for deep-cleaner.
 */
'use strict'

/**
 * repr :: gets the string representation of `arg`
 * @param {} arg :: unknown function argument
 * @returns {String} :: a string representation of `arg`
 */
const repr = (arg) => {
  return Object.prototype.toString.call(arg)
}

/**
 * isArray
 * @param {} arg :: unknown function argument
 * @returns {Boolean} :: returns true if `arg` is an Array, false otherwise
 */
const isArray = (arg) => {
  return Array.isArray ? Array.isArray(arg) : repr(arg) === '[object Array]'
}

/**
 * isObject :: checks if `arg` is an object.
 * @param {} arg :: unknown function argument
 * @returns {Boolean} :: returns true if `arg` is an object.
 */
const isObject = (arg) => {
  return repr(arg) === '[object Object]'
}

/**
 * isTruthyish :: checks if `arg` is not null or undefined.
 *
 * for example, statements like `!""`, `!0`, `!null`, or `!undefined`
 *  evaluate to `true`. However, sometimes deep-cleaner is only interested
 *  if something is null or undefined, so `isTruthyish("")` and
 *  `isTruthyish(0)` evaluate to `true`, while `isTruthyish(null)` and
 *  `isTruthyish(undefined)` still evaluate to `false`.
 *
 * @param {} arg :: unknown function argument.
 * @returns {Boolean}
 */
const isTruthyish = (arg) => {
  if (arg === false) {
    return false
  }
  return !(isNull(arg) || isUndefined(arg))
}

/**
 * isString :: checks if `arg` is a string.
 * @param {} arg :: unknown function argument
 * @returns {Boolean} :: returns true if `arg` is a String, false otherwise
*/
const isString = (arg) => {
  return repr(arg) === '[object String]'
}

/**
 * isNull :: checks if `arg` is null.
 * @param {} arg :: unknown function argument
 * @returns {Boolean} :: returns true if `arg` is of type Null, false otherwise
 */
const isNull = (arg) => {
  return repr(arg) === '[object Null]'
}

/**
 * isUndefined :: checks if `arg` is undefined.
 * @param {} arg :: unknown function argument
 * @returns {Boolean} :: Returns true if `arg` is of type Undefined, false otherwise
 */
const isUndefined = (arg) => {
  return repr(arg) === '[object Undefined]'
}

/**
 * isEmpty :: Checks if `arg` is an empty string, array, or object.
 *
 * @param {} arg :: unknown function argument
 * @returns {Boolean} :: Returns true if `arg` is an empty string,
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
  isTruthyish,
  isString,
  isNull,
  isUndefined,
  isEmpty
}
