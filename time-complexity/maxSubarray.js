// searching for all subarray
function maxSubarray(items) {
  let result = -1;

  for (let startIndex = 0; startIndex < items.length; startIndex += 1) {
    for (let endIndex = startIndex; endIndex < items.length; endIndex += 1) {
      let subSum = 0;

      for (
        let targetIndex = startIndex;
        targetIndex <= endIndex;
        targetIndex += 1
      ) {
        subSum += items[targetIndex];
      }

      result = Math.max(result, subSum);
    }
  }

  return result;
}

// optimization
function betterMaxSubarray(items) {
  let result;

  for (let startIndex = 0; startIndex < items.length; startIndex += 1) {
    let subSum = 0;

    for (let endIndex = startIndex; endIndex < items.length; endIndex += 1) {
      subSum += items[endIndex];

      result = Math.max(result, subSum);
    }
  }

  return result;
}

// divide and conquer
function divideAndConquerMaxSubarray(items, start, end) {
  if (start === end) return items[start];

  let middle = Math.floor((start + end) / 2);

  let leftMax = 0;
  let rightMax = 0;

  let sum = 0;

  for (let leftIndex = middle; leftIndex >= start; leftIndex -= 1) {
    sum += items[leftIndex];

    leftMax = Math.max(leftMax, sum);
  }

  sum = 0; // reset
  for (let rightIndex = middle + 1; rightIndex <= end; rightIndex += 1) {
    sum += items[rightIndex];

    rightMax = Math.max(rightMax, sum);
  }

  let singleSide = Math.max(
    divideAndConquerMaxSubarray(items, start, middle),
    divideAndConquerMaxSubarray(items, middle + 1, end)
  );

  return Math.max(leftMax + rightMax, singleSide);
}

function folmulaMaxSubarray(items) {
  let result = 0;
  let subSum = 0;

  for (let index = 0; index < items.length; index += 1) {
    subSum = Math.max(subSum, 0) + items[index];

    result = Math.max(result, subSum);
  }

  return result;
}
