
(function () {

    if (!Array.indexOf) {
        Array.prototype.indexOf = function (obj, start) {
            for (var i = (start || 0) ; i < this.length; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
    }

    Array.prototype.indicesOf = function (items, start) {
        var indexList = {}, arrIndex, i, count = 0;
        for (i = (start || 0) ; i < this.length; i++) {
            arrIndex = items.indexOf(this[i]);
            if (arrIndex !== -1) {
                count++;
                indexList[items[arrIndex]] = i;
                items.splice(arrIndex, 1);
            }
            if (items.length === 0) {
                break;
            }
        }
        //indexList._count = count;
        return indexList;
    };

    /**
     * Returns a filtered data list from a 2D array (array of arrays/array of strings with a record separator).
     *  @param  items <string[]> items to be compared.
     *  @param  start <int> index to start the search.
     *  @param  searchFieldIndex <int> index of the field in a record to be searched.
     *          ex : if E should be searched from an array with [E|DES] headers.
     *               searchFieldIndex = 0
     *  @param  separator <string> [optional]  record separator( this will be used if records are separated from a separator).
     *  @param  skipSplice <boolean> [optional]  whether to skip the splice operation on items array.
     */
    Array.prototype.filter = function (items, start, searchFieldIndex, separator, skipSplice) {
        var filteredList = [], arrIndex, i, row;
        for (i = (start || 0) ; i < this.length; i++) {
            row = (VAL.Array(this[i])) ? this[i] : (separator) ? this[i].split(separator) : null;
            if (row && row[searchFieldIndex]) {
                arrIndex = items.indexOf(row[searchFieldIndex]);
                if (arrIndex !== -1) {
                    filteredList.push(this[i]);
                    if (skipSplice !== true) {
                        items.splice(arrIndex, 1);
                    }
                }
                if (items.length === 0) {
                    break;
                }
            }
        }
        return filteredList;
    };

    Array.prototype.union = function (items) {
        var obj = {}, i, k, res = [];
        for (i = 0; i < this.length; i++) {
            obj[this[i]] = this[i];
        }
        for (i = 0; i < items.length; i++) {
            obj[items[i]] = items[i];
        }
        for (k in obj) {
            if (obj.hasOwnProperty(k)) {
                res.push(obj[k]);
            }
        }
        return res;
    };

    Array.prototype.intersect = function (items) {
        var res = [], i, j, arrItems = items.clone();
        for (i = 0; i < this.length; i++) {
            for (j = 0; j < arrItems.length; j++) {
                if (this[i] === arrItems[j]) {
                    res.push(this[i]);
                    arrItems.splice(j, 1);
                    break;
                }
            }
        }
        return res;
    };

    Array.prototype.subset = function (items) {
        var obj = {}, i, k, res = [];
        for (i = 0; i < this.length; i++) {
            obj[this[i]] = undefined;
        }
        for (i = 0; i < items.length; i++) {
            if (obj.hasOwnProperty([items[i]])) {
                obj[items[i]] = items[i];
            }
        }
        for (k in obj) {
            if (obj.hasOwnProperty(k) && obj[k] !== undefined) {
                res.push(obj[k]);
            }
        }
        return res;
    };

    Array.prototype.unique = function () {
        return this.union([]);
    };

    Array.prototype.replaceInClone = function (oItem, nItem) {
        var val, i, res = [];
        for (i = 0; i < this.length; i++) {
            val = (this[i] === oItem) ? nItem : this[i];
            res.push(val);
        }
        return res;
    };

    Array.prototype.removeItems = function (itemsToRemove) {
        if (!/Array/.test(itemsToRemove.constructor)) {
            itemsToRemove = [itemsToRemove];
        }

        var j, i;
        for (i = 0; i < itemsToRemove.length; i++) {
            j = 0;
            while (j < this.length) {
                if (this[j] === itemsToRemove[i]) {
                    this.splice(j, 1);
                } else {
                    j++;
                }
            }
        }
        return this;
    };

    Array.prototype.count = function (val) {
        var count = 0, i;
        for (i = 0; i < this.length; i++) {
            if (this[i] === val) {
                count++;
            }
        }
        return count;
    };

    Array.prototype.clone = function () {
        return DFN.Util.getcObj(this);
    };

    String.prototype.replaceAll = function (oChar, nChar) {
        var str = this;
        while (str.indexOf(oChar) !== -1) {
            str = str.replace(oChar, nChar);
        }
        return str.toString();
    };

    String.prototype.trim = function () {
        var str = this.replace(/^\s*/, "").replace(/\s*$/, "");
        str = str.replaceAll("  ", " ");
        return str.toString();
    };

    String.prototype.isEmpty = function () {
        return this.trim() === "";
    };

    String.prototype.startsWith = function (str) {
        return (this.indexOf(str) === 0);
    };

    String.prototype.contains = function (str) {
        return (this.indexOf(str) >= 0);
    };

})();
