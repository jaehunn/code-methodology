const dx = [-1, -1, -1, 1, 1, 1, 0, 0];
const dy = [-1, 0, 1, -1, 0, 1, -1, 1];

function isRange(x, y) {
  if (x < 0 || y < 0 || x > matrix[0].length || y > matrix.length) return false;

  return true;
}

// (x, y) start from center point
function searchWord(x, y, words = "") {
  if (!isRange(x, y)) return false;

  if (board[x][y] !== words[0]) return false;

  if (words.length === 1) return true;

  for (let direction = 0; direction < 8; direction += 1) {
    let nextX = x + dx[direction];
    let nextY = y + dy[direction];

    if (searchWord(nextX, nextY, words.substr(1))) return true;
  }

  return false;
}
