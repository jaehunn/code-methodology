import LinkedList from "../linked-list/LinkedList.js";

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (!this.linkedList.head) return null;

    return this.linkedList.head.value;
  }

  push(value) {
    this.linkedList.prepend(value);
  }

  pop() {
    const removedNode = this.linkedList.deletedHead(); // front

    return removedNode ? removedNode.value : null;
  }

  toArray() {
    return this.linkedList.toArray().map((node) => node.value);
  }
}
