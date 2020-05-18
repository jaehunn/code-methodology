function quickSort(items) {
  const result = [...items];

  if (items.length <= 1) return result;

  const pivot = result.shift();

  const leftItems = [];
  const rightItems = [];
  const centerItems = [pivot];

  // before recursive call, sort
  while (items.length) {
    const target = result.shift();

    if (target === pivot) {
      centerItems.push(target);
    } else if (target < pivot) {
      leftItems.push(target);
    } else {
      rightItems.push(target);
    }
  }

  const leftSortedItems = quickSort(leftItems);
  const rightSortedItems = quickSort(rightItems);

  // merge
  return leftSortedItems.concat(centerItems, rightSortedItems);
}
