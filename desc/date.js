const log = console.log;

// 1. creation
{
  const now = new Date();

  log(now); // Mon Aug 03 2020 14:31:47 GMT+0900 (GMT+09:00)
}

// 2. methods
{
  // Date method

  // from Jan 01 1970 00:00:00
  log(Date.now()); // 1596432876952;

  log(new Date(1596432876952)); // Mon Aug 03 2020 14:34:36 GMT+0900 (GMT+09:00)

  log(Date.parse("2020-03-26 13:30:00")); // 1585197000000
  log(Date.parse("2020/03/26 22:30:00")); // 1585197000000

  // Date.prototype method
  const date = new Date();
  log(date.getFullYear()); // 4 bit, 2020
  log(date.getYear()); // 120, base 1900

  date.setFullYear(2021);
  log(date.getFullYear());
}
