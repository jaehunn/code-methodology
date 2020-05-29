export default function _insertionSort(originalItems, comparator) {
  const items = [...originalItems];

  for (let index = 0; index < items.length; index += 1) {
    let targetIndex = index;

    while (targetIndex > 0 && comparator(items[targetIndex - 1], items[targetIndex])) {
      [items[targetIndex], items[targetIndex - 1]] = [items[targetIndex - 1], items[targetIndex]];

      targetIndex -= 1;
    }
  }

  return items;
}
