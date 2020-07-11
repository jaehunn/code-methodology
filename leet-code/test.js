function romanToInt(s) {
  if (!s || !s.length) return 0;

  const m = new Map([
    ["I", 1],
    ["V", 5],
    ["X", 10],
    ["L", 50],
    ["C", 100],
    ["D", 500],
    ["M", 1000],
  ]);

  let i = s.length - 1;
  let s = m.get(s[i]);
}
