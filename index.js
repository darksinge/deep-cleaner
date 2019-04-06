/**
* deepCleaner.js :: Delete nested key-value pairs by a specified key 
*   or remove empty objects, empty strings, null, and undefined 
*   values from an object.
*/
'use strict';

const utils = require('./utils');

/**
 * cleanCyclicObject :: Removes any undefined, null, or empty strings, arrays, or objects from `obj`.
 *    Uses a `WeakMap` to keep track of objects that have been visited while recursively cleaning
 *    an object to prevent infinite recursive calls.
 * @param {Object} object :: the object to be cleaned
 * @param {?String} target :: Optional key to remove from `object`. If not specified, the default
 *    behavior is to remove "empty" values from `object`. A value is considered to be empty if it
 *    is one of the following: 
 *      - empty strings
 *      - empty arrays
 *      - empty objects
 *      - values that are null
 *      - values that are undefined
 */
function cleanCyclicObject(object, target=null) {

  const visitedObjects = new WeakMap(); // use a WeakMap to keep track of which objects have been visited

  function recursiveClean(obj) {
    
    // If `obj` is an actual object, check if it's been seen already.
    if (utils.isObject(obj)) {

      // If we've seen this object already, return to stop infinite loops
      if (visitedObjects.has(obj)) {
        return;
      }

      // If we haven't seen this object yet, add it to the list of visited objects.
      // Since 'obj' itself is used as the key, the value of 'objects[obj]' is 
      // irrelevent. I just went with using 'null'.
      visitedObjects.set(obj, null);

      for (var key in obj) {

        if (
          (target && key === target)              // Check if 'key' is the target to delete,
          || (!target && utils.isEmpty(obj[key])) // or if 'target' is unspecified but the object is "empty"
        ) {
          delete obj[key];
        } else {
          recursiveClean(obj[key]);
        }
      }


    // If 'obj' is an array, check it's elements for objects to clean up.
    } else if (utils.isArray(obj)) {
      for (var i in obj) {
        recursiveClean(obj[i]);
      }
    }
  }

  recursiveClean(object);
}

/**
 * removeKeyLoop :: does the same thing as `removeKey()` but with multiple keys.
 * @param {Object} obj :: the object being cleaned
 * @param {String|Array} keys :: an array containing keys to be cleaned from `obj`
 */
function removeKeyLoop(obj, keys) {
  for (var key of keys) {
    cleanCyclicObject(obj, key);
  }
}

/**
 * deepCleaner
 * 
 * @param {Object} obj :: the object being cleaned
 * @param {?String|?Array} target :: A string or array of strings of key(s) for key-value pair(s) to be cleaned from `obj`
 */
function deepCleaner(obj, target = null) {

  if (utils.isArray(target)) {
    removeKeyLoop(obj, target);
  } else {
    cleanCyclicObject(obj, target);
  }

  return obj;
}

module.exports = deepCleaner;
