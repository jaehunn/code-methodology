function _selectionSort(originalItems, comparator) {
  const items = [...originalItems];

  for (let index = 0; index < items.length; index += 1) {
    let targetIndex = index;

    for (let currentIndex = index + 1; currentIndex < items.length; currentIndex += 1) {
      if (comparator(items[targetIndex], items[currentIndex])) {
        targetIndex = currentIndex;
      }
    }

    if (targetIndex !== index) {
      [items[targetIndex], items[index]] = [items[index], items[targetIndex]];
    }
  }

  return items;
}

const ascending = (target, value) => target > value;
const descending = (target, value) => target < value;

console.log(_selectionSort([4, 5, 2, 3, 1], ascending));
