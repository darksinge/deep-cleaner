/**
 * utils.js :: contains helper functions that are used for deep-cleaner.
 */
'use strict';

module.exports = {

    /**
     * repr :: gets the string representation of `arg`
     * @param {} arg :: unknown function argument
     * @returns {String} :: a string representation of `arg`
     */
    repr: function(arg) {
        return Object.prototype.toString.call(arg);
    },

    /**
     * isArray
     * @param {} arg :: unknown function argument
     * @returns {Boolean} :: returns true if `arg` is an Array, false otherwise
     */
    isArray: function(arg) {
        return Array.isArray ? Array.isArray(arg) : this.repr(arg) === '[object Array]';
    },

    /**
     * isObject :: checks if `arg` is an object.
     * @param {} arg :: unknown function argument
     * @returns {Boolean} :: returns true if `arg` is an object.
     */
    isObject: function(arg) {
        return this.repr(arg) === '[object Object]';
    },

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
    isTruthyish: function(arg) {
        if (arg === false) {
            return false;
        }
        return !(this.isNull(arg) || this.isUndefined(arg));
    },

    /**
     * isString :: checks if `arg` is a string.
     * @param {} arg :: unknown function argument
     * @returns {Boolean} :: returns true if `arg` is a String, false otherwise
    */
    isString: function(arg) {
        return this.repr(arg) === '[object String]';
    },

    /**
     * isNull :: checks if `arg` is null.
     * @param {} arg :: unknown function argument
     * @returns {Boolean} :: returns true if `arg` is of type Null, false otherwise
     */
    isNull: function(arg) {
        return this.repr(arg) === '[object Null]';
    },

    /**
     * isUndefined :: checks if `arg` is undefined.
     * @param {} arg :: unknown function argument
     * @returns {Boolean} :: Returns true if `arg` is of type Undefined, false otherwise
     */
    isUndefined: function(arg) {
        try {
            return typeof(arg) === 'undefined';
        } catch (e) {
            if (e instanceof ReferenceError) {
                return true;
            }

            throw e;
        }
    },

    /**
     * isEmpty :: Checks if `arg` is an empty string, array, or object.
     * 
     * @param {} arg :: unknown function argument
     * @returns {Boolean} :: Returns true if `arg` is an empty string, 
     *  array, or object. Also returns true is `arg` is null or 
     *  undefined. Returns true otherwise.
     */
    isEmpty: function(arg) {
        return (
            this.isUndefined(arg)
            || this.isNull(arg)
            || (this.isString(arg) && arg.length === 0)
            || (this.isArray(arg) && arg.length === 0)
            || (this.isObject(arg) && Object.keys(arg).length === 0)
        );
    },

};
