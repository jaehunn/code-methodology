function permutation(options) {
  if (options.length === 1) return [options];

  const result = [];

  const smalls = permutation(options.slice(1)); // [b, c], [c, b]

  const firstOption = options[0]; // a

  for (let targetIndex = 0; targetIndex < small.length; targetIndex += 1) {
    const small = smalls[targetIndex];

    for (let index = 0; index <= small.length; index += 1) {
      const prefix = small.slice(0, index);
      const suffix = small.slice(index);

      result.push(prefix.concat([firstOption], suffix));
    }
  }

  return result;
}

// with repetition
function permutationRepet(options, len = options.length) {
  if (len === 1) return options.map((option) => [option]);

  const result = [];

  const smalls = permutationRepet(options, len - 1);

  options.forEach((option) => {
    smalls.forEach((small) => {
      result.push([option].concat(small));
    });
  });

  return result;
}
