/**
 * @param {string} l
 * @return {string}
 */

// 1. current array, memo array
// 2. <: current _> memo / >: memo -> current
// 3. -: current pop
function keyLogger(l) {
  let ls = [];
  let rs = [];

  for (let i = 0; i < l.length; i += 1) {
    if (l[i] === "-") {
      if (ls.length) ls.pop();
    } else if (l[i] === "<") {
      if (ls.length) rs.push(ls.pop());
    } else if (l[i] === ">") {
      if (rs.length) ls.push(rs.pop());
    } else {
      ls.push(l[i]);
    }
  }

  return ls.concat(rs.reverse());
}
