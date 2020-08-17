import Comparator from "../../../utils";

export default class Heap {
  constructor(comparatorFunction) {
    if (new.target === Heap)
      throw new Error("Cannot construct Heap instance directly");

    this.heapContainer = [];
    this.compare = new Comparator(comparatorFunction);
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(indexOne, indexTwo) {
    [this.heapContainer[indexOne], this.heapContainer[indexTwo]] = [
      this.heapContainer[indexTwo],
      this.heapContainer[indexOne],
    ];
  }

  peek() {
    if (this.heapContainer.length === 0) return null;

    return this.heapContainer[0];
  }

  poll() {
    if (this.heapContainer.length === 0) return null;

    if (this.heapContainer.length === 1) return this.heapContainer.pop();

    const item = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop(); // swap
    this.heapifyDown(); // sort

    return item;
  }

  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();

    return this;
  }

  find(item, comparator = this.compare) {
    const foundItemIndices = [];

    for (
      let itemIndex = 0;
      itemIndex < this.heapContainer.length;
      itemIndex += 1
    ) {
      if (comparator.equal(item, this.heapContainer[itemIndex]))
        foundItemIndices.push(itemIndex);
    }

    return foundItemIndices;
  }

  remove(item, comparator = this.compare) {
    // WIP
  }
}
