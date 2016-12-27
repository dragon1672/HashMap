/*
 * Ordered Hash Set developed by Anthony Corbin
 */
var OrderedHashSet = (function() {
	function OrderedHashSet(array) {
		this.backbone = new OrderedHashMap();
		if(array instanceof Array) {
			this.addAll(array);
		}
	}
	OrderedHashSet.prototype.add      = function (val)      { return this.backbone.add(val, true);       };
	OrderedHashSet.prototype.addAll   = function (vals)     { var potato = this; vals.map(function(item) { potato.backbone.add(item,true); }); };
	OrderedHashSet.prototype.contains = function (toCheck)  { return this.backbone.containsKey(toCheck); };
	OrderedHashSet.prototype.remove   = function (toRemove) { return this.backbone.remove(toRemove);     };
	OrderedHashSet.prototype.size     = function ()         { return this.backbone.size(); };

	OrderedHashSet.prototype.isEqual   = function (that) {
		return this.isSubsetOf(that) && that.isSuperSet(this);
	};
	OrderedHashSet.prototype.isSubSet  = function (that) {
		var ret = true;
		this.backbone.foreachInSet(function (item) {
			ret = ret && that.contains(item);
		});
		return ret;
	};
	OrderedHashSet.prototype.isSuperSet   = function (that) {
		return that.isSubSet(this);
	};
	OrderedHashSet.prototype.foreachInSet = function (theirFunction) {
		return this.backbone.foreachInSet(function(key,val) { theirFunction(key); });
	};
	OrderedHashSet.prototype.map = OrderedHashSet.prototype.foreachInSet;
	OrderedHashSet.prototype.toList = function () {
		var ret = [];
		this.foreachInSet(function (item) {
			ret.push(item);
		});
		return ret;
	};
	OrderedHashSet.prototype.toString = function() {
		var str = "{ ";
		var delim = '';
		var current = this.backbone.linkedList.head;
		while(current != null) {
			str += delim;
			str += current.value;
			delim = ", ";
			current = current.next;
		}
	    return str + " }"
		return this.linkedList.toString();
	};
	return OrderedHashSet;
})();