var cleaner = require('../index');
var assert = require('assert');



describe('index.js', function () {



    describe('#removeKey()', function () {
        it('should delete the nested key-value pair where key = "kill all the cats!"', function (done) {

            var obj_1 = {
                "I'm empty!": "",
                "I am not empty": "stuff",
                foo: {
                    bar: "cats",
                    foo: undefined,
                    asdf: null,
                    moreCats: {
                        'kill all the cats!': "Really, you should do what he says"
                    },
                    nestedEmptyObject: {}
                },
                "bar": {
                    description: "I'm a nested 'bar'!",
                    message: "",
                    realMessage: "Please don't delete me..."
                },
                someList: [
                    {
                        'kill all the cats!': "cats",
                        innocent: "don't delete"
                    },
                    {
                        'kill all the cats!': "cats",
                        innocent: "don't delete"
                    },
                    {
                        'kill all the cats!': "cats",
                        innocent: "don't delete"
                    }
                ]
            }

            cleaner(obj_1, 'kill all the cats!');
            assert.equal(undefined, obj_1['foo']['moreCats']['kill all the cats!']);
            assert.equal(undefined, obj_1['someList'][0]['kill all the cats!']);
            assert.equal(undefined, obj_1['someList'][1]['kill all the cats!']);
            assert.equal(undefined, obj_1['someList'][2]['kill all the cats!']);

            var obj_2 = {
                a: {
                    b: {
                        c: "dirty value"
                    }
                },
                d: {
                    e: {
                        f: "dirty value"
                    }
                }
            }

            cleaner(obj_2, ['c', 'f']);

            assert.equal(undefined, obj_2['a']['b']['c']);
            assert.equal(undefined, obj_2['d']['e']['f']);

            return done();
        });
    });

    describe('#clean()', function () {
        it('should delete all empty values of an object', function (done) {
            cleaner(obj);
            assert.equal(obj['bar']['description'] != null, true);
            assert.equal(obj['foo']['asdf'], undefined);
            assert.equal(obj["I'm empty!"], undefined);
            assert.equal(obj['bar']['message'], undefined);

            var actual = {
                a: {
                    b: "b"
                },
                c: [
                    "one",
                    "two",
                    "three",
                    "four",
                    {}
                ],
                d: {},
                e: [],
                f: null,
                g: undefined,
                h: {
                    i: "",
                    j: null
                },
                k: {
                    l: "",
                    m: "m"
                }
            }

            cleaner(actual);

            var expected = {
                a: {
                    b: "b"
                },
                c: [
                    "one",
                    "two",
                    "three",
                    "four"
                ],
                h: {},
                k: {
                    m: "m"
                }
            }
            console.log(JSON.stringify(actual, null, 3));
            console.log(JSON.stringify(expected, null, 3));
            assert.equal(actual, expected);

            return done();
        });
    });

});