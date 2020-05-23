/**
 *
 *  @param {number[]} originalItems
 * @return {number[]}
 *
 **/
function Quick(originalItems) {
  const items = [...originalItems];

  if (items.length <= 1) return items;

  const leftItems = [];
  const rightItems = [];

  const pivot = items.shift(); // first item
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

  const leftSortedItems = Quick(leftItems);
  const rightSortedItems = Quick(rightItems);

  return leftSortedItems.concat(centerItems, rightSortedItems);
}

// QuickSort inner place method practice ...
