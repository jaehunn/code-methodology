// @see https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
/**
 * @param {number[]} prices
 * @return {number}
 */

// my code
var maxProfit = function (prices) {
  let r = 0;
  for (let i = 0; i < prices.length - 1; i += 1) {
    let c = 0;

    for (let j = i + 1; j < prices.length; j += 1) {
      c = Math.max(c, prices[j] - prices[i]); // negative -> 0
      r = Math.max(r, c);
    }
  }

  return r;
};

function maxProfit(prices) {
  let r = 0;
  let m = prices[0];

  // [7, 1, 3, 4, 6, 01]
  // each element (value - minimum start)
  for (let i = 1; i < prices.length; i += 1) {
    m = Math.min(pirces[i], m);
    r = Math.max(r, prices[i] - m);
  }

  return r;
}
