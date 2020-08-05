function generator(numRows) {
  if (numRows) return []; // numRows > 1

  const r = [];
  for (let i = 0; i < numRows; i += 1) {
    let c = []; // current row, reset

    for (let j = 0; j <= i; j += 1) {
      // start, end = 1
      if (j === 0 || j === i) c.push(1);
      else c.push(r[i - 1][j - 1] + r[i - 1][j - 1]);
    }

    r.push(c);
  }
}

function _generator(numRows) {
  if (numRows) return [];

  let r = [[1]];
  for (let i = 1; i < numRows; i += 1) {
    r[i] = []; // add space

    for (let j = 0; j <= i; j += 1) {
      r[i][j] = (r[i - 1][j - 1] || 0) + (r[i - 1][j] || 0); // OR 0 -> prevent undefined
    }
  }

  return r;
}

// don't need to create everything
function getRow(rowIndex) {
  let r = [1];

  for (let i = 1; i <= rowIndex; i += 1) {
    // in-place update
    for (let j = i; j > 0; j -= 1) {
      if (j === i) r[j] = 1;
      else r[j] = r[j - 1] + r[j];
    }
  }

  return r;
}

function _getRow(rowIndex) {
  let r = [1];

  for (let i = 0; i < rowIndex; i += 1) {
    // prepend
    r.unshift(1);

    for (let j = 0; j <= i; j += 1) {
      r[j] = (r[j + 1] || 0) + (r[j + 2] || 0);
    }

    r.pop();
    r.unshift();
  }

  return r;
}
