/**
 *
 * @param {number[]} originalItems
 * @return {number}
 *
 *  */
function Insertion(originalItems) {
  const items = [...originalItems];

  for (let index = 0; index < items.length; index += 1) {
    let targetIndex = index;

    // swap condition
    // best case: already sorted (ascending)
    while (targetIndex > 0 && items[targetIndex] < items[targetIndex - 1]) {
      [items[targetIndex], items[targetIndex - 1]] = [items[targetIndex - 1], items[targetIndex]];

      targetIndex -= 1;
    }
  }

  return items;
}
