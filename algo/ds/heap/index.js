import Comparator from "../../../utils";

export class Heap {
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

  extract() {
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
    const indices = [];

    for (
      let itemIndex = 0;
      itemIndex < this.heapContainer.length;
      itemIndex += 1
    ) {
      if (comparator.equal(item, this.heapContainer[itemIndex]))
        indices.push(itemIndex);
    }

    return indices;
  }

  // abstract result of order
  // Max-heap: first >= second
  // Min-heap: first <= second
  correctOrder(first, second) {
    throw new Error(` You have to implement heap pair comparision method
    for ${first} and ${second} values.`);
  }

  // parent
  heapifyUp(startIndex) {
    let index = startIndex || this.heapContainer.length - 1;

    while (
      this.hasParent(index) &&
      !this.correctOrder(this.parent(index), this.heapContainer[index])
    ) {
      this.swap(index, this.getParentIndex(index)); // swap

      index = this.getParentIndex(index); // move
    }
  }

  // child, parent
  heapifyDown(startIndex) {
    let index = startIndex || 0;
    let nextIndex = null;

    while (this.hasLeftChild(index)) {
      nextIndex =
        this.hasRightChild(index) &&
        this.correctOrder(this.rightChild(index), this.leftChild(index))
          ? this.getRightChildIndex(index)
          : this.getLeftChildIndex(index);

      if (
        this.correctOrder(
          this.heapContainer[index],
          this.heapContainer[nextIndex]
        )
      )
        break;

      this.swap(index, nextIndex); // swap

      index = nextIndex; // move
    }
  }

  remove(item, comparator = this.compare) {
    const numberOfRemoves = this.find(item, comparator).length;

    for (let i = 0; i < numberOfRemoves; i += 1) {
      const index = this.find(item, comparator).pop();

      if (index === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[index] = this.heapContainer.pop(); // swap

        const parentItem = this.parent(index);

        // if no parent, then heapifyDown(), otherwise heapifyUp()
        // 1. leaf -> up()
        // 2. no leaf -> down()
        if (
          this.hasLeftChild(index) &&
          (!parentItem ||
            this.correctOrder(parentItem, this.heapContainer[index]))
        ) {
          this.heapifyDown(index);
        } else {
          this.heapifyUp(index);
        }
      }
    }

    return this;
  }
}

export class MaxHeap extends Heap {
  // overriding
  correctOrder(first, second) {
    return this.compare.greaterThanOrEqual(first, second);
  }
}

export class MinHeap extends Heap {
  // overriding
  correctOrder(first, second) {
    return this.compare.lessThanOrEqual(first, second);
  }
}
