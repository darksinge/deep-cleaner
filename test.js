var cleaner = require('./index');

var testObj = {
	"I'm empty!": "",
	"I am not empty": "stuff",
	foo: {
		bar: "cats",
		foo: undefined,
		asdf: null,
		moreCats: {
			KILL_ALL_THE_CATS: "Really, you should do what he says"
		},
		nestedEmptyObject: {}
	},
	"bar": {
		description: "I'm a nested 'bar'!",
		message: "",
		realMessage: "Please don't delete me..."
	}
}

console.log('cleaner: ', cleaner);

cleaner.clean(testObj, {
	removeKey: 'KILL_ALL_THE_CATS'
});

console.log('test obj: ', testObj);

cleaner.clean(testObj, 'moreCats');

console.log('test obj: ', testObj);