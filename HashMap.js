var HashTable = (function() {
	function HashTable() {
		this.pairs = [];
		this.orderedPairs = [];
	}
	HashTable.prototype.hashObject = function (value) {
		return (typeof value) + ' ' + (value instanceof Object ? (value.__hash || (value.__hash = ++arguments.callee.current)) : value.toString());
	};
	HashTable.prototype.hashObject.current = 0;
	function KeyValuePair(hash, key, val) {
		this.hash = hash;
		this.key = key;
		this.val = val;
	}
	KeyValuePair.prototype.containsKey = function (key) { return this.key === key; };
	KeyValuePair.prototype.containsVal = function (val) { return this.val === val; };
	HashTable.prototype.add = function (newKey, newVal) {
		var hash = this.hashObject(newKey);
		if (!this.containsKey(newKey)) {
			this.pairs[hash] = new KeyValuePair(hash, newKey, newVal);
			this.orderedPairs.push(this.pairs[hash]);
		} else {
			this.pairs[hash].val = newVal;
		}
	};
	HashTable.prototype.put  = this.add;
	HashTable.prototype.get = function (key) {
		var hash = this.hashObject(key);
		if (this.pairs[hash] !== null) { return this.pairs[hash].val; }
		return null;
	};
	HashTable.prototype.remove = function (key) {
		var i, hash;
		if (this.containsKey(key)) {
			hash = this.hashObject(key);
			for (i = 0; i < this.orderedPairs.length; i++) {
				if (this.orderedPairs[i] === this.pairs[hash]) {
					this.orderedPairs.splice(i, 1);
					this.pairs[hash] = null;
					return;
				}
			}
			throw new Error("contain returned true, but key not found");
		}
	};
	HashTable.prototype.containsKey = function (key) {
		var hash = this.hashObject(key);
		return (this.pairs[hash] && (this.pairs[hash] instanceof KeyValuePair)) ? true : false;
	};
	HashTable.prototype.containsValue = function (val) {
		var ret = false;
		this.orderedPairs.map(function (item) {
			ret = ret || item.val === val;
		});
		return ret;
	};
	HashTable.prototype.isEmpty = function () { return this.size() === 0; };
	HashTable.prototype.size = function () { return this.orderedPairs.length; };
	//pass in function(key,val)
	HashTable.prototype.foreachInSet = function (theirFunction) {
		this.orderedPairs.map(function (item) {
			theirFunction(item.key, item.val);
		});
	};
	return HashTable;
}());