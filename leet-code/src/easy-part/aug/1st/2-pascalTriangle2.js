// @see https://leetcode.com/problems/pascals-triangle-ii/
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  let r = [1];

  for (let i = 1; i <= rowIndex; i += 1) {
    for (let j = i; j > 0; j -= 1) {
      if (j === i) r[j] = 1;
      else r[j] = r[j - 1] + r[j];
    }
  }

  return r;
};

/* 
    rowIndex = 3
    0: [1]
    1: [1, 1]
    2: [1, 2, 1]
    *3: [1, 3 ,3, 1]
    4: [1, 4, 6, 4, 1]
*/

var _getRow = function (rowIndex) {
  let r = [1];

  for (let i = 0; i < rowIndex; i += 1) {
    r.unshift(1);

    for (let j = 0; j <= i; j += 1) {
      r[j] = (r[j + 1] || 0) + (r[j + 2] || 0);
    }

    r.pop();
    r.unshift(1);
  }

  return r;
};

// rowIndex = 1
// [(1), 1]
// [1, 0] -> [1] -> [1, 1]

// rowIndex = 2
// [(1), 1, 1]
// [2, 1, 0] -> [2, 1] -> [1, 2, 1]

// rowIndex = 3
// [(1), 1, 2, 1]
// [3, 3, 1, 0] -> [3, 3, 1] -> [1, 3, 3, 1]
