const cleaner = require('../index')

describe('index.js', () => {
  describe('#deepCleaner()', () => {
    it('should delete values on an Object that are null, undefined, or an empty string, array, or object', () => {
      const obj = {
        notEmptyString: 'string',
        emptyString: '',
        notEmptyArray: [1, 2, 3],
        emptyArray: [],
        arrayWithEmptyObjects: [{}, '', null, undefined, []],
        arrayWithMixedObjects: [{}, { a: 'a' }, '', 'foo', null, true, undefined, false, [], [1, 2, 3]],
        notEmptyObject: { aKey: 'a value' },
        emptyObject: {},
        objectWithEmptyObject: { aReallyEmptyObject: {} },
        thisIsTrue: true,
        thisIsFalse: false,
        thisIsNull: null,
        thisIsUndefined: undefined,
        not_a_number: NaN,
        dirty: 'value'
      }

      cleaner(obj)

      expect(obj.notEmptyString).toBeDefined()
      expect(obj.notEmptyArray).toBeDefined()
      expect(obj.notEmptyObject).toBeDefined()
      expect(obj.thisIsTrue).toBeDefined()
      expect(obj.thisIsFalse).toBeDefined()
      expect(obj.not_a_number).toBeDefined()
      expect(obj.dirty).toBeDefined()
      expect(obj.arrayWithMixedObjects).toBeDefined()
      expect(obj.arrayWithMixedObjects).toEqual([{ a: 'a' }, 'foo', true, false, [1, 2, 3]])

      expect(obj.objectWithEmptyObject).toBeUndefined()
      expect(obj.arrayWithEmptyObjects).toBeUndefined()
      expect(obj.emptyString).toBeUndefined()
      expect(obj.emptyArray).toBeUndefined()
      expect(obj.emptyObject).toBeUndefined()
      expect(obj.thisIsNull).toBeUndefined()
      expect(obj.thisIsUndefined).toBeUndefined()
    })

    it('should delete nested key-value pairs where key equals `dirty`', () => {
      const actual = {
        dirty: 'value',
        A: {
          dirty: 'value',
          clean: 'value',
          emptyNull: null,
          emptyUndefined: undefined,
          emptyArray: [],
          emptyObject: {},
          a: {
            dirty: 'value'
          }
        },
        B: [
          {
            dirty: 'value',
            clean: 'value',
            a: {
              dirty: 'value',
              clean: 'value'
            }
          }
        ]
      }

      cleaner(actual, 'dirty')
      expect(actual).toEqual({
        A: {
          clean: 'value',
          emptyNull: null,
          emptyUndefined: undefined,
          emptyArray: [],
          emptyObject: {},
          a: {}
        },
        B: [{
          clean: 'value',
          a: { clean: 'value' }
        }]
      })
    })

    it('should recursively remove keys `b`, and `c`', () => {
      const actual = {
        A: {
          a: 'value',
          b: 'value',
          c: {
            a: 'value',
            b: 'value',
            c: 'value'
          }
        },
        B: [
          {
            a: 'value',
            b: 'value',
            c: 'value'
          },
          [
            {
              a: 'value',
              b: 'value',
              c: 'value'
            },
            {
              a: 'value',
              b: 'value',
              c: 'value'
            }
          ]
        ]
      }

      const expected = {
        A: {
          a: 'value'
        },
        B: [
          { a: 'value' },
          [
            { a: 'value' },
            { a: 'value' }
          ]
        ]
      }

      cleaner(actual, ['b', 'c'])
      expect(actual).toEqual(expected)
    })

    it('should clean an object with a circular reference ', () => {
      const actual = {
        recursiveDefinition: null,
        foo: [],
        bar: [1, 2, 3],
        baz: {
          anotherRecursion: null
        },
        grault: null,
        plugh: undefined,
        qux: ''
      }
      actual.recursiveDefinition = actual
      actual.baz.anotherRecursion = actual

      const expected = {
        recursiveDefinition: null,
        bar: [1, 2, 3],
        baz: {
          anotherRecursion: null
        }
      }
      expected.recursiveDefinition = expected
      expected.baz.anotherRecursion = expected

      cleaner(actual)
      expect(actual).toEqual(expected)
    })

    it('should clean a key from an object with a circular reference', () => {
      const actual = {
        recursiveDefinition: this
      }

      cleaner(actual, 'recursiveDefinition')
      expect(actual).toEqual({})
    })

    it('should clean an array of keys from an object with a circular reference', () => {
      const actual = {
        recursiveDefinition: null,
        foo: [],
        bar: [1, 2, 3, null],
        baz: {
          anotherRecursion: null
        },
        grault: {
          plugh: null
        }
      }

      actual.recursiveDefinition = actual
      actual.baz.anotherRecursion = actual
      actual.grault.plugh = actual

      const expected = {
        bar: [1, 2, 3, null],
        grault: { plugh: null }
      }
      expected.grault.plugh = expected

      cleaner(actual, ['foo', 'baz', 'recursiveDefinition'])
      expect(actual).toEqual(expected)
    })

    it('should be an empty object', () => {
      const actual = {
        foo: null
      }

      actual.foo = actual

      cleaner(actual, 'foo')
      expect(actual).toEqual({})
    })
  })
})

const obj = {
  a: {
    dirty:'toclean'
  }
}

clean(obj,'dirty')