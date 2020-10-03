const log = console.log;
const clear = console.clear;

// https://jeonghwan-kim.github.io/2016/12/15/coroutine.html
{
  const getId = (cb) => setTimeout(() => cb(1), 1);
  const getNameById = (id, cb) => setTimeout(() => cb("chris"), 1);

  //   getId((id) => {
  //     getNameById(id, (name) => {
  //       console.log({ id, name });
  //     });
  //   });
}
{
  const getId = () => new Promise((resolve) => setTimeout(() => resolve({ id: 1 }), 1));
  const getNameById = ({ id }) => new Promise((resolve) => setTimeout(() => resolve({ id, name: "chris" }), 1));

  //   getId()
  //     .then(({ id }) => getNameById({ id }))
  //     .then((o) => console.log(o));

  //   getId().then(getNameById).then(console.log);
}

{
  const getId = () => new Promise((resolve) => setTimeout(() => resolve({ id: 1 }), 1));
  const getNameById = ({ id }) => new Promise((resolve) => setTimeout(() => resolve({ id, name: "chris" }), 1));

  function* gen() {
    const id = yield getId();
    const name = yield getNameById(id);

    log({ id, name });
  }

  //   const iter = gen();
  //   iter.next().value.then((id) => iter.next(id).value.then((name) => iter.next(name)));
}

{
  const getId = () => new Promise((resolve) => setTimeout(() => resolve(1), 1));
  const getNameById = () => new Promise((resolve) => setTimeout(() => resolve("chris"), 1));

  function* gen() {
    const id = yield getId();
    const name = yield getNameById();

    return { id, name };
  }

  const co = (gen) =>
    new Promise((resolve) => {
      const g = gen();

      const onFulfilled = (res) => {
        const { value, done } = g.next(res);

        if (done) return resolve(value);

        return value.then(onFulfilled);
      };

      onFulfilled();
    });

  co(gen).then(console.log);
}

{
  function run(gen) {
    var args = [].slice.call(arguments, 1);
    var it;

    it = gen.apply(this, args);

    return Promise.resolve().then(function handleNext(value) {
      var next = it.next(value);

      return (function handleResult(next) {
        if (next.done) return next.value;

        return Promise.resolve(next.value).then(handleNext, function handleError(e) {
          new Promise.resolve(it.throw(e)).then(handleResult);
        });
      })(next);
    });
  }

  run(function* gen() {}).then(console.log);
}
