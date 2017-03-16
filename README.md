# deep-cleaner
Delete nested key-value pairs on an object with a provided key, empty objects, empty strings, null, and undefined values

### Usage

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


     
