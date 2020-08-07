// @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let r = 0;

  let s = prices[0]; // start index init
  for (let i = 1; i < prices.length; i += 1) {
    if (prices[i] - s > 0) {
      r += prices[i] - s; // accumlate
    }

    s = prices[i]; // start index update
  }

  return r;
};

// bubble
function maxProfit(prices) {
  let r = 0;

  // start index > 0
  for (let i = 1; i < prices.length; i += 1) {
    let p = prices[i - 1];
    let c = prices[i];

    if (p < c) r += c - p;
  }

  return r;
}
