const utils = require('../utils')

describe('utils.js', () => {
  describe('#isArray()', () => {
    it('should return true', () => {
      expect(utils.isArray([])).toBe(true)
    })

    it('should return false', () => {
      expect(utils.isArray(null)).toBe(false)
      expect(utils.isArray(undefined)).toBe(false)
      expect(utils.isArray('this is not an array')).toBe(false)
      expect(utils.isArray(0)).toBe(false)
      expect(utils.isArray({})).toBe(false)
    })
  })

  describe('#isObject()', () => {
    it('should return true', () => {
      expect(utils.isObject({})).toBe(true)
      
    })

    it('should return false', () => {
      expect(utils.isObject(0)).toBe(false)
      expect(utils.isObject('asdf')).toBe(false)
      expect(utils.isObject([])).toBe(false)
      expect(utils.isObject(null)).toBe(false)
      expect(utils.isObject(undefined)).toBe(false)
    })
  })

  describe('#isString()', () => {
    it('should return true', () => {
      expect(utils.isString('')).toBe(true)
      expect(utils.isString('asdf')).toBe(true)
    })

    it('should return false', () => {
      expect(utils.isString({})).toBe(false)
      expect(utils.isString(0)).toBe(false)
      expect(utils.isString([])).toBe(false)
      expect(utils.isString(null)).toBe(false)
      expect(utils.isString(undefined)).toBe(false)
    })
  })

  describe('#isNull()', () => {
    it('should return true', () => {
      expect(utils.isNull(null)).toBe(true)
    })

    it('should return false', () => {
      expect(utils.isNull({})).toBe(false)
      expect(utils.isNull(0)).toBe(false)
      expect(utils.isNull([])).toBe(false)
      expect(utils.isNull('null')).toBe(false)
      expect(utils.isNull(undefined)).toBe(false)
      expect(utils.isNull()).toBe(false)
    })
  })

  describe('#isUndefined()', () => {
    it('should return true', () => {
      expect(utils.isUndefined(undefined)).toBe(true)
      expect(utils.isUndefined()).toBe(true)
    })

    it('should return false', () => {
      expect(utils.isUndefined({})).toBe(false)
      expect(utils.isUndefined(0)).toBe(false)
      expect(utils.isUndefined([])).toBe(false)
      expect(utils.isUndefined('null')).toBe(false)
    })
  })

  describe('#isEmpty()', () => {
    it('should return true', () => {
      expect(utils.isEmpty({})).toBe(true)
      expect(utils.isEmpty('')).toBe(true)
      expect(utils.isEmpty([])).toBe(true)
      expect(utils.isEmpty(null)).toBe(true)
      expect(utils.isEmpty(undefined)).toBe(true)
      expect(utils.isEmpty()).toBe(true)
    })

    it('should return false', () => {
      expect(utils.isEmpty(0)).toBe(false)
      expect(utils.isEmpty({ foo: 'bar' })).toBe(false)
      expect(utils.isEmpty('a non-empty string')).toBe(false)
      expect(utils.isEmpty(['a', 'non', 'empty', 'array'])).toBe(false)
    })
  })

  describe('#isTruthyish()', () => {
    it('should return true', () => {
      expect(utils.isTruthyish(true)).toBe(true)
      expect(utils.isTruthyish('')).toBe(true)
      expect(utils.isTruthyish('asdf')).toBe(true)
      expect(utils.isTruthyish([])).toBe(true)
      expect(utils.isTruthyish({})).toBe(true)
      expect(utils.isTruthyish(0)).toBe(true)
      expect(utils.isTruthyish(9999)).toBe(true)
    })

    it('should return false', () => {
      expect(utils.isTruthyish(null)).toBe(false)
      expect(utils.isTruthyish(undefined)).toBe(false)
      expect(utils.isTruthyish(false)).toBe(false)
    })
  })

  describe('#repr()', () => {
    it('should get the verbose string representation of an object', () => {
      expect(utils.repr({})).toEqual('[object Object]')
      expect(utils.repr([])).toEqual('[object Array]')
      expect(utils.repr('asdf')).toEqual('[object String]')
      expect(utils.repr(999)).toEqual('[object Number]')
      expect(utils.repr(null)).toEqual('[object Null]')
      expect(utils.repr(undefined)).toEqual('[object Undefined]')
    })
  })
})
