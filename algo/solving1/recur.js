// 1.
{
  let cnt = 0;
  function solve(size, x, y, posX, posY) {
    // base: find or size === 1
    if (posX === x && posY === y) console.log(cnt);
    if (size === 1) return (cnt += 1); // atomic: size = 2 * 2

    // divide
    size /= 2;
    solve(size, x, y, posX, posY);
    solve(size, x + size, y, posX, posY);
    solve(size, x, y + size, posX, posY);
    solve(size, x + size, y + size, posX, posY);

    return;
  }

  // start = (0, 0)
  solve(2 ** 2, 0, 0, 3, 2); // 4 * 4 size
}

// 2.
{
  function solve(items) {
    let opsItems = [];
    r_getOps();

    while (opsItems.length) {
      const opsItem = opsItems.shift();

      let str = "";
      for (let i = 0; i < opsItem.length; i += 1) {
        str += +items[i] + opsItem[i];
      }
      str += +items[items.length - 1];
      str = str.replace(/ /g, "");

      console.log(eval(str));
      console.log(Function("", `return ${str}`)());
    }

    function r_getOps(ops = []) {
      if (ops.length === 2) {
        opsItems.push([...ops]); // clone
        return;
      }

      ops.push(" ");
      r_getOps(ops);
      ops.pop();

      ops.push("+");
      r_getOps(ops);
      ops.pop();

      ops.push("-");
      r_getOps(ops);
      ops.pop();
    }
  }

  console.log(solve([1, 2, 3]));
}
