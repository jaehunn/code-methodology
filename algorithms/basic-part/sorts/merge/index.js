// method
function mergeSort(items) {
  if (items.length === 1) return items;

  const midI = Math.floor(items.length / 2);
  const leftItems = items.slice(0, midI);
  const rightItems = items.slice(midI, items.length);

  return merge(mergeSort(leftItems), mergeSort(rightItems));
}

function merge(leftItems, rightItems) {
  let sortedItems = [];

  // sort
  while (leftItems.length && rightItems.length) {
    if (leftItems[0] <= rightItems[0]) {
      sortedItems.push(leftItems.shift());
    } else {
      sortedItems.push(rightItems.shift());
    }
  }

  return sortedItems.concat(leftItems, rightItems);
}

function _mergeSort(items) {
  if (items.length === 1) return items;

  const midI = Math.floor(items.length / 2);

  return _merge(_mergeSort(items.slice(0, midI)), _mergeSort(items.slice(midI, items.length)));
}

function _merge(leftItems, rightItems) {
  let leftI = 0;
  let rightI = 0;

  let sortedItems = [];

  while (leftI < leftItems.length && rightI < rightItems.length) {
    if (leftItems[leftI] <= rightItems[rightI]) {
      sortedItems.push(leftItems[leftI]);

      leftI += 1;
    } else {
      sortedItems.push(rightItems[rightI]);

      rightI += 1;
    }
  }

  // rest
  while (leftI < leftItems.length) sortedItems.push(leftItems[leftI++]);
  while (rightI < rightItems.length) sortedItems.push(rightItems[rightI++]);

  return sortedItems;
}

console.log(_mergeSort([1, 3, 4, 5, 2]));
