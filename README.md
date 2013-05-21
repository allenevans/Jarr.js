# Jarr.js

Jarr.js in a queryable array type object that inherits standard array functionality and provides methods to
query and transform the data. The aim is is to simplify your JavaScript code by incorporating some of the most common
array manipulations into easy to use methods.

## Usage

Create a new Jarr from an existing array.

```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]);
```

Alternatively, n-arguments can be past into the constructor.

```js
var jarr = new Jarr(1, 2, 3, 4, 5, 6);
```

all
```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]);
jarr.all(function (item) { return item > 3; });
```

```
false
```

any
```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]);
jarr.any(function (item) { return item > 3; });
```

```
true
```

at

```js
jarr = new Jarr(1, 2, 3, 4, 5, 6);
jarr.at(1);
```

```
2
```


contains

```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]);
jarr.contains(3);
```

```
returns true;
```

add

```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]);
jarr.add(7);
```

```
[1, 2, 3, 4, 5, 6, 7] as an instance of Jarr.
```

copy
- performs a shallow copy of the array.

```js
jarr = new Jarr(1, 2, 3, 4, 5, 6)
jarr.copy();
```

```
[1, 2, 3, 4, 5, 6]
```

count

```js
jarr = new Jarr(1, 2, 3, 4, 5, 6);
jarr.count();
```

```
6
```

defaultIfEmpty

```js
jarr = new Jarr();
jarr.defaultIfEmpty({"my" : "value"});
```

```
[{"my" : "value"}]
```

distinct

```js
jarr = new Jarr(1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 5, 6);
jarr.distinct();
```

```
[1, 2, 3, 4, 5, 6]
```

elementAt

```js
jarr = new Jarr(1, 2, 3, 4, 5, 6);
jarr.elementAt(1);
```

```
2
```

elementAtOrDefault

```js
jarr = new Jarr({"my" : "value 1"}, {"my" : "value 2"}, {"my" : "value 3"});
jarr.elementAtOrDefault(0, {"my" : "default value"});
jarr.elementAtOrDefault(99, {"my" : "default value"});
```

```
{"my" : "value 1"}
{"my" : "default value"}
```

first
```js
jarr = new Jarr(1, 2, 3, 4, 5, 6);
jarr.first(function (item) {
    return item > 3;
});
```

```
4
```


firstOrDefault

```js
jarr = new Jarr();
jarr.firstOrDefault({"my" : "default value"});

jarr = new Jarr({"my" : "value 1"}, {"my" : "value 2"}, {"my" : "value 3"});
jarr.firstOrDefault({"my" : "default value"});
```

```
{"my" : "default value"}

{"my" : "value 1"}
```

insertAt

```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]);
jarr.insertAt(1, 'X');
```

```
[1, 'X', 2, 3, 4, 5, 6]
```


intersect

```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]),
    anyArray = [3, 5, 6, 7, 8, 9];

jarr.intersect(anyArray, function (item1, i1, item2, i2) {
    return item1 == item2;
});
```

or simply

```js
jarr.intersect(anyArray);
```

```
[3, 5, 6]
```

last

```js
jarr = new Jarr(1, 2, 3, 4, 5, 6);
jarr.last(function (item) {
    return item < 5;
});
```

```
4
```


lastOrDefault

```js
jarr = new Jarr();
jarr.lastOrDefault({"my" : "default value"});

jarr = new Jarr({"my" : "value 1"}, {"my" : "value 2"}, {"my" : "value 3"});
jarr.lastOrDefault({"my" : "default value"});
```

```
{"my" : "default value"}

{"my" : "value 3"}
```

notIntersect

```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]),
    anyArray = [3, 5, 6, 7, 8, 9];

jarr.notIntersect(anyArray, function (item1, i1, item2, i2) {
    return item1 == item2;
});
```

```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]),
    anyArray = [3, 5, 6, 7, 8, 9];

jarr.intersect(anyArray, function (item1, i1, item2, i2) {
    return item1 == item2;
});
```

orderBy

```js
jarr = new Jarr({value : 4}, {value : 1}, {value : 5}, {value : 2}, {value : 6}, {value : 3})

jarr.orderBy(function (item) {
    return item.value; //order by value property
});
```

```
[{value : 1}, {value : 2}, {value : 3}, {value : 4}, {value : 5}, {value : 6}]
```

orderByDescending

```js
jarr = new Jarr({value : 4}, {value : 1}, {value : 5}, {value : 2}, {value : 6}, {value : 3})

jarr.orderByDescending(function (item) {
    return item.value; //order by value property
});
```

```
[{value : 6}, {value : 5}, {value : 4}, {value : 3}, {value : 2}, {value : 1}]
```


remove

```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]);
jarr.remove(4);
```

```
[1, 2, 3, 5, 6]
```

removeAt

```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]);
jarr.removeAt(4);
```

```
[1, 2, 3, 4, 6]
```


reverse

```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]);
jarr.reverse();
```

```
[6, 5, 4, 3, 2, 1]
```

select

```js
var jarr = new Jarr({name: "red", values : [4, 5, 6]}, {name: "green", values : 1}, {name : "blue", values : [9, 0]}, {name : "purple", values : 1}, {name: "orange", values : [1, 2, 3]}, {name: "yellow", values : 3});
jarr.select(function (item) {
    return item.values;
});
```

```
[ [4, 5, 6], 1, [9, 0], 1, [1, 2, 3], 3 ]
```

selectMany

```js
var jarr = new Jarr({name: "red", values : [4, 5, 6]}, {name: "green", values : 1}, {name : "blue", values : [9, 0]}, {name : "purple", values : 1}, {name: "orange", values : [1, 2, 3]}, {name: "yellow", values : 3});
jarr.selectMany(function (item) {
    return item.values;
});
```

```
[4, 5, 6, 1, 9, 0, 1, 1, 2, 3, 3]
```

where

```js
var jarr = new Jarr([1, 2, 3, 4, 5, 6]);
jarr.where(function (item) {
    return item % 2 == 0;
});
```

```
[2, 4, 6]
```