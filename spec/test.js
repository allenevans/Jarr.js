"use strict";
(function (ok, test, equal, Jarray) {

    test("Jarray is defined", function () {
        ok(typeof Jarray != "undefined", "Jarray is not defined");
    });

    test("T0001 : Jarray.indexOf", function () {
        var expected = 2;

        equal(new Jarray([1, 2, 3, 4, 5, 6]).indexOf(3),
            expected,
            "Jarray.indexOf");
    });

    test("T0002 : Jarray.indexOf", function () {
        var expected = 1,
            arr = new Jarray([{a : "a"}, {b : "b"}, {c : "c"}]);

        equal(arr.indexOf(arr.elementAt(expected)),
            expected,
            "Jarray.indexOf");
    });

    test("T0003 : Jarray.contains", function () {
        var expected = true;

        equal(new Jarray([1, 2, 3, 4, 5, 6]).contains(4),
            expected,
            "Jarray.contains");
    });

    test("T0004 : Jarray.contains", function () {
        var expected = true,
            arr = new Jarray([{a : "a"}, {b : "b"}, {c : "c"}]);

        equal(new Jarray(arr).contains(arr.elementAt(0)),
            expected,
            "Jarray.contains");

    });

    test("T0005 : Jarray.add", function () {
        var expected = 4,
            arr = new Jarray({a : "a"}, {b : "b"}, {c : "c"});

        arr.add({d: "d"});

        equal(arr.count(),
            expected,
            "Jarray.add");

    });

    test("T0006 : Jarray.add", function () {
        var expected = 3,
            arr = new Jarray({a : "a"}, {b : "b"}, {c : "c"});

        arr.add(arr.elementAt(2), true);//should not add duplicate items

        equal(arr.count(),
            expected,
            "Jarray.add");
    });

    test("T0007 : Jarray.remove", function () {
        var expected = 2,
            arr = new Jarray([{a : "a"}, {b : "b"}, {c : "c"}]);

        arr.remove(arr.elementAt(1));

        equal(arr.count(),
            expected,
            "Jarray.remove");
    });

    test("T0008 : Jarray.remove", function () {
        var expected = 3,
            arr = new Jarray([{a : "a"}, {b : "b"}, {c : "c"}]);

        arr.remove({d: "d"}, true);//should not remove anything

        equal(arr.count(),
            expected,
            "Jarray.remove");
    });


    test("T0009 : Jarray.removeAt", function () {
        var arr = new Jarray([{a : "a"}, {b : "b"}, {c : "c"}]);

        arr.removeAt(1);

        equal(arr.count(), 2, "Jarray.removeAt");
        equal(arr.elementAt(1).c, "c", "Jarray.removeAt");
    });

    test("T0010 : Jarray.removeAt", function () {
        var arr = new Jarray({a : "a"}, {b : "b"}, {c : "c"});

        arr.removeAt(999);

        equal(arr.count(), 3, "Jarray.removeAt");
        equal(arr.elementAt(2).c, "c", "Jarray.removeAt");
    });


    test("T0011 : Jarray.copy", function () {
        var arr = new Jarray(1, 2, 3, 4, 5),
            result,
            i;

        result = arr.copy();

        equal(result.count(), arr.count(), "Jarray.copy");

        for (i = 0; i < arr.count(); i += 1) {
            equal(result.elementAt(i), arr.elementAt(i), "Jarray.copy: " + i);
        }
    });

    test("T0012 : Jarray.copy", function () {
        var arr = new Jarray(),
            result,
            i;

        result = arr.copy();

        equal(result.count(), arr.count(), "Jarray.copy");

        for (i = 0; i < arr.count(); i += 1) {
            equal(result[i], arr[i], "Jarray.copy: " + i);
        }
    });

    test("T0013 : Jarray.insertAt", function () {
        var arr = new Jarray([1, 2, 3, 4, 5, 6]);

        arr.insertAt(3, 'X');

        equal(arr.count(), 7, "Jarray.insertAt");
        equal(arr.at(0), 1, "Jarray.insertAt");
        equal(arr.at(6), 6, "Jarray.insertAt");
        equal(arr.at(3), 'X', "Jarray.insertAt");
    });


    test("T0014 : Jarray.insertAt", function () {
        var arr = new Jarray([1, 2, 3, 4, 5, 6]);

        arr.insertAt(-1, 'X');// insert at penultimate position

        equal(arr.count(), 7, "Jarray.insertAt");
        equal(arr.elementAt(0), 1, "Jarray.insertAt");
        equal(arr.elementAt(6), 6, "Jarray.insertAt");
        equal(arr.elementAt(5), 'X', "Jarray.insertAt");
    });


    test("T0015 : Jarray.insertAt", function () {
        var arr = new Jarray([1, 2, 3, 4, 5, 6]);

        arr.insertAt(999, 'X'); //out of bounds, insert at end

        equal(arr.count(), 7, "Jarray.insertAt");
        equal(arr.elementAt(0), 1, "Jarray.insertAt");
        equal(arr.elementAt(5), 6, "Jarray.insertAt");
        equal(arr.elementAt(6), 'X', "Jarray.insertAt");
    });

    test("T0016 : Jarray.reverse", function () {
        var arr = new Jarray([1, 2, 3, 4, 5, 6]);

        arr.reverse();

        equal(arr.count(), 6, "Jarray.reverse");
        equal(arr.elementAt(0), 6, "Jarray.reverse");
        equal(arr.at(1), 5, "Jarray.reverse");
        equal(arr.elementAt(2), 4, "Jarray.reverse");
        equal(arr.elementAt(3), 3, "Jarray.reverse");
        equal(arr.elementAt(4), 2, "Jarray.reverse");
        equal(arr.elementAt(5), 1, "Jarray.reverse");
    });

    test("T0017 : Jarray.reverse", function () {
        var arr = new Jarray([]);
        arr.reverse();

        equal(arr.count(), 0, "Jarray.reverse");
    });

    test("T0018 : Jarray.reverse", function () {
        var arr = new Jarray();
        arr.reverse();
        equal(arr.count(), 0, "Jarray.reverse");
    });

    test("T0019 : Jarray.where", function () {
        var arr = new Jarray([1, 2, 3, 4, 5, 6]),
            result = arr.where(function (item) {
                return item > 3;
            });

        equal(result.count(), 3, "Jarray.where");
        equal(result.elementAt(0), 4, "Jarray.where");
        equal(result.elementAt(1), 5, "Jarray.where");
        equal(result.elementAt(2), 6, "Jarray.where");
    });


    test("T0020 : Jarray.where", function () {
        var arr = new Jarray({value : 1}, {value : 2}, {value : 3}, {value : 4}, {value : 5}, {value : 6}),
            result = arr.where(function (item) {
                return item.value <= 3;
            });

        equal(result.count(), 3, "Jarray.where");
        equal(result.elementAt(0).value, 1, "Jarray.where");
        equal(result.elementAt(1).value, 2, "Jarray.where");
        equal(result.elementAt(2).value, 3, "Jarray.where");
    });

    test("T0021 : Jarray.orderBy", function () {
        var arr = new Jarray({value : 4}, {value : 1}, {value : 5}, {value : 2}, {value : 6}, {value : 3}),
            result = arr.orderBy(function (item) {
                return item.value;//order by value property
            });

        equal(result.count(), 6, "Jarray.orderBy");
        equal(result.elementAt(0).value, 1, "Jarray.orderBy");
        equal(result.elementAt(1).value, 2, "Jarray.orderBy");
        equal(result.elementAt(2).value, 3, "Jarray.orderBy");
        equal(result.elementAt(3).value, 4, "Jarray.orderBy");
        equal(result.elementAt(4).value, 5, "Jarray.orderBy");
        equal(result.elementAt(5).value, 6, "Jarray.orderBy");
    });

    test("T0022 : Jarray.orderBy", function () {
        var arr = new Jarray({name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.orderBy(function (item) {
                return item.name;//order by value property
            });

        equal(result.count(), 6, "Jarray.orderBy");
        equal(result.elementAt(0).name, "blue", "Jarray.orderBy");
        equal(result.elementAt(1).name, "green", "Jarray.orderBy");
        equal(result.elementAt(2).name, "orange", "Jarray.orderBy");
        equal(result.elementAt(3).name, "purple", "Jarray.orderBy");
        equal(result.elementAt(4).name, "red", "Jarray.orderBy");
        equal(result.elementAt(5).name, "yellow", "Jarray.orderBy");
    });

    test("T0023 : Jarray.orderByDescending", function () {
        var arr = new Jarray({value : 4}, {value : 1}, {value : 5}, {value : 2}, {value : 6}, {value : 3}),
            result = arr.orderByDescending(function (item) {
                return item.value;//order by value property
            });

        equal(result.count(), 6, "Jarray.orderBy");
        equal(result.elementAt(0).value, 6, "Jarray.orderBy");
        equal(result.elementAt(1).value, 5, "Jarray.orderBy");
        equal(result.elementAt(2).value, 4, "Jarray.orderBy");
        equal(result.elementAt(3).value, 3, "Jarray.orderBy");
        equal(result.elementAt(4).value, 2, "Jarray.orderBy");
        equal(result.elementAt(5).value, 1, "Jarray.orderBy");
    });

    test("T0024 : Jarray.orderByDescending", function () {
        var arr = new Jarray({name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.orderByDescending(function (item) {
                return item.name;//order by value property
            });

        equal(result.count(), 6, "Jarray.orderBy");
        equal(result.elementAt(0).name, "yellow", "Jarray.orderBy");
        equal(result.elementAt(1).name, "red", "Jarray.orderBy");
        equal(result.elementAt(2).name, "purple", "Jarray.orderBy");
        equal(result.elementAt(3).name, "orange", "Jarray.orderBy");
        equal(result.elementAt(4).name, "green", "Jarray.orderBy");
        equal(result.elementAt(5).name, "blue", "Jarray.orderBy");
    });

    test("T0025 : Jarray.selectMany", function () {
        var arr = new Jarray({name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.selectMany(function (item) {
                return item.name;//order by value property
            });

        equal(result.count(), 6, "Jarray.selectMany");
        equal(result.elementAt(0), "red", "Jarray.selectMany");
        equal(result.elementAt(1), "green", "Jarray.selectMany");
        equal(result.elementAt(2), "blue", "Jarray.selectMany");
        equal(result.elementAt(3), "purple", "Jarray.selectMany");
        equal(result.elementAt(4), "orange", "Jarray.selectMany");
        equal(result.elementAt(5), "yellow", "Jarray.selectMany");
    });

    test("T0026 : Jarray.selectMany", function () {
        var arr = new Jarray(),
            result = arr.selectMany(function (item) {
                return item.name;//order by value property
            });

        equal(result.count(), 0, "Jarray.selectMany");
    });


    test("T0027 : Jarray.count", function () {
        var arr = new Jarray([1, 2, 3, 4, 5, 6]),
            result = arr.count();

        equal(result, 6, "Jarray.count");
    });

    test("T0028 : Jarray.count", function () {
        var arr = new Jarray([1, 2, 3, 4, 5, 6]),
            result = arr.count(function (item) { return item > 3; });

        equal(result, 3, "Jarray.count");
    });


    test("T0029 : Jarray.distinct", function () {
        var arr = new Jarray(1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 5, 6),
            result = arr.distinct(function (item1, item2) {
                return item1 == item2;
            });

        equal(result.count(), 6, "Jarray.distinct");
        equal(result.elementAt(0), 1, "Jarray.distinct");
        equal(result.elementAt(1), 2, "Jarray.distinct");
        equal(result.elementAt(2), 3, "Jarray.distinct");
        equal(result.elementAt(3), 4, "Jarray.distinct");
        equal(result.elementAt(4), 5, "Jarray.distinct");
        equal(result.elementAt(5), 6, "Jarray.distinct");
    });

    test("T0030 : Jarray.distinct", function () {
        var arr = new Jarray(1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 5, 6),
            result = arr.distinct();

        equal(result.count(), 6, "Jarray.distinct");
        equal(result.elementAt(0), 1, "Jarray.distinct");
        equal(result.elementAt(1), 2, "Jarray.distinct");
        equal(result.elementAt(2), 3, "Jarray.distinct");
        equal(result.elementAt(3), 4, "Jarray.distinct");
        equal(result.elementAt(4), 5, "Jarray.distinct");
        equal(result.elementAt(5), 6, "Jarray.distinct");
    });

    test("T0031 : Jarray.distinct", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.distinct(function (item1, item2) {
                return item1.name == item2.name;
            });

        equal(result.count(), 6, "Jarray.distinct");
    });

    test("T0032 : Jarray.distinct", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.distinct(function (item1, item2) {
                return item1.value == item2.value;
            });

        equal(result.count(), 8, "Jarray.distinct");
    });

    test("T0033 : Jarray.distinct", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.distinct();

        equal(result.count(), 8, "Jarray.distinct");
    });

    test("T0034 : Jarray.any", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.any(function (item) {
                return item.value > 50;
            });

        equal(result, true, "Jarray.any");
    });

    test("T0035 : Jarray.any", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.any(function (item) {
                return item.value > 999;
            });

        equal(result, false, "Jarray.any");
    });

    test("T0036 : Jarray.all", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.all(function (item) {
                return item.value > 50;
            });

        equal(result, false, "Jarray.any");
    });

    test("T0037 : Jarray.all", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.all(function (item) {
                return item.value > 0;
            });

        equal(result, true, "Jarray.any");
    });

    test("T0038 : Jarray.first", function () {
        var arr = new Jarray({name: "red", value : 49}, {name: "red", value : 4}, {name: "green", value : 111}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.first(function (item) {
                return item.value > 50;
            });

        equal(result.name, "green", "Jarray.first");
    });

    test("T0039 : Jarray.first", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.first();

        equal(result.name, "red", "Jarray.first");
    });

    test("T0040 : Jarray.last", function () {
        var arr = new Jarray({name: "red", value : 49}, {name: "red", value : 4}, {name: "green", value : 111}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.last(function (item) {
                return item.value > 50;
            });

        equal(result.name, "blue", "Jarray.first");
    });

    test("T0041 : Jarray.last", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.last();

        equal(result.name, "yellow", "Jarray.last");
    });

    test("T0042 : Jarray.elementAt", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.elementAt(3);

        equal(result.name, "blue", "Jarray.elementAt");
    });

    test("T0043 : Jarray.elementAt", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.elementAt(333);

        equal(result, null, "Jarray.elementAt");
    });

    test("T0044 : Jarray.intersect", function () {
        var arr1 = new Jarray([1, 2, 3, 4, 5, 6]),
            arr2 = [3, 5, 6, 7, 8, 9],
            result = arr1.intersect(arr2, function (item1, i1, item2, i2) {
                return item1 == item2;
            });

        equal(result.count(), 3, "Jarray.intersect");
        equal(result.elementAt(0), 3, "Jarray.intersect");
        equal(result.elementAt(1), 5, "Jarray.intersect");
        equal(result.elementAt(2), 6, "Jarray.intersect");
    });

    test("T0045 : Jarray.intersect", function () {
        var arr1 = new Jarray([1, 2, 3, 4, 5, 6]),
            arr2 = new Jarray([3, 5, 6, 7, 8, 9]),
            result = arr1.intersect(arr2);

        equal(result.count(), 3, "Jarray.intersect");
        equal(result.elementAt(0), 3, "Jarray.intersect");
        equal(result.elementAt(1), 5, "Jarray.intersect");
        equal(result.elementAt(2), 6, "Jarray.intersect");
    });

    test("T0046 : Jarray.intersect", function () {
        var arr1 = new Jarray([1, 2, 3, 4, 5, 6]),
            arr2 = [],
            result = arr1.intersect(arr2);

        equal(result.count(), 0, "Jarray.intersect");
    });

    test("T0047 : Jarray.notIntersect", function () {
        var arr1 = new Jarray([1, 2, 3, 4, 5, 6]),
            arr2 = [3, 5, 6, 7, 8, 9],
            result = arr1.notIntersect(arr2);

        equal(result.count(), 3, "Jarray.notIntersect");
        equal(result.elementAt(0), 1, "Jarray.notIntersect");
        equal(result.elementAt(1), 2, "Jarray.notIntersect");
        equal(result.elementAt(2), 4, "Jarray.notIntersect");
    });

    test("T0048 : Jarray.notIntersect", function () {
        var arr1 = new Jarray([1, 2, 3, 4, 5, 6]),
            arr2 = new Jarray([3, 5, 6, 7, 8, 9]),
            result = arr1.notIntersect(arr2);

        equal(result.count(), 3, "Jarray.notIntersect");
        equal(result.elementAt(0), 1, "Jarray.notIntersect");
        equal(result.elementAt(1), 2, "Jarray.notIntersect");
        equal(result.elementAt(2), 4, "Jarray.notIntersect");
    });

    test("T0049 : Jarray.notIntersect", function () {
        var arr1 = new Jarray([1, 2, 3, 4, 5, 6]),
            arr2 = [],
            result = arr1.notIntersect(arr2);

        equal(result.count(), 6, "Jarray.notIntersect");
    });

    test("T0050 : Jarray.defaultIfEmpty", function () {
        var arr = new Jarray(),
            result = arr.defaultIfEmpty({name: "default"});

        equal(result.name, "default", "Jarray.defaultIfEmpty");
    });

    test("T0051 : Jarray.defaultIfEmpty", function () {
        var arr = new Jarray({name: "first"}),
            result = arr.defaultIfEmpty([{name: "default"}]);

        equal(result.count(), 1, "Jarray.defaultIfEmpty");
    });

    test("T0052 : Jarray.elementAtOrDefault", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.elementAtOrDefault(5, {name: "default", value : 0});

        equal(result.name, "purple", "Jarray.elementAtOrDefault");
    });

    test("T0053 : Jarray.elementAtOrDefault", function () {
        var arr = new Jarray({name: "red", value : 99}, {name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "blue", value : 88}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.elementAtOrDefault(55, {name: "default", value : 0});

        equal(result.name, "default", "Jarray.elementAtOrDefault");
    });

    test("T0054 : Jarray.firstOrDefault", function () {
        var arr = new Jarray([1, 2, 3, 4, 5, 6]),
            result = arr.firstOrDefault(999);

        equal(result, 1, "Jarray.firstOrDefault");
    });

    test("T0055 : Jarray.firstOrDefault", function () {
        var arr = new Jarray(),
            result = arr.firstOrDefault(999);

        equal(result, 999, "Jarray.firstOrDefault");
    });

    test("T0056 : Jarray.lastOrDefault", function () {
        var arr = new Jarray([1, 2, 3, 4, 5, 6]),
            result = arr.lastOrDefault(999);

        equal(result, 6, "Jarray.lastOrDefault");
    });

    test("T0057 : Jarray.lastOrDefault", function () {
        var arr = new Jarray(),
            result = arr.lastOrDefault(999);

        equal(result, 999, "Jarray.lastOrDefault");
    });

    test("T0058 : Jarray.select", function () {
        var arr = new Jarray({name: "red", value : 4}, {name: "green", value : 1}, {name : "blue", value : 5}, {name : "purple", value : 2}, {name: "orange", value : 6}, {name: "yellow", value : 3}),
            result = arr.select(function (item) {
                return item.name;//order by value property
            });

        equal(result.count(), 6, "Jarray.select");
        equal(result.elementAt(0), "red", "Jarray.select");
        equal(result.elementAt(1), "green", "Jarray.select");
        equal(result.elementAt(2), "blue", "Jarray.select");
        equal(result.elementAt(3), "purple", "Jarray.select");
        equal(result.elementAt(4), "orange", "Jarray.select");
        equal(result.elementAt(5), "yellow", "Jarray.select");
    });

    test("T0059 : Jarray.select", function () {
        var arr = new Jarray(),
            result = arr.select(function (item) {
                return item.name;//order by value property
            });

        equal(result.count(), 0, "Jarray.select");
    });

    test("T0060 : Jarray.orderBy", function () {
        var arr = new Jarray(5, 4, 7, 8, 4, 3, 44, 5, 6, 3456, 7, 3),
            result = arr.orderBy();

        equal(result.count(), 12, "Jarray.orderBy");
        equal(result.at(0), 3, "Jarray.orderBy");
        equal(result.at(1), 3, "Jarray.orderBy");
        equal(result.at(2), 4, "Jarray.orderBy");
        equal(result.at(3), 4, "Jarray.orderBy");
        equal(result.at(4), 5, "Jarray.orderBy");
        equal(result.at(11), 3456, "Jarray.orderBy");
    });
    
    test("T0061 : Jarray.toArray", function () {
        var arr = new Jarray(5, 4, 7, 8, 4, 3, 44, 5, 6, 3456, 7, 3),
            result = arr.toArray();
        
        equal(arr.constructor.name, "Jarray", "Jarray.toArray");
        equal(result.constructor.name, "Array", "Jarray.toArray");
    });
}(ok, test, equal, Jarray));