/*
 * OrderedHashMap developed by Anthony Corbin
 */
var OrderedHashMap = (function() {
	function OrderedHashMap(array) {
		this.myTable = new HashTable();
		this.linkedList = new LinkedList();
		if(array instanceof Array) {
			this.addAll(array);
		}
	}
	OrderedHashMap.prototype.add = function (newKey, newVal) {
		if(this.containsKey(newKey)) {
			this.remove(newKey); // to update linked list
		}
		this.myTable.add(newKey,this.linkedList.addToEnd(newKey));
	};
	OrderedHashMap.prototype.put = OrderedHashMap.prototype.add;
	OrderedHashMap.prototype.get = function (key) { return (this.myTable.get(key)||{}).value; };
	OrderedHashMap.prototype.getFirstKey = function (key) { return this.linkedList.pollFirst(); };
	OrderedHashMap.prototype.getLastKey = function (key) { return this.myTable.pollLast(); };
	OrderedHashMap.prototype.remove = function (key) {
		nodeToRemove = this.myTable.get(key);
		this.myTable.remove(key);
		this.linkedList.removeNode(nodeToRemove);
	};
	OrderedHashMap.prototype.containsKey = function (key) {
		return this.myTable.containsKey(key);
	};
	OrderedHashMap.prototype.containsValue = function (val) {
		return this.myTable.containsValue(key);
	};
	OrderedHashMap.prototype.isEmpty = function () { return this.myTable.isEmpty(); };
	OrderedHashMap.prototype.size = function () {
		return this.myTable.size();
	};
	//pass in function(key,val)
	OrderedHashMap.prototype.foreachInSet = function(functionToRun) {
		var current = this.linkedList.head;
		while(current != null) {
			functionToRun(current.value,this.get(current.value));
			current = current.next;
		}
	};

	OrderedHashMap.prototype.map = HashTable.prototype.foreachInSet;

	OrderedHashMap.prototype.toString = function() {
		var str = "{ ";
		var delim = '';
		var current = this.linkedList.head;
		while(current != null) {
			str += delim;
			str += "{"+current.value+","+this.get(current.value)+"}";
			delim = ", ";
			current = current.next;
		}
	    return str + " }"
		return this.linkedList.toString();
	};

	return OrderedHashMap;
})();