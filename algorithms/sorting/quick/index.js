// native
function quickSort(originalItems) {
  const items = [...originalItems];

  if (items.length === 1) return items;

  const leftItems = [];
  const rightItems = [];

  const pivot = items.shift(); // front -> pivot
  const centerItems = [pivot];

  while (items.length) {
    const currentItem = items.shift();

    if (pivot === currentItem) centerItems.push(currentItem);
    else if (pivot > currentItem) leftItems.push(currentItem);
    else rightItems.push(currentItem);
  }

  const leftSortedItems = quickSort(leftItems);
  const rightSortedItems = quickSort(rightItems);

  return leftSortedItems.concat(centerItems, rightSortedItems);
}

// in place
function quickSort(originalItems, lowI = 0, highI = originalItems.length - 1) {
  const items = [...originalItems];

  if (lowI < highI) {
    const partitionI = partitionItems(lowI, highI);

    quickSort(items, lowI, partitionI - 1);
    quickSort(items, partitionI, highI);
  }

  function partitionItems(lowI, highI) {
    const pivot = items[highI]; // last -> pivot

    let partitionI = lowI;
    for (let i = lowI; i < highI; i += 1) {
      if (items[i] <= pivot) {
        [partitionI, i] = [i, partitionI];

        partitionI += 1;
      }
    }

    [partitionI, highI] = [highI, partitionI];

    return partitionI;
  }

  return items;
}
