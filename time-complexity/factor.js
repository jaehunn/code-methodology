function factor(value) {
  if (value === 1) return [1, 1];

  const result = [];

  for (let division = 2; value > 1; division += 1) {
    while (value % division === 0) {
      value /= division;

      result.push(division);
    }
  }

  return result;
}
