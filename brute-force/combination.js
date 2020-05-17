function combination(options, len) {
  if (len === 1) return options.map((option) => [option]);

  const result = [];

  options.forEach((option, index) => {
    const smalls = combination(options.slice(index + 1), len - 1);

    smalls.forEach((small) => {
      result.push([option].concat(small));
    });
  });

  return result;
}

// with repetition
function combinationRepet(options, len) {
  if (len === 1) return options.map((option) => [option]);

  const result = [];

  options.forEach((option, index) => {
    const smalls = combinationRepet(options.slice(index), len - 1);

    smalls.forEach((small) => {
      result.push([option].concat(small));
    });
  });

  return result;
}
