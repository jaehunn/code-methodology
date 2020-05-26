export class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);

    this.head = newNode;

    if (!this.tail) this.tail = newNode;

    return this;
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

  delete(value) {
    if (!this.head) return null;

    let deletedNode = null;

    while (this.head && this.head.value === value) {
      deletedNode = this.head;

      this.head = this.head.next; // move
    }

    let currentNode = this.head; // target reference

    if (currentNode !== null) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;

          currentNode.next = currentNode.next.next; // new link
        } else {
          currentNode = currentNode.next; // move
        }
      }
    }

    if (this.tail.value === value) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  // use stack
  deleteHead() {
    if (!this.head) return null;

    const deletedNode = this.head;

    if (this.head.next) {
      this.head = this.head.next; // change
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedNode;
  }

  // use queue
  deleteTail() {
    const deletedNode = this.tail;

    if ((this.head = this.tail)) {
      this.head = null;
      this.tail = null;

      return deletedNode;
    }

    let currentNode = this.head; // target
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedNode;
  }

  find({ value = undefined, callback = undefined }) {
    if (!this.head) return null;

    let currentNode = this.head; // target reference

    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      // default finding condition
      if (value !== undfined && currentNode.value === value) {
        return currentNode;
      }

      currentNode = currentNode.next; // move
    }

    return null; // failed
  }

  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;

      currNode.next = prevNode;

      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }

  toArray() {
    const nodes = [];

    let currentNode = this.head; // target
    while (currentNode) {
      nodes.push(currentNode);

      currentNode = currentNode.next; // move
    }

    return nodes;
  }
}
