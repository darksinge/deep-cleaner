# Deep Cleaner
[![npm version](https://badge.fury.io/js/deep-cleaner.svg)](https://badge.fury.io/js/deep-cleaner)
[![Build Status](https://travis-ci.com/darksinge/deep-cleaner.svg?branch=master)](https://travis-ci.com/darksinge/deep-cleaner)
[![npm](https://img.shields.io/npm/v/npm.svg)]()
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)]()

Delete nested key-value pairs by a specified key or remove empty objects, empty strings, null, and undefined values from an object. 

This module was created primarily with JSON in mind. The module is light-weight and dependency free.

## Installation

`npm install --save deep-cleaner`

## Usage:

To remove empty values on an object:

```
> var cleaner = require('deep-cleaner');
> var obj = {
...   a: 'value',
...   emptyString: '',
...   emptyArray: [],
...   emptyObject: {},
...   isNull: null,
...   isUndefined: undefined
...   b: {
...     a: 'nother value',
...     anotherEmptyString: '',
...     arr: [
...       {c: null},
...       {d: 'value'}
...     ]
...   }
... }
> cleaner(obj);
> console.log(obj);
{ aValue: 'value', b: { a: 'nother value', arr: [ {}, {d: 'value'} ] } }
```

To remove a key-value pair, pass in the name of the key as the second parameter:

```
> var dirtyObject = {
...   a: {
...     b: {
...       dirty: "value"
...     }
...   },
...   dirty: "value",
...   some_list: [
...     {
...       dirty: "value",
...       clean: "value"
...     },
...     {
...       dirty: "value",
...       clean: "value"
...     },
...     {
...       dirty: "value",
...       clean: "value"
...     },
...   ]
... }
> cleaner(dirtyObject, 'dirty');
> console.log(dirtyObject);
{ a: { b: {} }, some_list: [ {
  clean: "value" }, { clean: "value" }, { clean: "value" } ] }
```

You can also pass in an array of keys.

```
> var obj = {
...   a: {
...     a: 'foo',
...     b: 'bar',
...     c: 'baz'
...   },
...   b: 'quux',
...   c: 'plugh',
...   d: 'grault'
... }
> cleaner(obj, ['b','c']);
> console.log(obj);
{ a: { a: 'foo' }, d: 'grault' }
```

As of v1.2.0, `deep-cleaner` also works on objects with circular references!
```
> var foo = { bar: null, baz: '' };
> foo.bar = foo;
> cleaner(foo);
> console.log(foo);
{ bar: [Circular] }
```

## API

<!--lint enable code-block-style-->

### `deepCleaner(obj[, key])`

Removes "empty" values from `obj`. A Value is considered "empty" if it is:

 - an empty string
 - an empty array
 - an empty object
 - null
 - undefined

#### Arguments

##### `obj`

`Object` - The object to be cleaned.

##### `key` 

`String?|Array?` - A key or array of keys to be removed from `obj`. If `key` is not
specified, then `deepCleaner` will default to removing empty values, otherwise, only
`obj[key]` will be removed (or `obj[key[0]]`,..., `obj[key[n]]` if `key` is an array of keys).

## Contributing to Deep Cleaner
Pull requests are welcome! If you notice a bug or want to add a feature, please feel free to contribute
to this project.

Here are a few guidelines you should follow.
 - Please make new pull requests into the `development` branch. A new contribution might prompt me to make additional changes that I'd like packaged together in a single PR to `master`.
 - Please write as much detail as necessary in your commit messages to clearly explain any changes.
 - Changes to the code that do not have passing unit tests will not be accepted.
 
 Notice a bug but don't have time to fix it? Submit an issue! I strive to keep this package well maintained.

## Testing

run `npm test`.

## License

[MIT][license]


<!-- links -->

[license]: LICENSE.md