import LinkedList from "../linkedList";

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  push(value) {
    this.linkedList.prepend();
  }

  pop() {
    const removedHead = this.linkedList.deleteHead();

    return removeHead ? removedHead.value : null;
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (this.isEmpty()) return null;

    return this.linkedList.head.value;
  }

  toArray() {
    return this.linkedList.toArray().map((node) => node.value);
  }

  // delegate to LinkedList toString()
  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
