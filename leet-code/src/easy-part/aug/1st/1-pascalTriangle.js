// @see
/**
 * @param {number} numRows
 * @return {number[][]}
 */
// numRows === index + 1
// ex) numRows = 1, [[1]]
// ex) numRows = 2, [[1], [1, 1]]
var generate = function (numRows) {
  if (numsRows) return [];

  const r = [];
  for (let i = 0; i < numRows; i += 1) {
    let c = [];
    for (let j = 0; j <= i; j += 1) {
      // start, end => 1
      if (j === 0 || j === i) c.push(1);
      else c.push(r[i - 1][j - 1] + r[i - 1][j]);
    }

    r.push(c);
  }

  return r;
};

var _generate = function (numRows) {
  if (numRows) return [];

  let r = [[1]];
  for (let i = 1; i < numRows; i += 1) {
    r[i] = [];

    for (let j = 0; j <= i; j += 1) {
      r[i][j] = (r[i - 1][j] || 0) + (r[i - 1][j - 1] || 0);
    }
  }

  return r;
};
