import { Comparator } from "../../utils";

export class MinHeap extends Heap {
  pairIsInCorrectOrder(one, two) {
    return this.compare.lessThanOrEqual(one, two);
  }
}

export class MaxHeap extends Heap {
  pairIsInCorrectOrder(one, two) {
    return this.compare.greaterThanOrEqual(one, two);
  }
}

class Heap {
  constructor(compareFunction) {
    if (new.target === Heap) {
      throw new TypeError(`Heap 클래스는 최소/최대 Heap 의 부모 클래스로 인스턴스를 가지지 못합니다.`);
    }

    this.heapContainer = [];
    this.compare = new Comparator(compareFunction);
  }

  getHeapLength() {
    return this.heapContainer.length;
  }

  getItem(index) {
    return this.heapContainer[index];
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

  hasLeftChild(parentIndex) {
    return getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasRightChild(parentIndex) {
    return getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) > -1;
  }

  getLeftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  getRightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  getParent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  swap(firstIndex, secondIndex) {
    return ([this.heapContainer[firstIndex], this.heapContainer[secondIndex]] = [
      this.heapContainer[secondIndex],
      this.heapContainer[firstIndex],
    ]);
  }

  peek() {
    if (this.isEmpty()) return null;

    return this.heapContainer[0];
  }

  isEmpty() {
    return !getHeapLength();
  }

  toString() {
    return this.heapContainer.toString(); // Array.toString()
  }

  find(item) {
    const foundItemIndices = [];

    for (let index = 0; index < this.getHeapLength(); index += 1) {
      if (this.compare.equal(item, this.getItem(index))) foundItemIndices.push(index);
    }

    return foundItemIndices;
  }

  // Min/Max class -> overriding
  pairIsInCorrectOrder(one, two) {
    throw new Error(`
      최소/최대 Heap 에서 해당 메서드가 구현되어있지 않습니다.
    `);
  }

  // bottom -> top
  heapifyUp(startIndex) {
    let currindex = startIndex || this.getHeapLength() - 1;

    while (this.hasParent(currindex) && !this.pairIsInCorrectOrder(this.parent(currIndex), this.getItem(currIndex))) {
      this.swap(currIndex, this.getParentIndex(currIndex));

      currIndex = this.getParentIndex(currIndex); // move
    }
  }

  // top -> bottom
  heapifyDown(startIndex) {
    let currIndex = startIndex || 0;
    let childIndex = null; // consider left, right child

    // left child ? exist childs : no-childs
    while (this.hasLeftChild(currIndex)) {
      if (
        this.hasRightChild(currIndex) &&
        this.pairIsInCorrectOrder(this.rightChild(currIndex), this.leftChild(currIndex))
      )
        childIndex = this.getRightChildIndex(currIndex);
      else childIndex = this.getLeftChildIndex(currIndex);

      // consider parent, select child
      // correct order, break while loop
      if (this.pairIsInCorrectOrder(this.getItem[childIndex], this.getItem[currIndex])) break;

      this.swap(currIndex, childIndex);
      currIndex = childIndex; // move bottom
    }
  }

  // + heapifyDown
  extract() {
    if (isEmpty()) return null;

    if (getHeapLength() === 1) return this.heapContainer.pop();

    const rootItem = this.heapContainer[0]; // save

    this.heapContainer[0] = this.heapContainer.pop(); // last leaf -> root place

    this.heapifyDown(); // top -> bottom

    return rootItem;
  }

  // + heapifyUp
  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();

    return this;
  }
}
