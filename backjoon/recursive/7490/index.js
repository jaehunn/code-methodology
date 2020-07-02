/**
 * @param {number} N
 * @return {string}
 */

// 3 <= N <= 9
// number list: n, between space: n - 1
// operator list: repitition 3P(n-1)
// expression = 3^(n-1)
// N = 9, 3^8 = Enable binary full search
function makeZero(N) {
  let r = [];
  for (let i = 1; i <= N; i += 1) {
    recur([], N - 1);
  }

  // eval()
  function recur(l, n) {
    // base case
    if (l.length === n) {
      r.concat(l);

      return;
    }

    l.push(" ");
    recur(l, n); // depth first
    l.pop();

    l.push("+");
    recur();
    l.pop();

    l.push("-");
    recur();
    l.pop();
  }
}
