/**
 *
 * @param {number[]} originalItems
 * @return {number}
 *
 **/
function bubbleSort(originalItems) {
  const items = [...originalItems];

  let swapped = false;

  for (let index = 1; index < items.length; index += 1) {
    swapped = false;

    for (let targetIndex = 0; targetIndex < items.length - index; targetIndex += 1) {
      if (items[targetIndex] > items[targetIndex + 1]) {
        [items[targetIndex], items[targetIndex + 1]] = [items[targetIndex + 1], items[targetIndex]];

        swapped = true;
      }
    }

    // optimization
    if (!swapped) return items;
  }

  return items;
}

/**
 *
 * @param {number[]} items
 * @return {number[]}
 *
 **/
function mergeSort(items) {
  if (items.length <= 1) return items;

  const middleIndex = Math.floor(items.length / 2);

  const leftItems = items.slice(0, middleIndex);
  const rightItems = items.slice(middleIndex, items.length);

  return merge(mergeSort(leftItems), mergeSort(rightItems));
}

function merge(leftItems, rightItems) {
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

  if (leftItems.length) {
    mergeItems = mergeItems.concat(leftItems);
  }

  if (rightItems.length) {
    mergeItems = mergeItmes.concat(rightItems);
  }

  return mergeItems;
}

/**
 *
 *  @param {number[]} originalItems
 * @return {number[]}
 *
 **/
function quickSort(originalItems) {
  const items = [...originalItems];

  if (items.length <= 1) return items;

  const leftItems = [];
  const rightItems = [];

  const pivot = items.shift();
  const centerItems = [pivot];

  while (items.length) {
    const targetValue = items.shift();

    if (targetValue === pivot) {
      centerItems.push(targetValue);
    } else if (targetValue < pivot) {
      leftItems.push(targetValue);
    } else {
      rightItems.push(targetValue);
    }
  }

  const leftSortedItems = quickSort(leftItems);
  const rightSortedItems = quickSort(rightItems);

  return leftSortedItems.concat(centerItems, rightSortedItems);
}

/**
 *
 *  @param {number[]} items
 *  @return {number[]}
 *
 **/
function quickSort_inPlace(items, start = 0, end = items.length - 1) {
  // not clone

  /**
   *
   *  @param {number} lowIndex
   *  @param {number} highIndex
   *  @return {number}
   *
   **/
  function partition(lowIndex, highIndex) {
    const pivot = items[highIndex];

    let partitionIndex = lowIndex;
    for (let index = lowIndex; index < highIndex; index += 1) {
      if (items[index] < pivot) {
        [items[index], items[partitionIndex]] = [items[partitionIndex], items[index]];
        partitionIndex += 1;
      }
    }

    [items[partitionIndex], items[highIndex]] = [items[highIndex], items[partitionIndex]];

    return partitionIndex;
  }

  if (start < end) {
    const partitionIndex = partition(start, end);

    quickSort_inPlace(items, start, partitionIndex - 1);
    quickSort_inPlace(items, partitionIndex + 1, end);
  }

  return items;
}
