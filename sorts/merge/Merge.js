/**
 *
 * @param {number[]} items
 * @return {number[]}
 *
 *  */
// partition
function Merge(items) {
  if (items.length <= 1) return items;

  const middleIndex = Math.floor(items.length / 2);

  const leftItems = items.slice(0, middleIndex);
  const rightItems = items.slice(middleIndex, items.length);

  return MergeSort(Merge(leftItems), Merge(rightItems));
}

// sort
function MergeSort(leftItems, rightItems) {
  let mergeItems = [];

  while (leftItems.length && rightItems.length) {
    let minValue;

    if (leftItems[0] <= rightItems[0]) {
      minValue = leftItems.shift();
    } else {
      minValue = rightItems.shift();
    }

    mergeItems.push(minValue);
  }

  // check rest items
  if (leftItems.length) {
    mergeItems = mergeItems.concat(leftItems);
  }

  if (rightItems.length) {
    mergeItems = mergeItmes.concat(rightItems);
  }

  return mergeItems;
}

console.log(Merge([5, 4, 3, 2, 1]));
