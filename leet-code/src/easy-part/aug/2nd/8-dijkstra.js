// @see https://m.blog.naver.com/ndb796/221234424646

// shortest path algorithm (dynamic programming)

// vertex 1, 2, 3, 4
/* 
    edges = [
        [0, 3, 6, 7],
        [3, 0, 1, INF],
        [6, 1, 0, 1],
        [7, INF, 1, 0]
    ]

    start 1 (index = 0)
    1. [0, *3, 6, 7]: (1) -> (2)
    2. [0, 3, *4, 7]: (1) -> (2) -> (3)
    3. [0, 3, 4, *5]: (1) -> (2) -> (3) -> (4)
*/

const N = 6; // Nodes
const INF = 987654321;

// graph
const G = [
  [0, 2, 5, 1, INF, INF],
  [2, 0, 3, 2, INF, INF],
  [5, 3, 0, 3, 1, 5],
  [1, 2, 3, 0, 1, INF],
  [INF, INF, 1, 1, 0, 2],
  [INF, INF, 5, INF, 2, 0],
];

for (let i = 0; i < N; i += 1) {
  const value = dijkstra(i);

  console.log(value[0], value[1]);
}

function dijkstra(start) {
  let D = Array(N).fill(0); // distance
  let V = Array(N).fill(false); // visited

  for (let i = 0; i < N; i += 1) {
    D[start] = G[start][i]; // i: end
  }

  V[start] = true;

  for (let i = 0; i < N - 2; i += 1) {
    let current = getSmallIndex(D); //

    V[current] = true;

    for (let j = 0; j < N; j += 1) {
      if (!V[j]) {
        // update
        if (D[current] + G[current][j] < D[j])
          D[j] = D[current] + G[current][j];
      }
    }
  }

  return [start, D];

  function getSmallIndex(D) {
    let min = INF; // 987654321
    let minI = 0;

    for (let i = 0; i < N; i += 1) {
      if (D[i] < min && !V[i]) {
        min = D[i];

        minI = i;
      }
    }

    return minI;
  }
}
