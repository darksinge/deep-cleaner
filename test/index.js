var cleaner = require('../index');
var expect = require('chai').expect;
var should = require('chai').should();


describe('index.js', function () {

    describe('#deepCleaner()', function() {

        it('should delete values on an Object that are null, undefined, or an empty string, array, or object', function(done) {
            var obj = {
                notEmptyString: 'string',
                emptyString: "",
                notEmptyArray: [1, 2, 3],
                emptyArray: [],
                notEmptyObject: {aKey: 'a value'},
                emptyObject: {},
                thisIsTrue: true,
                thisIsFalse: false,
                thisIsNull: null,
                thisIsUndefined: undefined,
                not_a_number: NaN,
                dirty: "value"
            }

            cleaner(obj);

            should.exist(obj.notEmptyString);
            should.exist(obj.notEmptyArray);
            should.exist(obj.notEmptyObject);
            should.exist(obj.thisIsTrue);
            should.exist(obj.thisIsFalse);
            should.exist(obj.not_a_number);
            should.exist(obj.dirty);

            should.not.exist(obj.emptyString);
            should.not.exist(obj.emptyArray);
            should.not.exist(obj.emptyObject);
            should.not.exist(obj.thisIsNull);
            should.not.exist(obj.thisIsUndefined);

            done();
        });

        it('should delete nested key-value pairs where key equals `dirty`', function(done) {            
            var actual = {
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
            
            cleaner(actual, 'dirty');
            expect(actual).to.deep.equal({
                A: {
                    clean:'value',
                    emptyNull: null,
                    emptyUndefined: undefined,
                    emptyArray: [],
                    emptyObject: {},
                    a:{}
                },
                B:[{
                    clean:'value',
                    a:{clean:'value'}
                }]
            });
            done();
        });

        it('should recursively remove keys `b`, and `c`', function(done) {
            var actual = {
                A: {
                    a: "value",
                    b: "value",
                    c: {
                        a: "value",
                        b: "value",
                        c: "value"
                    }
                },
                B: [
                    {
                        a: "value",
                        b: "value",
                        c: "value"
                    },
                    [
                        {
                            a: "value",
                            b: "value",
                            c: "value"
                        },
                        {
                            a: "value",
                            b: "value",
                            c: "value"
                        }
                    ]
                ]
            }

            var expected = { 
                A: {
                    a: "value"
                },
                B: [
                    {a: "value"},
                    [
                        {a: "value"},
                        {a: "value"}
                    ]
                ]
            }

            cleaner(actual, ['b', 'c']);
            expect(actual).to.deep.equal(expected);
            done();
        });

        it('should clean an object with a circular reference ', function(done) {

            const actual = {
                recursiveDefinition: null,
                foo: [],
                bar: [1,2,3],
                baz: {
                    anotherRecursion: null
                },
                grault: null,
                plugh: undefined,
                qux: ''
            }
            actual.recursiveDefinition = actual;
            actual.baz.anotherRecursion = actual;
            
            let expected = {
                recursiveDefinition: null,
                bar: [1,2,3],
                baz: {
                    anotherRecursion: null
                }
            }
            expected.recursiveDefinition = expected;
            expected.baz.anotherRecursion = expected;

            cleaner(actual);
            expect(actual).to.deep.equal(expected);
            done();
        });

        it('should clean a key from an object with a circular reference', function(done) {
            var actual = {
                recursiveDefinition: this,
            };

            cleaner(actual, 'recursiveDefinition');
            expect(actual).to.deep.equal({});
            done();
        });

        it('should clean an array of keys from an object with a circular reference', function(done) {
            var actual = {
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

            actual.recursiveDefinition = actual;
            actual.baz.anotherRecursion = actual;
            actual.grault.plugh = actual;

            var expected = {
                bar: [1, 2, 3, null],
                grault: { plugh: null }
            }
            expected.grault.plugh = expected;

            cleaner(actual, ['foo', 'baz', 'recursiveDefinition']);
            expect(actual).to.deep.equal(expected);
            done();
        });

    });
});