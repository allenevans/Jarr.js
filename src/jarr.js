/*
 * Jarr.js  :   An extended Javascript ARRray like object with methods to create chainable queries.
 * Version  :   0.1.0
 * Date     :   21/05/2013
 * Author   :   Allen Evans
 *
 * ------------------------------------------------------------------------------------------------
    The MIT License (MIT)

    Copyright (c) 2013 Allen Evans

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
 */
(function (context) {
    "use strict";

    var Jarr = function Jarr(arr) {
        var i;

        if (arguments.length === 1) {
            if ((typeof arr === "object" && arr.constructor == Array) || arr instanceof Jarr) {
                this.push.apply(this, arr);
            } else {
                this.push(arr);
            }
        } else {
            for (i = 0; i < arguments.length; i += 1) {
                this.push(arguments[i]);
            }
        }
    };

    Jarr.prototype = [];
    Jarr.prototype.constructor = Jarr;

    /**
    *   @function contains.
    *   @description Check to see if the object exists in the array using indexOf.
    *   @param {Object} object Object to check existence of.
    *   @param {Function} clause Equality check function. Optional.
    *   @returns {Boolean} true if object exists in the array, else false.
    */
    Jarr.prototype.contains = function (object, clause) {

        if (clause) {
            var i;
            for (i = 0; i < this.length; i += 1) {
                if (clause(object, this[i]) === true) {
                    return true;
                }
            }
            return false;
        }
        return this.indexOf(object) >= 0;
    };

    /**
    *   @function add.
    *   @description Add object to the end of the array.
    *   @param {Object} item Object to add.
    *   @param {Boolean} doesNotContain (Optional) Node check. True to only add the object is if is not already a member of the array, or false to add the object to the end of the array without checking. Default = false.
    *   @returns {Jarr} this.
    */
    Jarr.prototype.add = function (item, doesNotContain) {
        if (!(doesNotContain && this.contains(item))) {
            this.push(item);
        }
        return this;
    };

    /**
    *   @function remove.
    *   @description Remove Object. Removes object from the array and returns it.
    *   @param {Object} item Object to be removed.
    *   @returns {Jarr} this.
    */
    Jarr.prototype.remove  = function (item) {
        //returns the removed object
        //else returns null
        var a = this, i = a.indexOf(item);

        if (i >= 0) {
            a.splice(i, 1);
        }
        return this;
    };

    /**
    *   @function removeAt.
    *   @description Remove At index. Removes object from the array at the specified index.
    *   @param {Integer} index Index of the object to remove where i >= 0 and i < array.length.
    *   @returns {Jarr} this.
    */
    Jarr.prototype.removeAt = function (index) {
        if (index >= 0 && index < this.length) {
            this.splice(index, 1);
        }
        return this;
    };

    /**
    *   @function copy.
    *   @description Copy array. Return an identical copy of this array.
    *   @returns {Jarr} Copy of the array.
    */
    Jarr.prototype.copy = function () {
        var i, r = [], a = this;
        for (i = 0; i < a.length; i += 1) {
            r.push(a[i]);
        }
        return new Jarr(r);
    };

    /**
    *   @function insertAt.
    *   @description Inserts item into the array at the specified index.
    *   @param {Integer} index Index where to insert the object.
    *   @param {Object} item Object to insert.
    *   @param {Boolean} doesNotContain Only insert if object does not already exist (default = false).
    *   @returns {Jarr} this.
    */
    Jarr.prototype.insertAt = function (index, item, doesNotContain) {
        var t = this;
        if (!(doesNotContain && t.contains(item))) {
            t.splice(index, 0, item);
        }
        return this;
    };

    /**
    *   @function where.
    *   @description Returns array based on filtering clause function.
    *   @param {Function} clause function which returns true or false. e.g. function (item){return item.property == "123";}.
    *   @returns {Jarr} Jarr of items which match the clause function.
    */
    Jarr.prototype.where = function (clause) {
        var i, ret = [], a = this;

        for (i = 0; i < a.length; i += 1) {
            if (clause(a[i], i)) {
                ret.push(a[i]);
            }
        }

        return new Jarr(ret);
    };

    /**
    *   @function orderBy.
    *   @description returns array of items ordered by clause.
    *   @param {Function} clause function returns property in object to order by e.g. function (item){return item.name;}.
    *   @returns {Jarr} Jarr of items ordered by the clause function.
    */
    Jarr.prototype.orderBy = function (clause) {
        var ret = this.copy();

        if (typeof clause != "function") {
            clause = function (v) { return v; };
        }

        return new Jarr(ret.sort(function (a, b) {
            var ca = clause(a), cb = clause(b);
            return (ca == cb) ? 0 : (ca < cb ? -1 : 1);
        }));
    };

    /**
    *   @function orderByDescending.
    *   @description returns array of items ordered by clause in descending order.
    *   @param {Function} clause function returns property in object to order by e.g. function (item){return item.name;}.
    *   @returns {Jarr} Jarr of items ordered by the clause function.
    */
    Jarr.prototype.orderByDescending = function (clause) {
        return this.orderBy(clause).reverse();
    };

    /**
    *   @function select.
    *   @description returns array of items.
    *   @param {Function} clause function returns new objects. nulls returned by function are excluded.
    *   @returns {Jarr} Jarr of new items generated by the caluse function.
    */
    Jarr.prototype.select = function (clause) {
        var i, ret = [], o, a = this;

        clause = clause || function (item) { return item; };

        for (i = 0; i < a.length; i += 1) {
            o = clause(a[i]);
            if (o !== null) {
                ret.push(o);
            }
        }

        return new Jarr(ret);
    };

    /**
    *   @function selectMany.
    *   @description returns array of items.
    *   @param {Function} select function returns new objects.
    *   @returns {Jarr} Jarr of new items generated by the caluse function.
    */
    Jarr.prototype.selectMany = function (select) {
        var i, ret = [], a = this;
        for (i = 0; i < a.length; i += 1) {
            ret = ret.concat(select(a[i]));
        }
        return new Jarr(ret);
    };

    /**
    *   @function count.
    *   @description returns the number of items in an array.
    *   @param {Function} clause optional clause function which filters (where) the items before counting.
    *   @returns {Jarr} Jarr of items ordered by the clause function.
    */
    Jarr.prototype.count = function (clause) {
        if (clause) {
            return this.where(clause).length;
        } else {
            return this.length;
        }
    };

    /**
    *   @function distinct.
    *   @description returns an array of distinct items.
    *   @param {Function} compare optional compare function which compares two elements together to see if they are the same.
    *           If not specified, uses JSON string to compare equality.
    *   @returns {Jarr} Jarr of items ordered by the clause function.
    */
    Jarr.prototype.distinct = function (compare) {
        var i, j, ret = new Jarr(), contains, a = this;

        for (i = 0; i < a.length; i += 1) {
            contains = ret.contains(a[i]);
            for (j = 0; !contains && j < ret.count(); j += 1) {
                if (compare && compare(a[i], ret.at(j))) {
                    contains = true;
                } else if (!compare && JSON.stringify(a[i]) == JSON.stringify(ret.at(j))) {
                    contains = true;
                }
            }

            if (!contains) {
                ret.add(a[i]);
            }
        }

        return ret;
    };

    /**
    *   @function any.
    *   @description returns true if array contains any element that matches the where clause.
    *   @param {Function} clause where clause.
    *   @returns {Boolean} True if array contains any element that matches the where clause.
    */
    Jarr.prototype.any = function (clause) {
        var a = this, i;
        for (i = 0; i < a.length; i += 1) {
            if (clause(a[i], i)) {
                return true;
            }
        }
        return false;
    };

    /**
    *   @function all.
    *   @description returns true if all objects in the array match the where clause.
    *   @param {Function} clause function.
    *   @returns {Boolean} True if array contains all objects matching the clause.
    */
    Jarr.prototype.all = function (clause) {
        var a = this, i;
        for (i = 0; i < a.length; i += 1) {
            if (!clause(a[i], i)) {
                return false;
            }
        }
        return true;
    };

    /**
    *   @function first.
    *   @description returns first object in the array.
    *   @param {Function} clause optional where clause to filter by.
    *   @returns {Object} First object in the array.
    */
    Jarr.prototype.first = function (clause) {
        if (clause) {
            return this.where(clause).first();
        } else if (this.count()) {
            return this.at(0);
        } else {
            return null;
        }
    };

    /**
    *   @function last.
    *   @description returns last object in the array.
    *   @param {Function} clause optional where clause to filter by.
    *   @returns {Object} Last object in the array.
    */
    Jarr.prototype.last = function (clause) {
        if (clause) {
            return this.where(clause).last();
        } else if (this.count()) {
            return this.at(this.count() - 1);
        } else {
            return null;
        }
    };

    /**
    *   @function elementAt.
    *   @description returns object at the given position.
    *   @param {int} position of the element within the array.
    *   @returns {Object} object in the array at the given position, else null.
    */
    Jarr.prototype.elementAt = function (position) {
        var a = this;
        if (position >= 0 && position < a.length) {
            return a[position];
        } else {
            return null;
        }
    };

    /**
    *   @function at.
    *   @description Alias of elementAt.
    *   @param {int} position of the element within the array.
    *   @returns {Object} object in the array at the given position, else null.
    */
    Jarr.prototype.at = function (position) {
        var a = this;
        if (position >= 0 && position < a.length) {
            return a[position];
        } else {
            return null;
        }
    };

    /**
    *   @function intersect.
    *   @description returns array of intersecting objects.
    *   @param {Array} arr array of items to check for intersects.
    *   @param {Function} clause optional function to customize the equality test.
    *   @returns {Jarr} joined array.
    */
    Jarr.prototype.intersect = function (arr, clause) {
        var clauseMethod = clause || function (item1, index1, item2, index2) { return item1 == item2; },
            i,
            j,
            res = [],
            a = this,
            ins = new Jarr(arr);

        if (typeof clause != "undefined") {
            clauseMethod = clause;
        }

        for (i = 0; i < a.length; i += 1) {
            for (j = 0; j < ins.count(); j += 1) {
                if (clauseMethod(a[i], i, ins.at(j), j)) {
                    res.push(a[i]);
                }
            }
        }
        return new Jarr(res);
    };

    /**
    *   @function notIntersect.
    *   @description returns array of non-intersecting objects.
    *   @param {Array} arr array of items to check for intersects.
    *   @param {Function} clause optional function to customize the equality test.
    *   @returns {Jarr} joined array.
    */
    Jarr.prototype.notIntersect = function (arr, clause) {
        var i, res = [], a = this, ins = new Jarr(arr);

        for (i = 0; i < a.length; i += 1) {
            if (!ins.contains(a[i], clause)) {
                res.push(a[i]);
            }
        }
        return new Jarr(res);
    };

    /**
    *   @function defaultIfEmpty.
    *   @description returns Jarr containing default object if array is empty.
    *   @param {Object} defaultValue default value to return if array is empty.
    *   @returns {Object} object returned if array is empty, else array is returned.
    */
    Jarr.prototype.defaultIfEmpty = function (defaultValue) {

        if (this.count()) {
            return this;
        } else {
            return new Jarr(defaultValue);
        }
    };

    /**
    *   @function elementAtOrDefault.
    *   @description returns element at specified position, else returns default value.
    *   @param {int} position of the element to return.
    *   @param {Object} defaultValue default value to return if no element is found at the specified position.
    *   @returns {Object} object at the given position, else the default value if nothing is found at the given position.
    */
    Jarr.prototype.elementAtOrDefault = function (position, defaultValue) {
        var a = this;
        if (position >= 0 && position < a.length) {
            return a[position];
        } else {
            return defaultValue;
        }
    };

    /**
    *   @function firstOrDefault.
    *   @description returns element at the first position, else returns default value.
    *   @param {Object} defaultValue default value to return if no element is found at the first position.
    *   @returns {Object} object at the first position, else the default value if nothing is found.
    */
    Jarr.prototype.firstOrDefault = function (defaultValue) {
        return this.first() === null ? defaultValue : this.first();
    };

    /**
    *   @function lastOrDefault.
    *   @description returns element at the last position, else returns default value.
    *   @param {Object} defaultValue default value to return if no element is found at the last position.
    *   @returns {Object} object at the last position, else the default value if nothing is found.
    */
    Jarr.prototype.lastOrDefault = function (defaultValue) {
        return this.last() === null ? defaultValue : this.last();
    };

    /**
    *   @function toArray.
    *   @description Converts Jarr object to native JavaScript array.
    *   @returns {Object} object at the last position, else the default value if nothing is found.
    */
    Jarr.prototype.toArray = function () {
        return this.slice();
    };

    context.Jarr = Jarr;

}(typeof window != "undefined" ? window : (typeof module != "undefined" ? module : {})));