const { log, clear } = console;

const asc = (a, b) => a < b;
const desc = (a, b) => a > b;

// 1. asc vs. desc
// 2. start: 0 vs. last

// *quick: pivot: 0 middle last random

// selection
function selection(items, comparator = asc) {
  for (let i = 0; i < items.length; i += 1) {
    let t = i;

    for (let j = i + 1; j < items.length; j += 1) {
      if (!comparator(items[t], items[j])) t = j;
    }

    if (t !== i) [items[i], items[t]] = [items[t], items[i]];
  }

  return items;
}

selection([5, 3, 1, 2, 4], asc); // 1 2 3 4 5
selection([5, 3, 1, 2, 4], desc); // 5 4 3 2 1

function r_selection(items, comparator = asc) {
  for (let i = items.length - 1; i >= 0; i -= 1) {
    let t = i;

    for (let j = i - 1; j >= 0; j -= 1) {
      if (!comparator(items[t], items[j])) t = j;
    }

    if (t !== i) [items[i], items[t]] = [items[t], items[i]];
  }

  return items;
}

r_selection([5, 3, 1, 2, 4], asc); // 1 2 3 4 5
r_selection([5, 3, 1, 2, 4], desc); // 5 4 3 2 1

// bubble
function bubble(items, comparator = asc) {
  let f;

  for (let i = 1; i < items.length; i += 1) {
    f = false;

    for (let j = 0; j < items.length - i; j += 1) {
      if (!comparator(items[j], items[j + 1])) [items[j], items[j + 1]] = [items[j + 1], items[j]];

      f = true;
    }

    if (!f) return items;
  }

  return items;
}

bubble([5, 3, 1, 2, 4], asc);
bubble([5, 3, 1, 2, 4], desc);

function r_bubble(items, comparator = asc) {
  let f;

  for (let i = items.length - 2; i >= 0; i -= 1) {
    f = false;

    for (let j = items.length - 1; j >= items.length - i - 1; j -= 1) {
      if (!comparator(items[j - 1], items[j])) [items[j - 1], items[j]] = [items[j], items[j - 1]];

      f = true;
    }

    if (!f) return items;
  }

  return items;
}

r_bubble([5, 3, 1, 2, 4], asc);
r_bubble([5, 3, 1, 2, 4], desc);

// insertion
function insertion(items, comparator = asc) {
  for (let i = 0; i < items.length; i += 1) {
    let t = i;

    while (t && !comparator(items[t - 1], items[t])) {
      [items[t - 1], items[t]] = [items[t], items[t - 1]];

      t -= 1;
    }
  }

  return items;
}

insertion([5, 3, 1, 2, 4], asc);
insertion([5, 3, 1, 2, 4], desc);

function r_insertion(items, comparator = asc) {
  for (let i = items.length - 1; i >= 0; i -= 1) {
    let t = i;

    while (t < items.length - 1 && !comparator(items[t], items[t + 1])) {
      [items[t], items[t + 1]] = [items[t + 1], items[t]];

      t += 1;
    }
  }

  return items;
}

r_insertion([5, 3, 1, 2, 4], asc);
r_insertion([5, 3, 1, 2, 4], desc);

// merge
function merge(items, comparator = asc, s = 0, e = items.length - 1) {
  // size > 1
  if (s < e) {
    const m = ((s + e) / 2) >> 0;

    // divide
    merge(items, comparator, s, m);
    merge(items, comparator, m + 1, e);

    mergeSort(items, comparator, s, m, e);
  }

  return items;
}

// merge items is already sorted.
function mergeSort(items, comparator, s, m, e) {
  let i = s;
  let j = m + 1;

  let r = [];
  while (r.length <= e - s) {
    if (j > e || comparator(items[i], items[j])) r.push(items[i++]);
    else r.push(items[j++]);
  }

  // clone
  for (let i = s; i <= e; i += 1) items[i] = r.shift();
}

log(merge([5, 3, 1, 2, 4], asc));
log(merge([5, 3, 1, 2, 4], desc));

// quick
