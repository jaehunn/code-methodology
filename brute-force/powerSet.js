function powerSet(originalSet) {
  return powerSetRecur(originalSet);
}

function powerSetRecur(
  originalSet,
  allSubSets = [[]],
  currentSubSet = [],
  startAt = 0
) {
  for (let position = startAt; position < originalSet.length; position += 1) {
    currentSubSet.push(originalSet[position]);

    allSubSets.push([...currentSubSet]); // { -, ...currentSubSet }

    powerSetRecur(originalSet, allSubSets, currentSubSet, position + 1);

    currentSubSet.pop();
  }

  return allSubSets;
}
