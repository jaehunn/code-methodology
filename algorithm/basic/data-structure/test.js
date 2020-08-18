const minHeapCorrectOrder = (a, b) => {
  return a <= b;
};

const maxHeapCorrectOrder = (a, b) => {
  return a >= b;
};

// !correctOrder => swap condition

const heapifyUp = (startIndex) => {
  let currentIndex = startIndex || 0;

  // parent, current
  while (hasParent(currentIndex) && !correctOrder()) {
    swap();

    move();
  }
};

const heapifyDown = (startIndex) => {
  let currentIndex = startIndex || 0;
  let nextIndex = null;

  // hasLeftChild() == isLeaf()
  while (hasLeftChild()) {
    nextIndex = hasRightChild() && correct(right, left); // max: r >= l, min: r <= l, anyway if true, then select right
  }
};

function remove(items, comparator = this.compare) {}
