/**
 * @param {number[]} nums
 * @return {number}
 */

// brute force
function maxSubArray(items) {
  let maxSubArrayStartIndex = 0;
  let maxSubArrayLength = 0;
  let maxSubArraySum = null; // not 0, null = not value

  // iterate
  for (let startIndex = 0; startIndex < items.length; startIndex += 1) {
    let subArraySum = 0; // init

    for (let subArrayLength = 1; subArrayLength < items.length - startIndex; subArrayLength += 1) {
      subArraySum += items[startIndex + subArrayLength - 1];

      // swap condition
      if (maxSubArraySum === null || subArraySum > maxSubArraySum) {
        // update
        maxSubArraySum = subArraySum;
        maxSubArrayStartIndex = startIndex;
        maxSubArrayLength = subArrayLength;
      }
    }
  }

  // 1234, 3456 => length: 4
  // endIndex - startIndex + 1 = length
  // endIndex + 1 = startIndex + length
  // slice(startIndex, startIndex + length
  return inputArray.slice(maxSubArrayStartIndex, maxSubArrayStartIndex + maxSubArrayLength);
}

// dynamic programming
function maxSubArray(items) {
  let maxSum = -Infinity;
  let currentSum = 0;

  let maxStartIndex = 0;
  let maxEndIndex = items.length - 1;
  let currentStartIndex = 0;

  items.forEach((currentNumber, currentIndex) => {
    currentSum += currentNumber;

    // update case
    if (maxSum < currentSum) {
      maxSum = currentSum;
      maxStartIndex = currentStartIndex;
      maxEndIndex = currentIndex;
    }

    // negative case
    if (currentSum < 0) {
      currentSum = 0; // drop
      currentStartIndex = currentIndex + 1; // next index
    }
  });

  // slice( [start ...end + 1) )
  return items.slice(maxStartIndex, maxEndIndex + 1);
}

var maxSubArray = function (nums) {
  let prev = 0;
  let max = -Number.MAX_VALUE;

  for (let i = 0; i < nums.length; i += 1) {
    prev = Math.max(prev + nums[i], nums[i]); // update condition

    max = Math.max(max, prev); // max memo
  }

  return max;
};

function _maxSubArray(nums) {
  let cur = nums[0];
  let res = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    if (cur < 0) cur = nums[i];
    // negative, move(next index)
    else cur += nums[i]; // positive, accumulate

    res = Math.max(res, cur); // memo res
  }

  return res;
}
