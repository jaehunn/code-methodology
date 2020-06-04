// binomial coefficient
function binomial(n, r) {
  if (r === 0 || n === r) return 1;

  // nCr = n-1Cr-1 + n-1Cr
  return binomial(n - 1, r - 1) + binomial(n - 1, r); //  recurrence formula
}

// overlapping problem -> memoization
// pattern: 1. base case 2. cache access
function betterBinomial(n, r) {
  if (r === 0 || n === r) return 1;

  if (cache[n][r]) return cache[n][r];

  return (cache[n][r] = betterBinomial(n - 1, r - 1) + betterBinomial(n - 1, r));
}

// memoization condition: referential transparency(= pure function), same input, output
// Time complexity: subproblems X subproblem time complexity
// betterBinomial() time complexity: O(n^2) X O(1)

// example) wild card
function match(wild, str) {
  let position = 0;
  while (
    position < str.length &&
    position < wild.length &&
    (wild[position] === "?" || wild[position] === str[position])
  ) {
    position += 1;
  }

  // base case
  if (position === wild.length) return position === str.length;

  // recursion
  if (wile[position] === "*") {
    for (let skip = 0; pos + skip <= str.length; skip += 1) {
      if (match(wild.substr(pos + 1), str.substr(pos + skip))) return true;
    }
  }

  return false;
}
