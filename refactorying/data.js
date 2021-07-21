const plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  asLike: { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

const invoice = {
  customer: "BigCo",
  performances: [
    {
      playID: "hamlet",
      audience: 55,
    },
    {
      playID: "asLike",
      audience: 35,
    },
    {
      playID: "othello",
      audience: 40,
    },
  ],
};

module.exports = {
  plays,
  invoice,
};
