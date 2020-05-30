function mergeSort(items) {
  if (items.length <= 1) return items;

  const middleIndex = Math.floor(items.length / 2);

  const leftItems = items.slice(0, middleIndex);
  const rightItems = items.slice(middleIndex, items.length);

  return merge(mergeSort(leftItems), mergeSort(rightItems), ascending);
}

function merge(leftItems, rightItems, comparator) {
  let mergeItems = [];

  while (leftItems.length && rightItems.length) {
    let minValue;

    if (comparator(leftItems[0], rightItems[0])) {
      minValue = leftItems.shift();
    } else {
      minValue = rightItems.shift();
    }

    mergeItems.push(minValue);
  }

  if (leftItems.length) {
    mergeItems = mergeItems.concat(leftItems);
  }

  if (rightItems.length) {
    mergeItems = mergeItems.concat(rightItems);
  }

  return mergeItems;
}
