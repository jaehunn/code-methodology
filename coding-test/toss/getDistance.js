/**
 * @param {string} current
 * @param {string} end
 * @return {string}
 *
 */

function getDistance(current, end) {
  const f = /-|:| /;
  let c = current.split(f); // [0]: y, [1][2]: d, [3][4][5]: t
  let e = current.split(f);

  // month -> date ?
  let dy = e - c <= 0 ? 0 : e - c; // dy <= 0, 0
}

console.log(getDistance("2020-08-29 22:58:59", "2020-08-31 00:00:00"));
