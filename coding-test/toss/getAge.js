/**
 * @param {string} birth
 * @param {string} date
 * @return {string}
 */

function getAge(birth, date) {
  let dy = +date.substr(0, 4) - +birth.substr(0, 4);
  let dm = +date.substr(5, 2) - +birth.substr(5, 2);
  let dd = +date.substr(8, 2) - +birth.substr(8, 2);

  if (dm < 0 || dd < 0) return `만 ${dy - 1}세, 한국나이 ${dy}세`;

  return `만 ${dy}세, 한국나이 ${dy}세`;
}

log(getAge("1993-08-01 00:00:00", "2020-08-31 00:00:00"));
