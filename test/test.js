var cleaner = require('../index');
var assert = require('assert');



describe('index.js', function () {

    var obj = {
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
        }
    }

    describe('#removeKey()', function () {
        it('should delete the nested key-value pair where key = "KILL_ALL_THE_CATS"', function (done) {
            cleaner(obj, 'kill all the cats!');
            assert.equal(undefined, obj['foo']['moreCats']['kill all the cats!']);
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