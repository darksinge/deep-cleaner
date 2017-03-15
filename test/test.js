var cleaner = require('../index');
var assert = require('assert');



describe('index.js', function() {
    describe('#clean()', function() {
        it('should delete the nested key-value pair where key = "KILL_ALL_THE_CATS"', function(done) {
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
            
            // cleaner(obj, 'foo');
            cleaner(obj, 'kill all the cats!');
            
            assert.equal(undefined, obj['foo']['moreCats']['kill all the cats!']);
            
            return done();
        });
    });
});