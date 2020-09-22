const log = console.log;

var a = "global_a";

function f(a) {
  if (a) this.a = a;

  log(this.a);
}

f(); // global

var o = {
  a: "o_context_a",
  f,
};

o.f(); // o

var p = {
  a: "p_context_a",
  f,
};

f.call(p); // p

function F(a) {
  this.a = a;
}

F.prototype.f = function () {
  log(this.a);
};

var q = new F("q_context_a");
q.f(); // q

o.f.call(p); // p, implicit < explicit

var r = new o.f("r_context_a"); // r, implicit < new

var g = f.bind(o);

var s = new g("s_context_a"); // s, explicit < new

// new > explicit > implicit
