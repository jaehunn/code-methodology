// 1. Search Word
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

// 2. Pairing
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

// 3. Board Cover
// relative coordinates
// Base coordinates(0, 0)
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

// delta: -1, free
// delta: 1, cover
function set(board, x, y, type, delta) {
  let ok = true;

  for (let index = 0; index < 3; index += 1) {
    // [type][x, y]
    const nX = x + coverType[type][index][0];
    const nY = y + coverType[type][index][1];

    if (nX < 0 || nY > 0 || nX >= board.length || nY >= board.length)
      return false;
    // range
    else if ((board[nX][nY] += delta > 1)) return false; // 2: already exist block
  }

  return ok;
}

// board[x][y]: 0, not cover
// board[x][y]: 1, already cover
function cover(board) {
  let x = -1;
  let y = -1;

  for (let xIndex = 0; xIndex < board.length; xIndex += 1) {
    for (let yIndex = 0; yIndex < board.length; yIndex += 1) {
      if (board[x][y] === 0) {
        x = xIndex;
        y = yIndex;

        break;
      }
    }

    if (x !== -1) break; // find
  }

  if (x === -1) return 1; // full board

  let result = 0;

  for (let type = 0; type < 4; type += 1) {
    // cover, recursive
    if (set(board, x, y, type, 1)) result += cover(board);

    // free
    set(board, x, y, type, -1);
  }

  return result;
}

// Traveling Salesman Problem: TSP
const CITYS;
const DISTS = [CITYS][CITYS]; // [start][end] = distance

function shortestPath(paths, visited, currentLength) {

  // completed
  if (paths.length === CITYS) return currentLength + DISTS[paths[paths.length - 1]][paths[0]]; // + end to start

  let result = INF; // INF: 123456789

  for (let index = 0; index < CITYS; index += 1) {
    if (visited[index]) continue; // already visited

    let current = paths[paths.length - 1];

    // add
    paths.push(current);
    visited[index] = true;

    // recursive
    let candidate = shortestPath(paths, visited, currentLength + DISTS[current][index]);

    // update
    result = Math.min(result, candidate);

    // free
    paths.pop();
    visited[index] = false;
  }

  return result;
}

// Clock Sync
const SWITCH = 10;
const CLOCKS = 16;
const LINKED = [[]]; // !![i][j]: Switch 'i' Linked Clock 'j'

// Are Clocks point to '12'?
function areAligned(clocks) { }

// Push switch
function push(clocks, swtch) {
  for (let clock = 0; clock < CLOCKS; clock += 1) {
    if (LINKED[swtch][clock] === 'y') {
      clocks[clock] += 3;

      // 15 == 3 (about over 12)
      if (clocks[clock] === 15) clocks[clock] = 3;
    }
  }
}

// main
function solve(clocks, swtch) {
  if (swtch === SWITCH) return areAligned(clocks) ? 0 : INF; // INF: 123456789

  let result = INF;

  // count 1: up '3' hour
  // count 4 == count 0, max count = 4
  for (let count = 0; count < 4; count += 1) {

    // recursive, update
    result = Math.min(result, count + solve(clocks, swtch + 1));

    push(clocks, swtch);
  }

  return result;
}

