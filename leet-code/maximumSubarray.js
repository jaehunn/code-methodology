/**
 * @param {number[]} nums
 * @return {number}
 */

// brute force
function maxSubArray(items) {
  let maxSubArrayStartIndex = 0;
  let maxSubArrayLength = 0;
  let maxSubArraySum = null;

  // iterate
  for (let startIndex = 0; startIndex < items.length; startIndex += 1) {
    let subArraySum = 0; // init

    for (let length = 1; length < items.length - startIndex; length += 1) {
      subArraySum += items[startIndex + length - 1];

      // swap condition
      if (maxSubArraySum === null || subArraySum > maxSubArraySum) {
        // update
        maxSubArraySum = subArraySum;
        maxSubArrayStartIndex = startIndex;
        maxSubArrayLength = length;
      }
    }
  }

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
      currentStartIndex = currentIndex + 1; // move index
    }
  });

  // slice([start, end + 1)) = slice([start, end])
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

function maxSubArray(nums) {
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
