# Deep Cleaner
[![npm version](https://badge.fury.io/js/deep-cleaner.svg)](https://badge.fury.io/js/deep-cleaner)
[![Build Status](https://travis-ci.com/darksinge/deep-cleaner.svg?branch=master)](https://travis-ci.com/darksinge/deep-cleaner)
[![npm](https://img.shields.io/npm/v/npm.svg)]()
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)]()

Delete nested key-value pairs by a specified key or remove empty objects, empty strings, null, and undefined values from an object.

*Note:* deep-cleaner was designed primarily with JSON in mind. It will not work on objects containing recursive definitions due to it's simplicity.

## Installation

`npm install --save deep-cleaner`

## Contributing to Deep Cleaner
Pull requests are welcome! If you notice a bug or want to add a feature, please feel free to contribute
to this project.

Here are a few guidelines you should follow.
 - Please make new pull requests into the `development` branch. A new contribution might prompt me to make additional changes that I'd like packaged together in a single PR to `master`.
 - Please write as much detail as necessary in your commit messages to clearly explain any changes.
 - Changes to the code that do not have passing unit tests will not be accepted.
 
 Notice a bug but don't have time to fix it? Submit an issue! I want to keep this package well maintained and squash all of it's nasty little bugs.

## Usage

```
deepCleaner(object[, key])
```
#### Arguments:

`object` (Object): The object to clean

`key` (String|Array)\<optional>: The key or array of keys of key-value pairs you want to recursively remove on `object`

## Examples:

To remove empty values (including `undefined` and `null`) on an object:

```
var cleaner = require('deep-cleaner');

var obj = {
  aValue: 'value',
  emptyString: '',
  emptyArray: [],
  emptyObject: {},
  isNull: null,
  isUndefined: undefined
  multiLayeredObj: {
    anotherValue: 'value',
    anotherEmptyString: "",
    anArray: [
      {
        noValue: null
      },
      {
        hasValue: 'value'
      }
    ]
  },
}

cleaner(obj);

console.log(obj);

// {
//   aValue: 'value',
//   multiLayeredObj: {
//      anotherValue: 'value',
//      anArray: [
//          {},
//          {hasValue: 'value'}
//      ]
//   }
// }
```

To recursively strip a key-value pair, pass in the name of the key as the second parameter:

```
   
var dirtyObject = {
  a: {
    b: {
      dirty: "value"
    }
  },
  dirty: "value",
  some_list: [
    {
      dirty: "value",
      clean: "value"
    },
    {
      dirty: "value",
      clean: "value"
    },
    {
      dirty: "value",
      clean: "value"
    },
  ]
}

cleaner(dirtyObject, 'dirty');

console.log(dirtyObject);

// {
//   a: {
//     b: {}
//   },
//   some_list: [
//     {
//       clean: "value"
//     },
//     {
//       clean: "value"
//     },
//     {
//       clean: "value"
//     },
//   ]
// }
```

You can also pass in an array of keys to delete, i.e.,

```
var obj = {
  a: {
    a: 'a',
    b: 'b'
  },
  b: 'b',
  c: 'c',
  d: 'd'
}

cleaner(obj, ['b','c']);

console.log(obj);

// {
//   a: {
//      a: 'a'
//   },
//   d: 'd'
// }

```
## Testing

run `npm test`.

