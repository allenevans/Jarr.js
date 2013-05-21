"use strict";
(function (ok, test, equal, Jarr) {

    test("T0001 : Jarr is defined", function () {
        ok(typeof Jarr != "undefined", "Jarr is not defined");
    });

    test("T0002 : Jarr.indexOf", function () {
        var expected = 2;

        equal(new Jarr([1, 2, 3, 4, 5, 6]).indexOf(3),
            expected,
            "Jarr.indexOf");
    });

    test("T0003 : Jarr.indexOf", function () {
        var expected = 1,
            arr = new Jarr([{a : "a"}, {b : "b"}, {c : "c"}]);

        equal(arr.indexOf(arr.elementAt(expected)),
            expected,
            "Jarr.indexOf");
    });

    test("T0004 : Jarr.contains", function () {
        var expected = true;

        equal(new Jarr([1, 2, 3, 4, 5, 6]).contains(4),
            expected,
            "Jarr.contains");
    });

    test("T0005 : Jarr.contains", function () {
        var expected = true,
            arr = new Jarr([{a : "a"}, {b : "b"}, {c : "c"}]);

        equal(new Jarr(arr).contains(arr.elementAt(0)),
            expected,
            "Jarr.contains");

    });

    test("T0006 : Jarr.contains", function () {
        var expected = true,
            arr = new Jarr([{a : "a"}, {b : "b"}, {c : "c"}]);

        equal(new Jarr(arr).contains("a", function (search, item) { return item[search] == search;}),
            expected,
            "Jarr.contains");
    });

    test("T0007 : Jarr.add", function () {
        var expected = 4,
            arr = new Jarr({a : "a"}, {b : "b"}, {c : "c"});

        arr.add({d: "d"});

        equal(arr.count(),
            expected,
            "Jarr.add");

    });

    test("T0008 : Jarr.add", function () {
        var expected = 3,
            arr = new Jarr({a : "a"}, {b : "b"}, {c : "c"});

        arr.add(arr.elementAt(2), true);//should not add duplicate items

        equal(arr.count(),
            expected,
            "Jarr.add");
    });

    test("T0009 : Jarr.remove", function () {
        var expected = 2,
            arr = new Jarr([{a : "a"}, {b : "b"}, {c : "c"}]);

        arr.remove(arr.elementAt(1));

        equal(arr.count(),
            expected,
            "Jarr.remove");
    });

    test("T0010 : Jarr.remove", function () {
        var expected = 3,
            arr = new Jarr([{a : "a"}, {b : "b"}, {c : "c"}]);

        arr.remove({d: "d"}, true);//should not remove anything

        equal(arr.count(),
            expected,
            "Jarr.remove");
    });


    test("T0011 : Jarr.removeAt", function () {
        var arr = new Jarr([{a : "a"}, {b : "b"}, {c : "c"}]);

        arr.removeAt(1);

        equal(arr.count(), 2, "Jarr.removeAt");
        equal(arr.elementAt(1).c, "c", "Jarr.removeAt");
    });

    test("T0012 : Jarr.removeAt", function () {
        var arr = new Jarr({a : "a"}, {b : "b"}, {c : "c"});

        arr.removeAt(999);

        equal(arr.count(), 3, "Jarr.removeAt");
        equal(arr.elementAt(2).c, "c", "Jarr.removeAt");
    });


    test("T0013 : Jarr.copy", function () {
        var arr = new Jarr(1, 2, 3, 4, 5),
            result,
            i;

        result = arr.copy();

        equal(result.count(), arr.count(), "Jarr.copy");

        for (i = 0; i < arr.count(); i += 1) {
            equal(result.elementAt(i), arr.elementAt(i), "Jarr.copy: " + i);
        }
    });

    test("T0014 : Jarr.copy", function () {
        var arr = new Jarr(),
            result,
            i;

        result = arr.copy();

        equal(result.count(), arr.count(), "Jarr.copy");

        for (i = 0; i < arr.count(); i += 1) {
            equal(result[i], arr[i], "Jarr.copy: " + i);
        }
    });

    test("T0015 : Jarr.insertAt", function () {
        var arr = new Jarr([1, 2, 3, 4, 5, 6]);

        arr.insertAt(3, 'X');

        equal(arr.count(), 7, "Jarr.insertAt");
        equal(arr.at(0), 1, "Jarr.insertAt");
        equal(arr.at(6), 6, "Jarr.insertAt");
        equal(arr.at(3), 'X', "Jarr.insertAt");
    });


    test("T0016 : Jarr.insertAt", function () {
        var arr = new Jarr([1, 2, 3, 4, 5, 6]);

        arr.insertAt(-1, 'X');// insert at penultimate position

        equal(arr.count(), 7, "Jarr.insertAt");
        equal(arr.elementAt(0), 1, "Jarr.insertAt");
        equal(arr.elementAt(6), 6, "Jarr.insertAt");
        equal(arr.elementAt(5), 'X', "Jarr.insertAt");
    });


    test("T0017 : Jarr.insertAt", function () {
        var arr = new Jarr([1, 2, 3, 4, 5, 6]);

        arr.insertAt(999, 'X'); //out of bounds, insert at end

        equal(arr.count(), 7, "Jarr.insertAt");
        equal(arr.elementAt(0), 1, "Jarr.insertAt");
        equal(arr.elementAt(5), 6, "Jarr.insertAt");
        equal(arr.elementAt(6), 'X', "Jarr.insertAt");
    });

    test("T0018 : Jarr.reverse", function () {
        var arr = new Jarr([1, 2, 3, 4, 5, 6]);

        arr.reverse();

        equal(arr.count(), 6, "Jarr.reverse");
        equal(arr.elementAt(0), 6, "Jarr.reverse");
        equal(arr.at(1), 5, "Jarr.reverse");
        equal(arr.elementAt(2), 4, "Jarr.reverse");
        equal(arr.elementAt(3), 3, "Jarr.reverse");
        equal(arr.elementAt(4), 2, "Jarr.reverse");
        equal(arr.elementAt(5), 1, "Jarr.reverse");
    });

    test("T0019 : Jarr.reverse", function () {
        var arr = new Jarr([]);
        arr.reverse();

        equal(arr.count(), 0, "Jarr.reverse");
    });

    test("T0020 : Jarr.reverse", function () {
        var arr = new Jarr();
        arr.reverse();
        equal(arr.count(), 0, "Jarr.reverse");
    });

    test("T0021 : Jarr.where", function () {
        var arr = new Jarr([1, 2, 3, 4, 5, 6]),
            result = arr.where(function (item) {
                return item > 3;
            });

        equal(result.count(), 3, "Jarr.where");
        equal(result.elementAt(0), 4, "Jarr.where");
        equal(result.elementAt(1), 5, "Jarr.where");
        equal(result.elementAt(2), 6, "Jarr.where");
    });


    test("T0022 : Jarr.where", function () {
        var arr = new Jarr({value : 1}, {value : 2}, {value : 3}, {value : 4}, {value : 5}, {value : 6}),
            result = arr.where(function (item) {
                return item.value <= 3;
            });

        equal(result.count(), 3, "Jarr.where");
        equal(result.elementAt(0).value, 1, "Jarr.where");
        equal(result.elementAt(1).value, 2, "Jarr.where");
        equal(result.elementAt(2).value, 3, "Jarr.where");
    });

    test("T0023 : Jarr.orderBy", function () {
        var arr = new Jarr({value : 4}, {value : 1}, {value : 5}, {value : 2}, {value : 6}, {value : 3}),
            result = arr.orderBy(function (item) {
                return item.value;//order by value property
            });

        equal(result.count(), 6, "Jarr.orderBy");
        equal(result.elementAt(0).value, 1, "Jarr.orderBy");
        equal(result.elementAt(1).value, 2, "Jarr.orderBy");
        equal(result.elementAt(2).value, 3, "Jarr.orderBy");
        equal(result.elementAt(3).value, 4, "Jarr.orderBy");
        equal(result.elementAt(4).value, 5, "Jarr.orderBy");
        equal(result.elementAt(5).value, 6, "Jarr.orderBy");
    });

    test("T0024 : Jarr.orderBy", function () {
        var arr = new Jarr({name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.orderBy(function (item) {
                return item.name;//order by value property
            });

        equal(result.count(), 6, "Jarr.orderBy");
        equal(result.elementAt(0).name, "blue", "Jarr.orderBy");
        equal(result.elementAt(1).name, "green", "Jarr.orderBy");
        equal(result.elementAt(2).name, "orange", "Jarr.orderBy");
        equal(result.elementAt(3).name, "purple", "Jarr.orderBy");
        equal(result.elementAt(4).name, "red", "Jarr.orderBy");
        equal(result.elementAt(5).name, "yellow", "Jarr.orderBy");
    });

    test("T0025 : Jarr.orderByDescending", function () {
        var arr = new Jarr({value : 4}, {value : 1}, {value : 5}, {value : 2}, {value : 6}, {value : 3}),
            result = arr.orderByDescending(function (item) {
                return item.value;//order by value property
            });

        equal(result.count(), 6, "Jarr.orderByDescending");
        equal(result.elementAt(0).value, 6, "Jarr.orderByDescending");
        equal(result.elementAt(1).value, 5, "Jarr.orderByDescending");
        equal(result.elementAt(2).value, 4, "Jarr.orderByDescending");
        equal(result.elementAt(3).value, 3, "Jarr.orderByDescending");
        equal(result.elementAt(4).value, 2, "Jarr.orderByDescending");
        equal(result.elementAt(5).value, 1, "Jarr.orderByDescending");
    });

    test("T0026 : Jarr.orderByDescending", function () {
        var arr = new Jarr({name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.orderByDescending(function (item) {
                return item.name;//order by value property
            });

        equal(result.count(), 6, "Jarr.orderBy");
        equal(result.elementAt(0).name, "yellow", "Jarr.orderBy");
        equal(result.elementAt(1).name, "red", "Jarr.orderBy");
        equal(result.elementAt(2).name, "purple", "Jarr.orderBy");
        equal(result.elementAt(3).name, "orange", "Jarr.orderBy");
        equal(result.elementAt(4).name, "green", "Jarr.orderBy");
        equal(result.elementAt(5).name, "blue", "Jarr.orderBy");
    });

    test("T0027 : Jarr.count", function () {
        var arr = new Jarr([1, 2, 3, 4, 5, 6]),
            result = arr.count();

        equal(result, 6, "Jarr.count");
    });

    test("T0028 : Jarr.count", function () {
        var arr = new Jarr([1, 2, 3, 4, 5, 6]),
            result = arr.count(function (item) { return item > 3; });

        equal(result, 3, "Jarr.count");
    });


    test("T0029 : Jarr.distinct", function () {
        var arr = new Jarr(1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 5, 6),
            result = arr.distinct(function (item1, item2) {
                return item1 == item2;
            });

        equal(result.count(), 6, "Jarr.distinct");
        equal(result.elementAt(0), 1, "Jarr.distinct");
        equal(result.elementAt(1), 2, "Jarr.distinct");
        equal(result.elementAt(2), 3, "Jarr.distinct");
        equal(result.elementAt(3), 4, "Jarr.distinct");
        equal(result.elementAt(4), 5, "Jarr.distinct");
        equal(result.elementAt(5), 6, "Jarr.distinct");
    });

    test("T0030 : Jarr.distinct", function () {
        var arr = new Jarr(1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 5, 6),
            result = arr.distinct();

        equal(result.count(), 6, "Jarr.distinct");
        equal(result.elementAt(0), 1, "Jarr.distinct");
        equal(result.elementAt(1), 2, "Jarr.distinct");
        equal(result.elementAt(2), 3, "Jarr.distinct");
        equal(result.elementAt(3), 4, "Jarr.distinct");
        equal(result.elementAt(4), 5, "Jarr.distinct");
        equal(result.elementAt(5), 6, "Jarr.distinct");
    });

    test("T0031 : Jarr.distinct", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.distinct(function (item1, item2) {
                return item1.name == item2.name;
            });

        equal(result.count(), 6, "Jarr.distinct");
    });

    test("T0032 : Jarr.distinct", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.distinct(function (item1, item2) {
                return item1.value == item2.value;
            });

        equal(result.count(), 8, "Jarr.distinct");
    });

    test("T0033 : Jarr.distinct", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.distinct();

        equal(result.count(), 8, "Jarr.distinct");
    });

    test("T0034 : Jarr.any", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.any(function (item) {
                return item.value > 50;
            });

        equal(result, true, "Jarr.any");
    });

    test("T0035 : Jarr.any", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.any(function (item) {
                return item.value > 999;
            });

        equal(result, false, "Jarr.any");
    });

    test("T0036 : Jarr.all", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.all(function (item) {
                return item.value > 50;
            });

        equal(result, false, "Jarr.all");
    });

    test("T0037 : Jarr.all", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.all(function (item) {
                return item.value > 0;
            });

        equal(result, true, "Jarr.all");
    });

    test("T0038 : Jarr.first", function () {
        var arr = new Jarr({name: "red", value : 49}, {name: "red", value : 4}, {name: "green", value : 111}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.first(function (item) {
                return item.value > 50;
            });

        equal(result.name, "green", "Jarr.first");
    });

    test("T0039 : Jarr.first", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.first();

        equal(result.name, "red", "Jarr.first");
    });

    test("T0040 : Jarr.last", function () {
        var arr = new Jarr({name: "red", value : 49}, {name: "red", value : 4}, {name: "green", value : 111}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.last(function (item) {
                return item.value > 50;
            });

        equal(result.name, "blue", "Jarr.first");
    });

    test("T0041 : Jarr.last", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.last();

        equal(result.name, "yellow", "Jarr.last");
    });

    test("T0042 : Jarr.elementAt", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.elementAt(3);

        equal(result.name, "blue", "Jarr.elementAt");
    });

    test("T0043 : Jarr.elementAt", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.elementAt(333);

        equal(result, null, "Jarr.elementAt");
    });

    test("T0044 : Jarr.intersect", function () {
        var arr1 = new Jarr([1, 2, 3, 4, 5, 6]),
            arr2 = [3, 5, 6, 7, 8, 9],
            result = arr1.intersect(arr2, function (item1, i1, item2, i2) {
                return item1 == item2;
            });

        equal(result.count(), 3, "Jarr.intersect");
        equal(result.elementAt(0), 3, "Jarr.intersect");
        equal(result.elementAt(1), 5, "Jarr.intersect");
        equal(result.elementAt(2), 6, "Jarr.intersect");
    });

    test("T0045 : Jarr.intersect", function () {
        var arr1 = new Jarr([1, 2, 3, 4, 5, 6]),
            arr2 = new Jarr([3, 5, 6, 7, 8, 9]),
            result = arr1.intersect(arr2);

        equal(result.count(), 3, "Jarr.intersect");
        equal(result.elementAt(0), 3, "Jarr.intersect");
        equal(result.elementAt(1), 5, "Jarr.intersect");
        equal(result.elementAt(2), 6, "Jarr.intersect");
    });

    test("T0046 : Jarr.intersect", function () {
        var arr1 = new Jarr([1, 2, 3, 4, 5, 6]),
            arr2 = [],
            result = arr1.intersect(arr2);

        equal(result.count(), 0, "Jarr.intersect");
    });

    test("T0047 : Jarr.notIntersect", function () {
        var arr1 = new Jarr([1, 2, 3, 4, 5, 6]),
            arr2 = [3, 5, 6, 7, 8, 9],
            result = arr1.notIntersect(arr2);

        equal(result.count(), 3, "Jarr.notIntersect");
        equal(result.elementAt(0), 1, "Jarr.notIntersect");
        equal(result.elementAt(1), 2, "Jarr.notIntersect");
        equal(result.elementAt(2), 4, "Jarr.notIntersect");
    });

    test("T0048 : Jarr.notIntersect", function () {
        var arr1 = new Jarr([1, 2, 3, 4, 5, 6]),
            arr2 = new Jarr([3, 5, 6, 7, 8, 9]),
            result = arr1.notIntersect(arr2);

        equal(result.count(), 3, "Jarr.notIntersect");
        equal(result.elementAt(0), 1, "Jarr.notIntersect");
        equal(result.elementAt(1), 2, "Jarr.notIntersect");
        equal(result.elementAt(2), 4, "Jarr.notIntersect");
    });

    test("T0049 : Jarr.notIntersect", function () {
        var arr1 = new Jarr([1, 2, 3, 4, 5, 6]),
            arr2 = [],
            result = arr1.notIntersect(arr2);

        equal(result.count(), 6, "Jarr.notIntersect");
    });

    test("T0050 : Jarr.notIntersect", function () {
        var arr1 = new Jarr([{shape : "square"},{shape : "circle"}, {shape : "triangle"}, {shape : "rectangle"} ]),
            arr2 = [{id : 0, shape : "circle"}, {id : 1, shape : "rectangle"}],
            result = arr1.notIntersect(arr2, function(search, item) {
                return search && search.shape == item.shape;
            });

        equal(result.count(), 2, "Jarr.notIntersect");
    });

    test("T0051 : Jarr.defaultIfEmpty", function () {
        var arr = new Jarr(),
            result = arr.defaultIfEmpty([{name: "default"}, {name: "default 2"}]);

        equal(result[0].name, "default", "Jarr.defaultIfEmpty");
    });

    test("T0052 : Jarr.defaultIfEmpty", function () {
        var arr = new Jarr({name: "first"}),
            result = arr.defaultIfEmpty([{name: "default"}, {name: "default 2"}]);

        equal(result.count(), 1, "Jarr.defaultIfEmpty");
    });

    test("T0053 : Jarr.elementAtOrDefault", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.elementAtOrDefault(5, {name: "default", value : 0});

        equal(result.name, "purple", "Jarr.elementAtOrDefault");
    });

    test("T0054 : Jarr.elementAtOrDefault", function () {
        var arr = new Jarr({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.elementAtOrDefault(55, {name: "default", value : 0});

        equal(result.name, "default", "Jarr.elementAtOrDefault");
    });

    test("T0055 : Jarr.firstOrDefault", function () {
        var arr = new Jarr([1, 2, 3, 4, 5, 6]),
            result = arr.firstOrDefault(999);

        equal(result, 1, "Jarr.firstOrDefault");
    });

    test("T0056 : Jarr.firstOrDefault", function () {
        var arr = new Jarr(),
            result = arr.firstOrDefault(999);

        equal(result, 999, "Jarr.firstOrDefault");
    });

    test("T0057 : Jarr.lastOrDefault", function () {
        var arr = new Jarr([1, 2, 3, 4, 5, 6]),
            result = arr.lastOrDefault(999);

        equal(result, 6, "Jarr.lastOrDefault");
    });

    test("T0058 : Jarr.lastOrDefault", function () {
        var arr = new Jarr(),
            result = arr.lastOrDefault(999);

        equal(result, 999, "Jarr.lastOrDefault");
    });

    test("T0059 : Jarr.select", function () {
        var arr = new Jarr({name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.select(function (item) {
                return item.name;
            });

        equal(result.count(), 6, "Jarr.select");
        equal(result.elementAt(0), "red", "Jarr.select");
        equal(result.elementAt(1), "green", "Jarr.select");
        equal(result.elementAt(2), "blue", "Jarr.select");
        equal(result.elementAt(3), "purple", "Jarr.select");
        equal(result.elementAt(4), "orange", "Jarr.select");
        equal(result.elementAt(5), "yellow", "Jarr.select");
    });

    test("T0060 : Jarr.select", function () {
        var arr = new Jarr(),
            result = arr.select(function (item) {
                return item.name;//order by value property
            });

        equal(result.count(), 0, "Jarr.select");
    });

    test("T0061 : Jarr.selectMany", function () {
        var arr = new Jarr({name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.selectMany(function (item) {
                return item.name;//order by value property
            });

        equal(result.count(), 6, "Jarr.selectMany");
        equal(result.elementAt(0), "red", "Jarr.selectMany");
        equal(result.elementAt(1), "green", "Jarr.selectMany");
        equal(result.elementAt(2), "blue", "Jarr.selectMany");
        equal(result.elementAt(3), "purple", "Jarr.selectMany");
        equal(result.elementAt(4), "orange", "Jarr.selectMany");
        equal(result.elementAt(5), "yellow", "Jarr.selectMany");
    });

    test("T0062 : Jarr.selectMany", function () {
        var arr = new Jarr(),
            result = arr.selectMany(function (item) {
                return item.name;//order by value property
            });

        equal(result.count(), 0, "Jarr.selectMany");
    });
    
    test("T0063 : Jarr.selectMany", function () {
        var arr = new Jarr({name: "red", values : [4, 5, 6]}, {name: "green", values : 1}, {name : "blue", values : [9, 0]}, {name : "purple", values : 1}, {name: "orange", values : [1, 2, 3]}, {name: "yellow", values : 3}),
            result = arr.selectMany(function (item) {
                return item.values;
            });

        equal(result.count(), 11, "Jarr.selectMany");
        equal(result[3], 1, "Jarr.selectMany");
    });
    
    test("T0064 : Jarr.orderBy", function () {
        var arr = new Jarr(5, 4, 7, 8, 4, 3, 44, 5, 6, 3456, 7, 3),
            result = arr.orderBy();

        equal(result.count(), 12, "Jarr.orderBy");
        equal(result.at(0), 3, "Jarr.orderBy");
        equal(result.at(1), 3, "Jarr.orderBy");
        equal(result.at(2), 4, "Jarr.orderBy");
        equal(result.at(3), 4, "Jarr.orderBy");
        equal(result.at(4), 5, "Jarr.orderBy");
        equal(result.at(11), 3456, "Jarr.orderBy");
    });
    
    test("T0065 : Jarr.toArray", function () {
        var arr = new Jarr(5, 4, 7, 8, 4, 3, 44, 5, 6, 3456, 7, 3),
            result = arr.toArray();
        
        equal(arr.constructor.name, "Jarr", "Jarr.toArray");
        equal(result.constructor.name, "Array", "Jarr.toArray");
    });
}(ok, test, equal, Jarr));