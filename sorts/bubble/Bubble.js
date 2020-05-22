/**
 *
 * @param {number[]} originalItems
 * @return {number}
 *
 */
function Bubble(originalItems) {
  const items = [...originalItems];

  let swapped = false;

  for (let index = 1; index < items.length; index += 1) {
    swapped = false; // reset

    // Sequentially Detecting and Swap
    // index => Min Value Space
    for (let targetIndex = 0; targetIndex < items.length - index; targetIndex += 1) {
      if (items[targetIndex] > items[targetIndex + 1]) {
        [items[targetIndex], items[targetIndex + 1]] = [items[targetIndex + 1], items[targetIndex]];

        swapped = true;
      }
    }

    if (!swapped) return items; // already sorted
  }

  return items;
}
