/*
  문제 접근: 순회 + 조건
*/
/**
 * @param {string} name 마스킹할 이름
 * @returns {string} 마스킹된 이름
 */
function getMaskedName(name) {
  let r = "";
  for (let i = 0; i < name.length; i += 1) {
    if (name[i] && i < 2) r += name[i];
    else r += "*";
  }

  return r;
}
