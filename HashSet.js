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
	
	HashSet.prototype.cross = function (that) {
		var ret = new HashSet();
		this.foreachInSet(function (a) {
			that.foreachInSet(function (b) {
				var toAdd = {
					0: a,
					1: b,
				};
				ret.add(toAdd);
			});
		});
		return ret;
	};
	HashSet.prototype.union = function (that) {
		var ret = new HashSet();
		this.foreachInSet(function (item) { ret.add(item); });
		that.foreachInSet(function (item) { ret.add(item); });
		return ret;
	};
	HashSet.prototype.join  = function (that) {
		var ret = new HashSet();
		this.myTable.foreachInSet(function (key, val) {
			if (that.contains(key)) { ret.add(key); }
		});
		return ret;
	};
	HashSet.prototype.removeSet = function (that) {
		that.foreachInSet(function(item) {
			this.remove(item); 
		});
	};
	HashSet.prototype.isEqual   = function (that) {
		return this.isSubsetOf(that) && that.isSuperSet(this);
	};
	HashSet.prototype.isSubSet  = function (that) {
		var ret = true;
		this.myTable.foreachInSet(function (item) {
			ret = ret && that.contains(item);
		});
		return ret;
	};
	HashSet.prototype.isSuperSet   = function (that) {
		return that.isSubSet(this);
	};
	HashSet.prototype.foreachInSet = function (theirFunction) {
		return this.myTable.foreachInSet(function(key,val) { theirFunction(key); });
	};
	HashSet.prototype.map = HashSet.prototype.foreachInSet;
	HashSet.prototype.toList = function () {
		var ret = [];
		this.foreachInSet(function (item) {
			ret.push(item);
		});
		return ret;
	};
	return HashSet;
})();