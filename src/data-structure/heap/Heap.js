export class Heap {
  constructor() {
    if (new.target === Heap) {
      throw new TypeError("Cannot construct Heap instance directly");
    }

    this.heapContainer = [];
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
    const temp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = temp;
  }

  peek() {
    if (this.heapContainer.length === 0) return null;

    return this.heapContainer[0];
  }

  poll() {
    if (this.heapContainer.length === 0) return null;

    if (this.heapContainer.length === 1) return this.heapContainer[0];

    const root = this.heapContainer[0];

    this.heapContainer[0] = this.heapContainer.pop(); // last leaf
    this.heapifyDown(); // sort

    return root;
  }

  add(item) {
    this.heapContainer.push(item); // last leaf
    this.heapifyUp(); // sort

    return this;
  }

  find(item, comparator) {
    const foundItemsIndices = []; // index

    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
      if (comparator(item, this.heapContainer[itemIndex])) foundItemsIndices.push(itemIndex);
    }
  }

  // Max Heap: firstElement >= secondElement
  // Min Heap: firstElement <= secondElement
  pairIsInCorrectOrder(firstElement, secondElement) {
    throw new Error(
      `You have to implement heap pair comparison method for ${firstElement} and ${secondElement} values.`
    );
  }

  // heapifyUp
  heapifyUp(customStartIndex = this.heapContainer.length - 1) {
    let currentIndex = customStartIndex;

    // pairIsInCorrectOrder: false => swap condition
    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));

      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  // heapifyDown
  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      // max heap: first >= second
      // min heap: first <= second
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      // no swap
      if (this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break;
      }

      // finally
      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  remove(item, comparator) {
    const numberOfRemoves = this.find(item, comparator).length; // comparator delegation

    for (let iter = 0; iter < numberOfRemoves; iter += 1) {
      const indexToRemove = this.find(item, comparator).pop(); // new Removes

      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();

        const parentItem = this.parent(indexToRemove);

        // Min heap: pairIsInCorrectOrder()
        // Max heap: pairIsInCorrectOrder()
        if (
          this.hasLeftChild(indexToRemove) &&
          (!parentItem || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove]))
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }

    return this;
  }

  isEmpty() {
    return !this.heapContainer.length;
  }

  toString() {
    return this.heapContainer.toString();
  }
}
