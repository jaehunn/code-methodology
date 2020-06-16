/**
 * @param {number[]} scales
 * @return {string}
 **/

// brute force - for
// +flag
function scale(str) {
  let n = str.split("");

  let asc = true;
  let desc = true;

  for (let i = 0; i < n.length; i += 1) {
    if (n[i] > n[i - 1]) desc = false;
    else if (n[i] < n[i - 1]) asc = false;
  }

  return asc ? "ascending" : desc ? "descending" : "mixed";
}
