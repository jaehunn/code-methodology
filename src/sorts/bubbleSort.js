function _bubbleSort(originalItems, comparator) {
  const items = [...originalItems];

  let swapped = false;

  for (let index = 1; index < items.length; index += 1) {
    swapped = false;

    for (let targetIndex = 0; targetIndex < items.length - index; targetIndex += 1) {
      if (comparator(items[targetIndex], items[targetIndex + 1])) {
        [items[targetIndex], items[targetIndex + 1]] = [items[targetIndex + 1], items[targetIndex]];

        swapped = true;
      }
    }

    // optimization
    if (!swapped) return items;
  }

  return items;
}
