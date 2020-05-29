// original, increase
function selectionSort(originalItems) {
  const items = [...originalItems];

  for (let targetIndex = 0; targetIndex < items.length - 1; targetIndex += 1) {
    let minIndex = targetIndex;

    for (let index = targetIndex + 1; index < items.length; index += 1) {
      if (items[targetIndex] > items[index]) {
        minIndex = index;
      }
    }

    if (targetIndex !== minIndex) {
      [items[targetIndex], items[minIndex]] = [items[minIndex], items[targetIndex]];
    }
  }

  return items;
}

// Functional Programming

// Absctraction: if condition
function _selectionSort(originalItems, comparator) {
  const items = [...originalItems];

  for (let index = 0; index < items.length; index += 1) {
    let targetIndex = index;

    for (let currentIndex = index + 1; currentIndex < items.length; currentIndex += 1) {
      if (comparator(items[targetIndex], items[currentIndex])) {
        targetIndex = currentIndex;
      }
    }
    // swap
    if (targetIndex !== index) {
      [items[targetIndex], items[index]] = [items[index], items[targetIndex]];
    }
  }

  return items;
}

const ascending = (value, other) => {
  return value > other;
};

// descending
const descending = (value, other) => {
  return value < other;
};
