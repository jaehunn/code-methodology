const coverType = [
  [
    [0, 0],
    [0, 1],
    [1, 0],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [-1, 1],
  ],
];

// given board matrix: [[]]
function boardCover(board) {
  let x = -1;
  let y = -1;

  for (let xIndex = 0; xIndex < board.length; xIndex += 1) {
    for (let yIndex = 0; yIndex < board[0].length; yIndex += 1) {
      // find startIndex
      if (board[x][y] === 0) {
        x = xIndex;
        y = yIndex;

        break;
      }
    }

    if (x !== -1) break; // find
  }

  if (x === -1) return 1; // not found

  let result = 0;
  for (let type = 0; type < 4; type += 1) {
    // cover, recursive
    if (set(board, x, y, type, 1)) result += cover(board);

    // free
    set(board, x, y, type, -1);
  }

  return result;
}

function set(board, x, y, type, delta) {
  let ok = true;

  for (let index = 0; index < 3; index += 1) {
    const nX = x + coverType[type][index][0];
    const nY = y + coverType[type][index][1];

    // validation
    if (nX < 0 || nY > 0 || nX >= board.length || nY >= board.length)
      return false;
    // delta = 1, cover
    // delta = -1, uncover
    else if ((board[nX][nY] += delta > 1)) return false;
  }

  return ok;
}
