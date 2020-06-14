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

// WIP
function addBinary(a, b) {
  if (a === "") return b;
  if (b === "") return a;

  if (a.length > b.length) return addBinary(b, a); // first element is larger length

  let s = [];
  let c = "0";

  // a.length > b.length
  for (let i = b.length - 1; i >= 0; i -= 1) {
    let _a = i < a.length ? a.charAt(i) : "0";
    let _b = b.charAt(i);
    let _r = "";

    if (_a !== _b) {
      // 01 10 => 1 + c = ?
      _r = c === "1" ? "0" : "1";
    } else {
      // 00 11 => 0 + c = ?
      _r = c;

      c = _a; // or _b
    }

    s.unshift(_r); // prepend
  }

  // msb judgement
  if (c === "1") s.unshift(c);

  return s.join("");
}
