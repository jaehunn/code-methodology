const log = console.log;
/**
 * @param {string[][]} fs
 * @return {number}
 */

// Union-Find: disjoint set
function friendNet(fs) {
  let h = {}; // key: node, value: parent
  let n = {}; // count

  // init: key = value
  fs.forEach((v) => {
    h[v[0]] = v[0];
    h[v[1]] = v[1];
    n[v[0]] = 1;
    n[v[1]] = 1;
  });

  for (let i = 0; i < fs.length; i += 1) {
    union(fs[i][0], fs[i][1]);

    log(n);
  }

  function union(k1, k2) {
    // get root parent node
    k1 = find(k1);
    k2 = find(k2);

    // k1 -> k2 -> ...
    if (k1 !== k2) {
      h[k2] = k1; // root combine
      n[k1] += n[k2];
    }
  }

  function find(k) {
    if (k === h[k]) return k;

    let t = find(h[k]); // find root
    return (h[k] = t);
  }
}

friendNet([
  ["Fred", "Barney"],
  ["Barney", "Betty"],
  ["Betty", "Wilma"],
]);
