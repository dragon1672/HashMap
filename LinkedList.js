/*
 * Linked list developed by Anthony Corbin
 */
var LinkedList = (function() {

	var LinkedListNode = (function() {
		function LinkedListNode(value, previous, next) {
			this.value = value;
			this.previous = previous || null;
			this.next = next || null;
		}
		return LinkedListNode;
	})();
	
	function LinkedList() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	LinkedList.prototype.getSize = function () {
		return this.size;
	};

	LinkedList.prototype.addToEnd = function (val) {
		var nodeToAdd = null;
		if(this.head == null) { // tail also == null
			nodeToAdd = this.head = this.tail = new LinkedListNode(val);
		} else {
			nodeToAdd = new LinkedListNode(val, this.tail);
			this.tail.next = nodeToAdd;
			this.tail = nodeToAdd;
		}
		this.size++;
		return nodeToAdd;
	};

	LinkedList.prototype.addToBegining = function (val) {
		var nodeToAdd = null;
		if(this.head == null) { // tail also == null
			nodeToAdd = this.head = this.tail = new LinkedListNode(val);
		} else {
			nodeToAdd = new LinkedListNode(val, null, this.head);
			this.head.previous = nodeToAdd;
			this.head = nodeToAdd;
		}
		this.size++;
		return nodeToAdd;
	};

	LinkedList.prototype.pollFirst = function() {
		return (this.head || {}).value || null;
	};

	LinkedList.prototype.pollLast = function() {
		return (this.tail || {}).value || null;
	};

	LinkedList.prototype.pollFirstNode = function() {
		return this.head;
	};

	LinkedList.prototype.pollLastNode = function() {
		return this.tail;
	};

	LinkedList.prototype.popFirst = function() {
		ret = this.pollFirst();
		if(this.head === this.tail) {
			this.head = this.tail = null;
		} else {
			this.head = this.head.next;
			this.head.prevous = null;
		}
		this.size--;
		return ret;
	};

	LinkedList.prototype.popLast = function() {
		ret = this.pollLast();
		if(this.head === this.tail) {
			this.head = this.tail = null;
		} else {
			this.tail = this.tail.previous;
			this.tail.next = null;
		}
		this.size--;
		return ret;
	};

	LinkedList.prototype.removeNode = function(nodeToRemove) {
		if(nodeToRemove == this.head) {
			this.popFirst();
		} else if(nodeToRemove == this.tail) {
			this.popLast();
		} else if(nodeToRemove) {
			if(nodeToRemove.next) {
				nodeToRemove.next.previous = nodeToRemove.previous;
			}
			if(nodeToRemove.previous) {
				nodeToRemove.previous.next = nodeToRemove.next;
			}
			this.size--;
		}
	};

	LinkedList.prototype.toString = function() {
		var str = "{ ";
		var delim = '';
		var current = this.head;
		while(current != null) {
			str += delim;
			str += current.value;
			delim = ", ";
			current = current.next;
		}
	    return str + " }"
	}

	return LinkedList;
})();