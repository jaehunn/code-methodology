function mergeSort(items) {
  if (items.length <= 1) return items;

  const middleIndex = Math.floor(items.length / 2);

  const leftItems = items.slice(0, middleIndex);
  const rightItems = items.slice(middleIndex, items.length);

  // divide
  const leftSortedItems = mergeSort(leftItems);
  const rightSortedItems = mergeSort(rightItems);

  // merge
  return merge(leftSortedItems, rightSortedItems);
}

function merge(leftItems, rightItems) {
  let result = [];

  // after recursive call, sort
  while (leftItems.length && rightItems.length) {
    let minItem = null;

    if (leftItems[0] <= rightItems[0]) {
      minItem = leftItems.shift();
    } else {
      minItem = rightItems.shift();
    }

    result.push(minItem);
  }

  // rest item
  if (leftItems.length) {
    result = result.concat(leftItems);
  }

  if (rightItems.length) {
    result = result.concat(rightItems);
  }

  return result;
}
