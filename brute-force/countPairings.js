// given items list: [], items link matrix: [[]]
function countPairings(pairs = []) {
  let startIndex = -1;

  for (let index = 0; index < items.length; index += 1) {
    // find startIndex
    if (!pairs[index]) {
      startIndex = index;

      break;
    }
  }

  // all pairing
  if (startIndex === -1) return 1;

  let result;
  for (
    let targetIndex = startIndex + 1;
    targetIndex < items.length;
    targetIndex += 1
  ) {
    if (!pairs[targetIndex] && !itemsLink[startIndex][targetIndex]) {
      pairs[startIndex] = pairs[targetIndex] = true; // pairing

      result += countPairings(pairs);
      pairs[startIndex] = pairs[targetIndex] = false; // free
    }
  }

  return result;
}
