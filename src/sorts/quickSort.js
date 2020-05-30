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

function quickSort_inPlace(items, start = 0, end = items.length - 1) {
  // not clone, modifying items and memory saving

  function partition(lowIndex, highIndex, comparator) {
    const pivot = items[highIndex];

    let partitionIndex = lowIndex;
    for (let index = lowIndex; index < highIndex; index += 1) {
      if (comparator(items[index], pivot)) {
        [items[index], items[partitionIndex]] = [items[partitionIndex], items[index]];
        partitionIndex += 1;
      }
    }

    [items[partitionIndex], items[highIndex]] = [items[highIndex], items[partitionIndex]];

    return partitionIndex;
  }

  if (start < end) {
    const partitionIndex = partition(start, end, function (target, value) {
      return target < value;
    });

    quickSort_inPlace(items, start, partitionIndex - 1);
    quickSort_inPlace(items, partitionIndex + 1, end);
  }

  return items;
}
