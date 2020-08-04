/**
 * @param {string} current
 * @param {string} end
 * @return {string}
 *
 */

function getDistance(current, end) {
  const f = /-|:| /;
  let c = current.split(f); // [0]: y, [1][2]: d, [3][4][5]: t
  let e = end.split(f);

  // 23:59:60
  let dd = e[2] - c[2] <= 0 ? 0 : e[2] - c[2]; // date
  let dh = e[3] - c[3];
  let dm = e[4] - c[4];
  let ds = e[5] - c[5];

  let r = [dd, dh, dm, ds];

  if (r[0] > 0 && r[1] < 0) {
    r[0] -= 1;
    r[1] += 24;

    r[0] > 0 ? (r[0] += "일 ") : r[0];
    r[1] > 0 ? (r[1] += "시 ") : r[1];
  }

  if (r[1] > 0 && r[2] < 0) {
    r[1] -= 1;
    r[2] += 60;

    r[2] > 0 ? (r[2] += "분 ") : r[2];
  }

  if (r[2] > 0 && r[3] < 0) {
    r[2] -= 1;
    r[3] += 60;

    r[3] > 0 ? (r[3] += "초") : r[3];
  }

  return r.filter((v) => v !== 0).join("");
}

console.log(getDistance("2020-08-30 23:00:00", "2020-08-31 00:00:00"));
