var cleaner = require('../index');
var assert = require('assert');



describe('index.js', function () {

    var obj = {
        "A": {
            one: "1",
            two: "2",
            "three": 3,
            four: ""
        },
        "B": "b",
        "C": [
            {
                quotient: [
                    1,
                    2
                ],
                value: 0.5
            },
            {
                quotient: [
                    3,
                    4
                ],
                value: 0.75
            },
            {
                quotient: [
                    1,
                    0
                ],
                value: undefined
            }
        ],
        "D": [],
        "E": {
            e: null,
            ee: undefined,
            eee: "",
            eeee: {},
            eeeef: []
        },
        F: {
            f: null,
            ff: undefined,
            fff: "",
            ffff: {},
            fffff: [],

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

            var shouldBe = {
                "I am not empty": "stuff",
                foo: {
                    bar: "cats",
                },
                "bar": {
                    description: "I'm a nested 'bar'!",
                    realMessage: "Please don't delete me..."
                }
            }

            // assert.equal(shouldBe, obj);

            return done();
        });
    });

});