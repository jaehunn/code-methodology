function selectMenu(selected = [], menuIndex) {
  if (menuIndex === MAX) {
    if (every(selected)) return selected.length;

    return INF;
  }

  let result = selectMenu(selected, menuIndex + 1);

  selected.push(menuIndex);
  result = Math.min(result, selectMenu(selected, menuIndex + 1));

  selected.pop();

  return result;
}

function every(selected) {
  // validation
}
