/**
 * @param {number} N
 * @param {number[]} pos
 * @return {number}
 */

let c = 0;
function zGame(N, X, Y) {
  solve(2 ** N, 0, 0); // first call

  function solve(n, x, y) {
    // base case = detected
    if (n === 2) {
      if (x === X && y === Y) {
        console.log(c);
      }
      c += 1;

      if (x === X && y + 1 === Y) {
        console.log(c);
      }
      c += 1;

      if (x + 1 === X && y === Y) {
        console.log(c);
      }
      c += 1;

      if (x + 1 === X && y + 1 === Y) {
        console.log(c);
      }
      c += 1;

      return;
    }

    // recursions
    const size = Math.floor(n / 2);
    solve(size, x, y); // left-top
    solve(size, x, y + size); // right-top
    solve(size, x + size, y); // left-bottom
    solve(size, x + size, y + size); // right-bottom
  }
}

zGame(2, 3, 1); // N = 4, x = 3, y = 4
