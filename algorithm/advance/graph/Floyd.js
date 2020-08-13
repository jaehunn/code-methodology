// @see blogId=ndb796&logNo=221234427842&proxyReferer=https:%2F%2Fwww.google.com%2F

const N = 4;
const INF = 987654321;

// graph
const G = [
  [0, 5, INF, 8],
  [7, 0, 9, INF],
  [2, INF, 0, INF],
  [INF, INF, 3, 0],
];

// G.length vs. N
function printGraph(G) {
  for (let i = 0; i < N; i += 1) {
    console.log(G[i]);
  }
}

{
  function floyd() {
    // init
    let T = [];
    for (let i = 0; i < N; i += 1) {
      let C = [];
      for (let j = 0; j < N; j += 1) {
        C.push(G[i][j]);
      }

      T.push(C);
    }

    // k: go through node
    for (let k = 0; k < N; k += 1) {
      for (let i = 0; i < N; i += 1) {
        for (let j = 0; j < N; j += 1) {
          // compare
          if (T[i][k] + T[k][j] < T[i][j]) T[i][j] = T[i][k] + T[k][j];
        }
      }
    }

    printGraph(T);
  }

  floyd();
}
