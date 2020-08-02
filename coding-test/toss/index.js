// commaizeNumber 함수를 구현하세요.
// num은 Number 타입으로 들어온다고 가정합니다.
function commaizeNumber(num) {
  let r = String(num)
    .split("")
    .reverse()
    .map((v, i) => {
      if (i === 3) return "만" + v + ",";
      else if (i === 7) return "억" + v + ",";
      else if (i === 11) return v + ",";
      else return v;
    });

  while (r[0] === "," || r[0] === 0) r.shift();

  return r.reverse().join("");
}

// commaizeNumber 함수를 구현하세요.
// num은 Number 타입으로 들어온다고 가정합니다.
function formatToKoreanNumber(num) {
  let r = String(num)
    .split("")
    .reverse()
    .map((v, i) => {
      if (i === 3) return "만 " + v + ",";
      else if (i === 7) return "억 " + v + ",";
      else if (i === 11) return v + ",";
      else return v;
    });

  while (r[0] === "," || r[0] === "0") r.shift();

  r = r.reverse().join("").split("");

  while (r[0] === "만" || r[0] === "억" || r[0] === " ") r.shift();
  while (
    r[r.length - 1] === "," ||
    r[r.length - 1] === "0" ||
    r[r.length - 1] === " "
  )
    r.pop();

  return r.join("");
}

log(formatToKoreanNumber(1234));

/**
 * @param {Date} birthDate 사용자의 생년월일
 * @param {Date} currentDate 현재 날짜
 * @returns {string} 사용자의 생년월일과 날짜를 담은 string
 */
function getAge(birthDate, nowDate) {
  let dy = +nowDate.substr(0, 4) - +birthDate.substr(0, 4);
  let dm = +nowDate.substr(5, 2) - +birthDate.substr(5, 2);
  let dd = +nowDate.substr(8, 2) - +birthDate.substr(8, 2);

  let m = dy;
  let n = dy + 1;

  if (dm < 0) m -= 1;
  else if (dm === 0 || dd < 0) m -= 1;

  return `만 ${m}세, 한국나이 ${n}세`;
}

log(getAge("1993-08-01 00:00:00", "2020-08-31 00:00:00"));
