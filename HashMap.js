/*
 * Hash table developed by Anthony Corbin
//*/
var HashTable, HashMap;
 HashTable = HashMap = (function() {
	function HashTable() {
		this.pairs = [];
		this.numOfActiveIterations = 0;
		this._size = 0;
	}
	function KeyValuePair(hash, key, val) {
		this.hash = hash;
		this.key = key;
		this.val = val;
		this.markedForDel = false;
	}

	var hasher = function (value) {
		return (typeof value) + ' ' + (value instanceof Object ? (value.__hash || (value.__hash = ++arguments.callee.current)) : value.toString());
	};
	hasher.current = 0;

	HashTable.prototype.hashObject = hasher;
	KeyValuePair.prototype.containsKey = function (key) { return this.key === key; };
	KeyValuePair.prototype.containsVal = function (val) { return this.val === val; };
	HashTable.prototype.add = function (newKey, newVal) {
		var hash = this.hashObject(newKey);
		if (!this.containsKey(newKey)) {
			this.pairs[hash] = new KeyValuePair(hash, newKey, newVal);
			this._size++;
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
		var hash;
		if (this.containsKey(key)) {
			hash = this.hashObject(key);
			this.pairs[hash].markedForDel = true;
			delete this.pairs[hash];
			this._size--;
		}
	};
	HashTable.prototype.containsKey = function (key) {
		var hash = this.hashObject(key);
		return (this.pairs[hash] && (this.pairs[hash] instanceof KeyValuePair)) ? true : false;
	};
	HashTable.prototype.containsValue = function (val) {
		var ret = false;
		this.map(function(key,mapVal) {
			ret = ret || mapVal === val;
		});
		return ret;
	};
	HashTable.prototype.isEmpty = function () { return this.size() === 0; };
	HashTable.prototype.size = function () {
		return this._size;
	};
	//pass in function(key,val)
	HashTable.prototype.foreachInSet = function (theirFunction) {
		this.numOfActiveIterations++;
		for(var i in this.pairs) {
			if(!this.pairs[i].markedForDel) {
				theirFunction(this.pairs[i].key, this.pairs[i].val);
			}
		}
		this.numOfActiveIterations--;
	};
	HashTable.prototype.map = HashTable.prototype.foreachInSet;
	return HashTable;
}());