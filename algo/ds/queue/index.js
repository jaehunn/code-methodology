import LinkedList from "../linkedList";

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  enqueue(value) {
    return this.linkedList.append(value);
  }

  dequeue() {
    const removedHead = this.linkedList.deleteHead();

    return removedHead ? removedHead.value : nul;
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (this.isEmpty()) return null;

    return this.linkedList.head.value;
  }

  // delegate to LinkedList toString()
  toString(callback) {
    return this.linkedList.toString(callback);
  }
}
