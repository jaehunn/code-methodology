// Search Word
// relative coordinates
const dx = [-1, -1, -1, 1, 1, 1, 0, 0];
const dy = [-1, 0, 1, -1, 0, 1, -1, 1];

function isRange(x, y) {
  if (x < 0 || y < 0 || x > matrix[0].length || y > matrix.length) return false;

  return true;
}

function hasWord(x, y, words = "") {
  // range
  if (!isRange(x, y)) return false;

  // first character
  if (board[x][y] !== words[0]) return false;

  // one word
  if (words.length === 1) return true;

  for (let direction = 0; direction < 8; direction += 1) {
    let nextX = x + dx[direction];
    let nextY = y + dy[direction];

    // recursive
    if (hasWord(nextX, nextY, words.substr(1))) return true;
  }

  return false;
}

// Pairing
// n: number of items
function countPairings(taken = []) {
  let startIndex = -1;

  // startIndex
  for (let index = 0; index < n; index += 1) {
    if (!taken[index]) {
      startIndex = index;

      break;
    }
  }

  // fulled taken
  if (startIndex === -1) return 1;

  let result = 0;
  for (let index = startIndex + 1; index < n; index += 1) {
    if (!taken[index] && areFriends[startIndex][index]) {
      taken[startIndex] = taken[index] = true; // pair

      result += countPairings(taken); // recursive

      taken[startIndex] = taken[index] = false; // free
    }
  }

  return result;
}
