# Deep Cleaner
Delete nested key-value pairs on an object with a provided key, empty objects, empty strings, null, and undefined values

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
cleaner(object[, key])
```
#### Arguments
object (Object): The object to clean.

key (String, optional): The name of the key in a key-value pair you want to delete on the object.

#### Example

To clean empty values,

```
var cleaner = require('deep-cleaner');

var obj = {
  a: 'a',
  b: '',
  c: [],
  d: {},
  e: null,
  f: undefined
}

cleaner(obj);

console.log(obj);

// {
//   a: 'a'
// }
```

To recursively strip a key-value pair, pass in the name of the key as the second parameter, i.e.,

```
   
var dirtyObject = {
  a: {
    b: {
      c: "some dirty value"
    }
  },
  c: "another dirty value",
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

cleaner(dirtyObject, 'c');
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
  a: 'a',
  b: 'b',
  c: 'c'
}

cleaner(obj, ['a','c']);

console.log(obj);

// {
//   a: 'a'
// }

```


     
