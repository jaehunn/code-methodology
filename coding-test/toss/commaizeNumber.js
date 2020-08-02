/* 
  문제 접근: 자리수 다루기, 네이티브 활용
*/

// commaizeNumber 함수를 구현하세요.
// num은 Number 타입으로 들어온다고 가정합니다.

// 네이티브
function commaizeNumber(num) {
  let r = String(num).split("");
  let s = r.length % 3 === 0 ? 3 : r.length % 3;

  for (let i = s; i < r.length; i += 3) {
    r[i] = "," + r[i];
  }

  return r.join("");
}
