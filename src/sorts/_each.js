function _each(items, callback, len = items.length) {
  for (let index = 0; index < len; index += 1) {
    callback(items[index], index);
  }

  return items;
}
