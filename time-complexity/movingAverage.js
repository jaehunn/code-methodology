function movingAverage(items, count) {
  const result = [];

  for (let targetIndex = count - 1; targetIndex < items.length; index += 1) {
    let targetSum = 0;

    for (let index = 0; index < count; index += 1) {
      targetSum += items[targetIndex - index];
    }

    result.push(targetSum / count);
  }

  return result;
}

function betterMovingAverage(items, count) {
  const result = [];

  let partialSum = 0;

  for (let index = 0; index < count - 1; index += 1) {
    partialSum += items[index];
  }

  for (let index = count - 1; index < items.length; index += 1) {
    partialSum += items[index];

    result.push(partialSum / count);

    partialSum -= items[index - (count - 1)];
  }

  return result;
}
