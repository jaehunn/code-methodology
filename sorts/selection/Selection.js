// Selection Sort
/**
 *
 * @param {number[]} originalItems
 * @return {number[]}
 *
 */
function Selection(originalItems) {
  const items = [...originalItems];

  // Sequentially Targeting
  for (let targetIndex = 0; targetIndex < items.length - 1; targetIndex += 1) {
    let minIndex = targetIndex;

    // Detecting Min Value
    for (let index = targetIndex + 1; index < items.length; index += 1) {
      if (items[targetIndex] > items[index]) {
        minIndex = index;
      }
    }

    // Swap
    if (items[targetIndex] !== items[minIndex]) {
      [items[targetIndex], items[minIndex]] = [items[minIndex], items[targetIndex]];
    }
  }

  return items;
}
