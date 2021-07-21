const log = console.log;

// 연극을 외주받아 공연을 진행하는 극단이 있다.
// 극단에 공연 요청이 들어오면, 장르와 관객의 규모를 판단해서 비용을 책정한다.
// 공연료와 포인트가 명시된 영수증을 발급한다. (포인트로 다음 공연료를 할인받을 수 있다.)
{
  const { invoice, plays } = require("./data.js");

  log(statement(invoice, plays));

  /*
    청구 내역 (고객명: BigCo)
    Hamlet $740.00 (55석)
    As You Like It $580.00 (35석)
    Othello $620.00 (40석)
    총액: $1,940.00
    적립 포인트: 47점
   */

  function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredit = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    // @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    const format = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format;

    for (let perf of invoice.performances) {
      const play = plays[perf.playID];
      let thisAmount = 0;

      // 공연료
      switch (play.type) {
        case "tragedy":
          thisAmount = 40000;

          if (perf.audience > 30) {
            thisAmount += 1000 * (perf.audience - 30);
          }

        case "comedy":
          thisAmount = 30000;

          if (perf.audience > 20) {
            thisAmount += 10000 + 500 * (perf.audience - 20);
          }

          thisAmount += 300 * perf.audience;

          break;

        default:
          throw new Error(`알 수 없는 장르: ${play.type}`);
      }

      // 포인트
      volumeCredit += Math.max(perf.audience - 30, 0);

      if ("comedy" === play.type) volumeCredit += Math.floor(perf.audience / 5);

      // 출력
      result += `${play.name} ${format(thisAmount / 100)} (${perf.audience}석)\n`;
      totalAmount += thisAmount;
    }

    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredit}점\n`;

    return result;
  }
}

// 1. 반환 형태를 HTML 로 출력하려면 문자열을 삽입하는 문마다 조건을 걸어야한다. -> 함수 복잡도 증가
// 2. 연극의 장르가 많아지면 그때마다 switch case 를 증가시켜야한다. -> 함수 수정이 빈번해진다.

// 리팩토링의 첫 단계: 테스트 코드 준비하기
// 함수가 문자열을 반환하므로 문자열 답안을 몇개 준비해 자가진단 테스트를 진행한다.

// 함수 쪼개기
// 1. switch
// 한 공연에 대한 요금을 계산하는 로직으로 이해한 것은 코드를 분석했기 때문이다. 이런 분석법은 지양된다.
// switch 를 추출한 함수 이름을 amountFor() 처럼 어떤 일을 하는 지에 대한 것으로 한다.

// 이때 체크해야하는 것이 스코프를 벗어나는 변수를 체크한다.
// 값을 변경하지않는 play 는 매개변수로 함수에 전달하면 될 것이고, thisAmount 와 같은 변수는 함수 안에서 값이 바뀌므로 주의해야한다.

{
  function amountFor(perf, play) {
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;

        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }

      case "comedy":
        thisAmount = 30000;

        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }

        thisAmount += 300 * perf.audience;

        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return thisAmount;
  }

  // 고친 코드
  function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredit = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    // @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    const format = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format;

    for (let perf of invoice.performances) {
      const play = plays[perf.playID];
      let thisAmount = amountFor(perf, play); // *

      // 포인트
      volumeCredit += Math.max(perf.audience - 30, 0);

      if ("comedy" === play.type) volumeCredit += Math.floor(perf.audience / 5);

      // 출력
      result += `${play.name} ${format(thisAmount / 100)} (${perf.audience}석)\n`;
      totalAmount += thisAmount;
    }

    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredit}점\n`;

    return result;
  }
}

// 리팩토링의 핵심은 조금씩 수정하고 매번 테스트하는 것이다. 변경 폭이 적으면 문제를 찾기가 수월하다.

// 코드에서 명확하게 표현할 부분을 찾는다.
// 변수이름 명확하게 바꾸기
{
  // * 동적타입 언어를 다룰때 변수명 접두어로 타입을 명시하면 유용하다.
  function amountFor(aPerformance, play) {
    let result = 0; // *

    switch (play.type) {
      case "tragedy":
        result = 40000;

        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }

      case "comedy":
        result = 30000;

        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }

        result += 300 * aPerformance.audience;

        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return result;
  }
}

// 지역 변수를 최대한 줄이기
{
  function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredit = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    // @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    const format = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format;

    for (let perf of invoice.performances) {
      let thisAmount = amountFor(perf); // play 값은 perf 로 구해지므로 굳이 매개변수로 전달할 필요없이 amountFor() 내에서 구해도된다.

      volumeCredit += Math.max(perf.audience - 30, 0);

      if ("comedy" === playFor(perf).type) volumeCredit += Math.floor(perf.audience / 5); // playFor() 로 변수 인라인

      result += `${playFor(perf).name} ${format(amountFor(perf) / 100)} (${perf.audience}석)\n`; // amountFor() 로 변수 인라인
      totalAmount += thisAmount;
    }

    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredit}점\n`;

    return result;

    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }
  }

  function amountFor(aPerformance) {
    let result = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;

        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }

      case "comedy":
        result = 30000;

        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }

        result += 300 * aPerformance.audience;

        break;

      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }

    return result;
  }
}

// playFor() 함수를 많이 조회한 것에 대한 성능 우려보다 지역변수를 제거해 개선하기 쉬워졌다는 것이 더 중요하다.

// ...
