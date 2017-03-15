/**
* deepCleaner.js - Delete nested key, value pairs on an object with a provided key, empty objects, empty strings, null, and undefined values
*/

'use strict';

var _ = require('lodash');

var Cleaner = function() {};

Cleaner.prototype = Object.create(Object.prototype, {
  constructor: Cleaner,
  _removeKey: null,
  _removeValue: null,

  removeKey: function(obj) {
    _.forEach(obj, function (key) {
      (key === this._removeKey && delete obj[key]) || (obj[key] && typeof obj[key] === 'object') && this.clean(obj[key]);
    });
    return obj;
  },

  removeValue: function(obj) {
    _.forEach(val, function(value, key) {
      (obj[this._removeValue] == value && delete obj[this._removeValue] || obj[key] === 'object') && this.removeValue(obj[key])
    });
    return obj;
  },

  removeEmpty = function(obj) {
    _.forEach(obj, function(value, key) {
      if (typeof value === 'undefined') value = null;
      if (value === null) {
        delete obj[key];
      }
      if (Array.isArray(value) && value.length === 0) {
        delete obj[key];
      }
      if (JSON.stringify(value) == "{}") {
        delete obj[key]
      }
      if (value === "") {
        delete obj[key];
      }
      this.removeEmpty(obj);
    });
    return obj;
  }

});

module.exports = {
  clean: function(obj, opts) {
    var cleaner = new Cleaner();
    
    opts instanceof String ? cleaner._removeKey = opts : cleaner._removeKey = opts.removeKey || null;    
    
    if (cleaner._removeKey) {
      cleaner.removeKey(obj);
    }
    
    if (opts.removeValue) {
      cleaner._removeValue = opts.removeValue;
      cleaner.removeValue(obj);
    }
    
    if (opts.cleanArrays) cleaner.removeEmpty([])
    
    if (opts.cleanObjects) cleaner.cleanObjects = opts.cleanObjects;
    if (opts.cleanStrings) cleaner.cleanStrings = opts.cleanStrings;
    if (opts.cloneObject) cleaner.cloneObject = opts.cloneObject;
    
    return obj;
  }
};