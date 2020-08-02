/**
 *
 * @param {number} num
 */
function formatToKoreanNumber(num) {
  let r = String(num).split("");
  let l = r.length;
  let s = l % 3 === 0 ? 3 : l % 3;
}
