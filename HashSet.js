/*
 * Hash Set developed by Anthony Corbin
//*/
var HashSet = (function() {
	function HashSet() {
		this.myTable = new HashTable();
	}
	HashSet.prototype.add      = function (val)      { return this.myTable.add(val, true);       };
	HashSet.prototype.addAll   = function (vals)     { var potato = this; vals.map(function(item) { potato.myTable.add(item,true); }); };
	HashSet.prototype.contains = function (toCheck)  { return this.myTable.containsKey(toCheck); };
	HashSet.prototype.remove   = function (toRemove) { return this.myTable.remove(toRemove);     };
	HashSet.prototype.size     = function ()         { return this.myTable.size(); };
	HashSet.prototype.union = function (that) {
		var ret = new HashSet();
		this.myTable.foreachInSet(function (key, val) { ret.add(key); });
		that.myTable.foreachInSet(function (key, val) { ret.add(key); });
		return ret;
	};
	HashSet.prototype.join = function (that) {
		var ret = new HashSet();
		this.myTable.foreachInSet(function (key, val) {
			if (that.contains(key)) { ret.add(key); }
		});
		return ret;
	};
	HashSet.prototype.foreachInSet = function (theirFunction) {
		return this.myTable.foreachInSet(function(key,val) { theirFunction(key); });
	};
    HashSet.prototype.toList = function () {
        var ret = [];
		this.foreachInSet(function (item) {
            ret.push(item);
		});
        return ret;
	};
    return HashSet;
})();