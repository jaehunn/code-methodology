/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} p
 * @return {number}
 */

// ex) [1,1,9,1,1,1]
// same priority problem -> object
function printerQueue(n, m, p) {
  let oP = p.map((v, i) => ({
    v,
    i,
  }));

  const T = oP.find((v) => m === v.i);

  let c = 0;
  while (oP.length) {
    if (oP[0] === T) {
      c += 1;
      if (oP[0].i === T.i) return c;
      else oP.pop();
    } else oP.push(oP.pop());
  }
}
