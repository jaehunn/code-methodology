/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */

// method -> error!
var addBinary = function (a, b) {
  if (a.length < 1 || b.length < 1 || a.length > Math.pow(10, 4) || b.length > Math.pow(10, 4)) return;

  let dA = parseInt(+a, 2);
  let dB = parseInt(+b, 2);

  console.log(dA, dB);

  let r = (dA + dB).toString(2);

  if (r.length < 1 || r.length > Math.pow(10, 4)) return;

  return r;
};

function addBinary(a, b) {
  let ai = a.length;
  let bi = b.length;

  let r = "";
  let c = 0;
  while (ai || bi) {
    let s = (ai > 0 ? +a[--ai] : 0) + (bi > 0 ? +b[--bi] : 0) + c;
    r = (s % 2) + r; // prepend
    c = s > 1 ? 1 : 0;
  }

  return c ? c + r : r; // number + string
}
