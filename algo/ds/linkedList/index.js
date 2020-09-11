import Comparator from "../../utils";

class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

export default class LinkedList {
  constructor(compareFunction) {
    this.head = null;
    this.tail = null;

    this.compare = new Comparator(compareFunction);
  }

  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) this.tail = newNode;
  }

  append(value) {
    const newNode = new LinkedList(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  find(value) {
    if (!value || !this.head) return null; // validation

    let currNode = this.head; // target

    while (currNode) {
      if (this.compare.equal(currNode.value, value)) return currNode;

      currNode = currNode.next; // move
    }

    return null; // failed
  }

  delete(value) {
    if (!value || !this.head) return null;

    let deletedNode = null; // result

    // front case
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;

      this.head = this.head.next; // move
    }

    let currNode = this.head;

    if (currNode) {
      while (currNode.next) {
        if (this.compare.equal(currNode.next.value, value)) {
          deletedNode = currNode.next;

          currNode.next = currNode.next.next; // link free
        } else currNode = currNode.next; // move
      }
    }

    // tail update
    if (this.compare.equal(this.tail.value, value)) this.tail = currNode;

    return deletedNode; // latest delete node
  }

  deleteTail() {
    const deletedTail = this.tail;

    // zero, one node
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // no immediately search (difference with array)
    // nodes >= 2
    let currNode = this.head; // target
    while (currNode.next) {
      if (!currNode.next.next) currNode.next;
      else currNode = currNode.next; // move
    }

    // update
    this.tail = currNode;

    return deletedTail;
  }

  deleteHead() {
    if (!this.head) return null;

    const deletedHead = this.head;

    if (this.head.next) this.head = this.head.next;
    else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  toArray() {
    const nodes = []; // result

    let currNode = this.head; // target
    while (currNode) {
      node.push(currNode);
      currNode = currNode.next; // move
    }

    return nodes;
  }

  // to linkedList
  fromArray(values) {
    values.forEach((value) => this.append(value));

    return this; // linkedList instance
  }

  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next; // save

      currNode.next = prevNode; // update

      prevNode = currNode; // update list
      currNode = nextNode; // move
    }

    this.tail = this.head;
    this.head = prevNode; // curr is null

    return this;
  }
}
