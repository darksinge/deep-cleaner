import { clean, cleanBy } from './clean'
import { expect, should } from 'chai'

describe('clean.ts', () => {
  describe('#clean()', () => {
    it('should delete values on an Object that are falsey, an empty string, empty array, or empty object', (done) => {
      const obj = {
        nonEmptyString: 'string',
        emptyString: '',
        nonEmptyArray: [1, 2, 3],
        emptyArray: [],
        nonEmptyObject: { aKey: 'a value' },
        emptyObject: {},
        thisIsTrue: true,
        thisIsFalse: false,
        thisIsNull: null,
        thisIsUndefined: undefined,
        not_a_number: NaN,
        dirty: 'value',
      }

      clean(obj)

      should().exist(obj.nonEmptyString)
      should().exist(obj.nonEmptyArray)
      should().exist(obj.nonEmptyObject)
      should().exist(obj.thisIsTrue)
      should().exist(obj.thisIsFalse)
      should().exist(obj.not_a_number)
      should().exist(obj.dirty)

      should().not.exist(obj.emptyString)
      should().not.exist(obj.emptyArray)
      should().not.exist(obj.emptyObject)
      should().not.exist(obj.thisIsNull)
      should().not.exist(obj.thisIsUndefined)

      done()
    })

    it('should clean an object with a circular reference ', (done) => {
      const actual: any = {
        recursiveDefinition: null,
        foo: [],
        bar: [1, 2, 3],
        baz: {
          anotherRecursion: null,
        },
        grault: null,
        plugh: undefined,
        qux: '',
      }
      actual.recursiveDefinition = actual
      actual.baz.anotherRecursion = actual

      const expected: any = {
        recursiveDefinition: null,
        bar: [1, 2, 3],
        baz: {
          anotherRecursion: null,
        },
      }
      expected.recursiveDefinition = expected
      expected.baz.anotherRecursion = expected

      clean(actual)
      expect(actual).to.deep.equal(expected)
      done()
    })
  })

  describe('#cleanBy()', () => {
    it('should delete nested key-value pairs where key equals `dirty`', (done) => {
      const actual = {
        dirty: 'value',
        A: {
          dirty: 'value',
          clean: 'value',
          thisIsNull: null,
          thisIsUndefined: undefined,
          emptyArray: [],
          emptyObject: {},
          a: {
            dirty: 'value',
          },
        },
        B: [
          {
            dirty: 'value',
            clean: 'value',
            a: {
              dirty: 'value',
              clean: 'value',
            },
          },
        ],
      }

      cleanBy(actual, 'dirty')
      expect(actual).to.deep.equal({
        A: {
          clean: 'value',
        },
        B: [
          {
            clean: 'value',
            a: { clean: 'value' },
          },
        ],
      })
      done()
    })

    it('should recursively remove keys `b`, and `c`', (done) => {
      const actual = {
        A: {
          a: 'value',
          b: 'value',
          c: {
            a: 'value',
            b: 'value',
            c: 'value',
          },
        },
        B: [
          {
            a: 'value',
            b: 'value',
            c: 'value',
          },
          [
            {
              a: 'value',
              b: 'value',
              c: 'value',
            },
            {
              a: 'value',
              b: 'value',
              c: 'value',
            },
          ],
        ],
      }

      const expected = {
        A: {
          a: 'value',
        },
        B: [{ a: 'value' }, [{ a: 'value' }, { a: 'value' }]],
      }

      cleanBy(actual, ['b', 'c'])
      expect(actual).to.deep.equal(expected)
      done()
    })

    it('should clean a key from an object with a circular reference', (done) => {
      const actual = {
        recursiveDefinition: this,
      }

      cleanBy(actual, 'recursiveDefinition')
      expect(actual).to.deep.equal({})
      done()
    })

    it('should clean an array of keys from an object with a circular reference', (done) => {
      const actual: any = {
        recursiveDefinition: null,
        foo: [],
        bar: [1, 2, 3, null],
        baz: {
          anotherRecursion: null,
        },
        grault: {
          plugh: null,
        },
      }

      actual.recursiveDefinition = actual
      actual.baz.anotherRecursion = actual
      actual.grault.plugh = actual

      const expected: any = {
        bar: [1, 2, 3, null],
        grault: { plugh: null },
      }
      expected.grault.plugh = expected

      cleanBy(actual, ['foo', 'baz', 'recursiveDefinition'])
      expect(actual).to.deep.equal(expected)
      done()
    })
  })
})
