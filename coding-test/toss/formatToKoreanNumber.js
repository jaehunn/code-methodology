/**
 * @param {number} num
 * @return {string}
 */
function formatToKoreanNumber(num) {
  let r = String(num).split("");

  // length > 4 || length > 8
  if (r.length > 8) {
    r[r.length - 9] += "억 ";
  }

  if (r.length > 4) {
    r[r.length - 5] += "만 ";
  }

  while (r[r.length - 1] === "0") r.pop();

  for (let i = r.length - 4; i >= 0; i -= 4) {
    r[i] += ",";
  }

  return r.join("");
}

console.log(formatToKoreanNumber(123456789));
