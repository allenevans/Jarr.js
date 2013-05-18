(function (context) {
    "use strict";

    var Jarray   = function Jarray(arr) {
        var i;

        if (arguments.length === 1) {
            if ((typeof arr === "object" && arr.constructor == Array) || arr instanceof Jarray) {
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

    Jarray.prototype = new Array();
    Jarray.prototype.constructor = Jarray;

    /**
    *   @function indexOf.
    *   @description Returns the index position of the object within the array.
    *   @param {Object} o Object to be found.
    *   @returns {Integer} Index position of the found object, or -1 if not found.
    */
    Jarray.prototype.indexOf = function (o) {
        var r = -1, i, t = this;
        for (i = 0; i < t.length; i += 1) {
            if (t[i] == o) {
                r = i;
                i = t.length;
            }
        }

        return r;
    };

    /**
    *   @function contains.
    *   @description Check to see if the object exists in the array using {@link indexOf}.
    *   @param {Object} o Object to check existence of.
    *   @returns {Boolean} true if object exists in the array, else false.
    */
    Jarray.prototype.contains = function (o) {
        return this.indexOf(o) >= 0;
    };

    /**
    *   @function add.
    *   @description Add object to the end of the array.
    *   @param {Object} item Object to add.
    *   @param {Boolean} doesNotContain (Optional) Node check. True to only add the object is if is not already a member of the array, or false to add the object to the end of the array without checking. Default = false.
    *   @returns {Jarray} this.
    */
    Jarray.prototype.add = function (item, doesNotContain) {
        if (!(doesNotContain && this.contains(item))) {
            this.push(item);
        }
        return this;
    };

    /**
    *   @function remove.
    *   @description Remove Object. Removes object from the array and returns it.
    *   @param {Object} item Object to be removed.
    *   @returns {Jarray} this.
    */
    Jarray.prototype.remove  = function (item) {
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
    *   @returns {Jarray} this.
    */
    Jarray.prototype.removeAt = function (index) {
        if (index >= 0 && index < this.length) {
            this.splice(index, 1);
        }
        return this;
    };

    /**
    *   @function copy.
    *   @description Copy array. Return an identical copy of this array.
    *   @returns {Jarray} Copy of the array.
    */
    Jarray.prototype.copy = function () {
        var i, r = [], a = this;
        for (i = 0; i < a.length; i += 1) {
            r.push(a[i]);
        }
        return new Jarray(r);
    };

    /**
    *   @function insertAt.
    *   @description Inserts item into the array at the specified index.
    *   @param {Integer} index Index where to insert the object.
    *   @param {Object} item Object to insert.
    *   @param {Boolean} doesNotContain Only insert if object does not already exist (default = false).
    *   @returns {Jarray} this.
    */
    Jarray.prototype.insertAt = function (index, item, doesNotContain) {
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
    *   @returns {Jarray} Jarray of items which match the clause function.
    */
    Jarray.prototype.where = function (clause) {
        var i, ret = [], a = this;

        for (i = 0; i < a.length; i += 1) {
            if (clause(a[i], i)) {
                ret.push(a[i]);
            }
        }

        return new Jarray(ret);
    };

    /**
    *   @function orderBy.
    *   @description returns array of items ordered by clause.
    *   @param {Function} clause function returns property in object to order by e.g. function (item){return item.name;}.
    *   @returns {Jarray} Jarray of items ordered by the clause function.
    */
    Jarray.prototype.orderBy = function (clause) {
        var ret = this.copy();

        if (typeof clause != "function") {
            clause = function (v) { return v; };
        }

        return new Jarray(ret.sort(function (a, b) {
            var ca = clause(a), cb = clause(b);
            return (ca == cb) ? 0 : (ca < cb ? -1 : 1);
        }));
    };

    /**
    *   @function orderByDescending.
    *   @description returns array of items ordered by clause in descending order.
    *   @param {Function} clause function returns property in object to order by e.g. function (item){return item.name;}.
    *   @returns {Jarray} Jarray of items ordered by the clause function.
    */
    Jarray.prototype.orderByDescending = function (clause) {
        return this.orderBy(clause).reverse();
    };

    /**
    *   @function select.
    *   @description returns array of items.
    *   @param {Function} clause function returns new objects. nulls returned by function are excluded.
    *   @returns {Jarray} Jarray of new items generated by the caluse function.
    */
    Jarray.prototype.select = function (clause) {
        var i, ret = [], o, a = this;
        for (i = 0; i < a.length; i += 1) {
            o = clause(a[i]);
            if (o !== null) {
                ret.push(o);
            }
        }

        return new Jarray(ret);
    };

    /**
    *   @function selectMany.
    *   @description returns array of items.
    *   @param {Function} clause function returns new objects.
    *   @returns {Jarray} Jarray of new items generated by the caluse function.
    */
    Jarray.prototype.selectMany = function (clause) {
        var i, ret = [], a = this;
        for (i = 0; i < a.length; i += 1) {
            ret = ret.concat(clause(a[i]));
        }
        return new Jarray(ret);
    };

    /**
    *   @function count.
    *   @description returns the number of items in an array.
    *   @param {Function} clause optional clause function which filters (where) the items before counting.
    *   @returns {Jarray} Jarray of items ordered by the clause function.
    */
    Jarray.prototype.count = function (clause) {
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
    *   @returns {Jarray} Jarray of items ordered by the clause function.
    */
    Jarray.prototype.distinct = function (compare) {
        var i, j, ret = new Jarray(), contains, a = this;

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
    Jarray.prototype.any = function (clause) {
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
    Jarray.prototype.all = function (clause) {
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
    Jarray.prototype.first = function (clause) {
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
    Jarray.prototype.last = function (clause) {
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
    Jarray.prototype.elementAt = function (position) {
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
    Jarray.prototype.at = function (position) {
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
    *   @returns {Jarray} joined array.
    */
    Jarray.prototype.intersect = function (arr, clause) {
        var clauseMethod = typeof clause != "undefined" ? clause :
                            function (item1, index1, item2, index2) { return item1 == item2; },
            i,
            j,
            res = [],
            a = this,
            ins = new Jarray(arr);

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
        return new Jarray(res);
    };

    /**
    *   @function notIntersect.
    *   @description returns array of non-intersecting objects.
    *   @param {Array} arr array of items to check for intersects.
    *   @returns {Jarray} joined array.
    */
    Jarray.prototype.notIntersect = function (arr) {
        var i, res = [], a = this, ins = new Jarray(arr);

        for (i = 0; i < a.length; i += 1) {
            if (!ins.contains(a[i])) {
                res.push(a[i]);
            }
        }
        return new Jarray(res);
    };

    /**
    *   @function defaultIfEmpty.
    *   @description returns default object if array is empty.
    *   @param {Object} defaultValue default value to return if array is empty.
    *   @returns {Object} object returned if array is empty, else array is returned.
    */
    Jarray.prototype.defaultIfEmpty = function (defaultValue) {
        if (this.count()) {
            return this;
        } else {
            return defaultValue;
        }
    };

    /**
    *   @function elementAtOrDefault.
    *   @description returns element at specified position, else returns default value.
    *   @param {int} position of the element to return.
    *   @param {Object} defaultValue default value to return if no element is found at the specified position.
    *   @returns {Object} object at the given position, else the default value if nothing is found at the given position.
    */
    Jarray.prototype.elementAtOrDefault = function (position, defaultValue) {
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
    Jarray.prototype.firstOrDefault = function (defaultValue) {
        return this.first() === null ? defaultValue : this.first();
    };

    /**
    *   @function lastOrDefault.
    *   @description returns element at the last position, else returns default value.
    *   @param {Object} defaultValue default value to return if no element is found at the last position.
    *   @returns {Object} object at the last position, else the default value if nothing is found.
    */
    Jarray.prototype.lastOrDefault = function (defaultValue) {
        return this.last() === null ? defaultValue : this.last();
    };

    /**
    *   @function toArray.
    *   @description Converts Jarray object to native JavaScript array.
    *   @returns {Object} object at the last position, else the default value if nothing is found.
    */
    Jarray.prototype.toArray = function () {
        return this.slice();
    };

    context.Jarray = Jarray;

}(typeof window != "undefined" ? window : (typeof module != "undefined" ? module : {})));