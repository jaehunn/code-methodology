function movingAverage(items, average) {
  const result = [];

  for (let targetIndex = average - 1; targetIndex < items.length; index += 1) {
    let targetSum = 0;

    for (let index = 0; index < average; index += 1) {
      targetSum += items[targetIndex - index];
    }

    result.push(targetSum / average);
  }

  return result;
}

// optimization
function betterMovingAverage(items, average) {
  const result = [];

  let partialSum = 0;

  for (let index = 0; index < average - 1; index += 1) {
    partialSum += items[index];
  }

  for (let index = average - 1; index < items.length; index += 1) {
    partialSum += items[index];

    result.push(partialSum / average);

    partialSum -= items[index - (average - 1)];
  }

  return result;
}
