const log = console.log;

// 연극을 외주받아 공연을 진행하는 극단이 있다.
// 극단에 공연 요청이 들어오면, 장르와 관객의 규모를 판단해서 비용을 책정한다.
// 공연료와 적립포인트가 명시된 영수증을 발급한다. (포인트로 다음 공연료를 할인받을 수 있다.)
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

      // 적립 포인트
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

    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }
  }
}

// playFor() 함수를 많이 조회한 것에 대한 성능 우려보다 지역변수를 제거해 개선하기 쉬워졌다는 것이 더 중요하다.

// 적립 포인트 로직 추출하기
{
  function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredit = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    const format = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format;

    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf); // * 반복문을 돌때마다 값을 누적해야하므로 함수 안에서 새로운 값을 반환하는 식으로 작성해야한다.

      result += `${playFor(perf).name} ${format(amountFor(perf) / 100)} (${perf.audience}석)\n`;
      totalAmount += amountFor(perf);
    }

    result += `총액: ${format(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredit}점\n`;

    return result;

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

    function volumeCreditsFor(perf) {
      let result = 0; // * 변수이름 명확히하기

      result += Math.max(perf.audience - 30, 0);

      if ("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5);

      return result;
    }

    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }
  }
}

// 임시변수(코드의 format 변수) 를 제거하고, 함수로 빼기
// 임시변수는 자신이 속한 로직에서만 의미가 있으므로 독립시킬 필요가 있다.

{
  function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredit = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    for (let perf of invoice.performances) {
      volumeCredits += volumeCreditsFor(perf); // * 반복문을 돌때마다 값을 누적해야하므로 함수 안에서 새로운 값을 반환하는 식으로 작성해야한다.

      result += `${playFor(perf).name} ${usd(amountFor(perf) / 100)} (${perf.audience}석)\n`;
      totalAmount += amountFor(perf);
    }

    result += `총액: ${usd(totalAmount / 100)}\n`;
    result += `적립 포인트: ${volumeCredit}점\n`;

    return result;

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

    function volumeCreditsFor(perf) {
      let result = 0; // * 변수이름 명확히하기

      result += Math.max(perf.audience - 30, 0);

      if ("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5);

      return result;
    }

    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }

    // * 함수이름을 함수의 핵심기능으로 정의하면 좋다.
    // * 함수변수를 만드는 것도 좋지만, 쓰이는 방식을 고려해볼때, 파라미터로 값을 받아 / 100 까지 적용하는 로직으로 만들면 더 좋을 것 같다.
    function usd(aNumber) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(aNumber / 100);
    }
  }
}

// volumeCredits 변수
{
  function statement(invoice, plays) {
    let totalAmount = 0;
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    // volumeCredits 는 루프마다 값을 누적해서 리팩터링하는 것이 까다롭다.
    // * for 문을 쪼개보자.

    for (let perf of invoice.performances) {
      result += `${playFor(perf).name} ${usd(amountFor(perf) / 100)} (${perf.audience}석)\n`;
      totalAmount += amountFor(perf);
    }

    // let volumeCredit = 0; // * 변수를 선언하는 문장을 반복문 앞으로 옮긴다.
    // for (let perf of invoice.performances) {
    //   volumeCredits += volumeCreditsFor(perf);
    // }

    // 값을 갱신하는 문장들을 한곳에 모으면 임시변수를 질의함수로 바꾸기가 수월해진다.
    // let volumeCredit = totalVolumeCredits();

    result += `총액: ${usd(totalAmount / 100)}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`; // * 변수 인라인하기

    return result;

    function totalVolumeCredits() {
      let volumeCredits = 0;

      for (let perf of invoice.performances) {
        volumeCredits += volumeCreditsFor(perf);
      }
    }

    function amountFor(aPerformance) {
      let result = 0;

      // *
      switch (aPerformance.play.type) {
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
          throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
      }

      return result;
    }

    function volumeCreditsFor(perf) {
      let result = 0;

      result += Math.max(perf.audience - 30, 0);

      if ("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5);

      return result;
    }

    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }

    function usd(aNumber) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(aNumber / 100);
    }
  }
}

// volumeCreidts 리팩토링 절차
// 1. 반복문을 쪼개기
// 2. 문장 모으기
// 3. 함수로 빼내기
// 4. 인라인 변수로 적용하기

// 위와 같은 방식으로 totalAmount 임시변수 제거하기
{
  function statement(invoice, plays) {
    let result = `청구 내역 (고객명: ${invoice.customer})\n`;

    for (let perf of invoice.performances) {
      result += `${playFor(perf).name} ${usd(amountFor(perf) / 100)} (${perf.audience}석)\n`;
    }

    result += `총액: ${usd(totalAmount() / 100)}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`; // * 변수 인라인하기

    return result;

    function amountFor(aPerformance) {
      let result = 0;

      // *
      switch (aPerformance.play.type) {
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
          throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
      }

      return result;
    }

    // * totalAmount 리팩터링
    function totalAmount() {
      let result = 0;

      for (let perf of invoice.performances) {
        result += amountFor(perf);
      }

      return result;
    }

    function totalVolumeCredits() {
      let result = 0;

      for (let perf of invoice.performances) {
        result += volumeCreditsFor(perf);
      }

      return result;
    }

    function volumeCreditsFor(aPerformance) {
      let result = 0;

      result += Math.max(aPerformance.audience - 30, 0);

      if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);

      return result;
    }

    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }

    function usd(aNumber) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(aNumber / 100);
    }
  }
}

// 지금까지 살펴본 잘개쪼개는 작업은 리팩토링 초기단계에서 진행된다.
// 다음은 앞에서 언급한 HTML 코드를 만드는 기능을 살펴보자
// 현재 statement() 는 문자열을 반환하는 함수로 작성되어있다. 이때 HTML 버전의 statement() 로 바꾸기 위해 모든 분리된 함수들을 복사붙여넣기를 하고 싶지않다. 어떻게 해야할까?

// 이를 해결할 수 있는 방법은 단계를 쪼개는 것이다. 필요한 데이터를 처리하는 로직과 문자열 또는 HTML 버전을 만드는 로직으로 둘로 나누는 것이다.
// 두번째 단계의 문자열, HTML 버전으로 만드는 로직을 함수로 뽑아내야하는데 그 로직은 statement() 함수 전체가 된다.
{
  function statement(invoice, plays) {
    const statementData = {}; // * 중간 데이터 구조를 만들었다. renderPlainText 에서 계산하는 로직을 첫번째 로직으로 뽑아내고 이 중간데이터로 두번째 로직에 전달하면 될 것이다.

    statementData.customer = invoice.customer;
    // statementData.performances = invoice.performances;
    statementData.performances = enrichPerformance(invoice.performances); // * performances 객체를 복사해서 새롭개 설정하자. 복사를 하지않고 가변적으로 참조하면 금방 상하기 때문에 조심해야한다.
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return renderPlainText(statementData, plays);

    function amountFor(aPerformance) {
      let result = 0;

      // *
      switch (aPerformance.play.type) {
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
          throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
      }

      return result;
    }

    function enrichPerformance(aPerformance) {
      const result = Object.assign({}, aPerformance); // 얕은 복사 수행

      // * 중간데이터에 계산 결과를 설정한다.
      result.play = playFor(result);
      result.amount = amountFor(result);
      result.volumeCredits = volumeCreditsFor(result);

      return result;
    }

    // * 반복문을 파이프라인으로 바꾸기
    function totalAmount(data) {
      return data.performances.reduce((total, performance) => total + performance.amount, 0);
    }

    function totalVolumeCredits(data) {
      return data.performances.reduce((total, performance) => total + performance.volumeCredit, 0);
    }

    // * 연극의 제목을 알아내는 playFor 를 statement() 내로 이동시키고, 중간데이터 구조에 추가한다. 이후 중간데이터 구조에 설정한 연극 제목을 renderPlainText() 에서 사용하도록 하자.
    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }

    function volumeCreditsFor(aPerformance) {
      let result = 0;

      result += Math.max(aPerformance.audience - 30, 0);

      // *
      if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);

      return result;
    }
  }

  // * 두번째 단계의 로직을 함수로 뽑아냈다. 첫번째 단계에서 만들어진 결과물을 두번째 단계에서 사용하도록 중간 데이터 구조를 생성해야한다.
  // * 중간 데이터에 invoice 의 데이터를 저장해서 invoice 를 따로 넘길 필요가 없다.
  function renderPlainText(data, plays) {
    let result = `청구 내역 (고객명: ${data.customer})\n`;

    // * 중간데이터에 playFor() 를 적용시켰기 때문에 그대로 사용할 수 있다.
    for (let perf of data.performances) {
      result += `${perf.name} ${usd(perf.amount / 100)} (${perf.audience}석)\n`;
    }

    result += `총액: ${data.totalAmount() / 100}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits()}점\n`; // * 변수 인라인하기

    return result;

    function usd(aNumber) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(aNumber / 100);
    }
  }
}

// 첫단계 로직인 데이터 처리부분을 함수로 추출한다.
{
  function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
  }

  // * 계산하는 로직(createStatementData())을 공통적으로 사용할 수 있게 됬다.
  function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
  }

  // renderHtml() 도 usd 를 사용할 수 있도록 스코프를 위로 올렸다.
  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function renderPlainText(data, plays) {
    let result = `청구 내역 (고객명: ${data.customer})\n`;

    // * 중간데이터에 playFor() 를 적용시켰기 때문에 그대로 사용할 수 있다.
    for (let perf of data.performances) {
      result += `${perf.name} ${usd(perf.amount / 100)} (${perf.audience}석)\n`;
    }

    result += `총액: ${data.totalAmount() / 100}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits()}점\n`; // * 변수 인라인하기

    return result;
  }

  function renderHtml(data) {
    let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;

    result += "<table>\n";
    result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";

    for (let perf of data.performances) {
      result += `<tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`;
      result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }

    result += "</table>";
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;

    return result;
  }

  function createStatementData(invoice, plays) {
    const result = {}; // * 변수명 바꾸기

    result.customer = invoice.customer;
    result.performances = enrichPerformance(invoice.performances);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);

    return result; // * 중간 데이터를 반환한다.

    function enrichPerformance(aPerformance) {
      const result = Object.assign({}, aPerformance);

      result.play = playFor(result);
      result.amount = amountFor(result);
      result.volumeCredits = volumeCreditsFor(result);

      return result;
    }

    function amountFor(aPerformance) {
      let result = 0;

      // *
      switch (aPerformance.play.type) {
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
          throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
      }

      return result;
    }

    function totalAmount(data) {
      return data.performances.reduce((total, performance) => total + performance.amount, 0);
    }

    function totalVolumeCredits(data) {
      return data.performances.reduce((total, performance) => total + performance.volumeCredit, 0);
    }

    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }

    function volumeCreditsFor(aPerformance) {
      let result = 0;

      result += Math.max(aPerformance.audience - 30, 0);

      if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);

      return result;
    }
  }
}

// 다형성을 활용해서 계산 로직을 재구성하기
// amountFor() 함수를 보면 장르마다 계산 방식을 다르게 처리하고 있다. 이런 형태의 조건부 로직은 늘어나면 골칫거리가 된다.
// 조건부 로직을 명확히하는 방법은 많지만, 여기서는 OOP 의 특성인 다형성을 활용할 것이다.

// 상속을 사용해서 희극 서브클래스, 비극 서브클래스가 각자의 구체적인 계산 로직을 정의하는 것이다.
// 이때 희극, 비극의 버전에 따라 계산 로직이 언어적 차원에서 연결된다.

// 상속계층부터 정의하자. 공연료와 적립포인트를 계산하는 함수를 담을 클래스가 필요하다.

// * 앞에서 출력로직을 따로 분리해서 계산로직에만 신경쓰면 된다.
// 중간 데이터 구조를 완성하는 enrichPerformance() 함수를 보면, amountFor() 와 volumeCreditsFor() 를 호출해 공연료와 적립 포인트를 계산한다.
// 이 두 함수를 전용 클래스로 옮기는 작업이 지금 해야할 목표다.
{
  function enrichPerformance(aPerformance) {
    // * // 생성자 파라미터를 함수선언으로 바꾸자.
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));

    const result = Object.assign({}, aPerformance);

    result.play = calculator.play;
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);

    return result;
  }

  // 클래스에 기능을 추가해보자. 연극 레코드 기능은 사실 다형성에 별다른 차이가 없지만, 데이터 변환을 클래스에서 처리한다는 점에서 코드가 명확해진다.
  class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
      this.performance = aPerformance;
      this.play = aPlay;
    }
  }
}

// 다음은 함수 옮기기 작업을 진행할 것이다.
{
  function enrichPerformance(aPerformance) {
    // * // 생성자 파라미터를 함수선언으로 바꾸자.
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));

    const result = Object.assign({}, aPerformance);

    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

    return result;
  }

  // * amountFor() 가 계산기 Performance 클래스를 이용하도록 한다.
  function amountFor(aPerformance) {
    return new Perforamance(aPerformance, playFor(aPerformance)).amount;
  }

  // * 마찬가지로 적용한다.
  function volumeCreditsFor(aPerformance) {
    return new Performance(aPerformance, playFor(aPerformance)).volumeCredits;
  }

  class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
      this.performance = aPerformance;
      this.play = aPlay;
    }

    get amount() {
      let result = 0;

      switch (this.play.type) {
        case "tragedy":
          result = 40000;

          if (this.audience > 30) {
            result += 1000 * (this.audience - 30);
          }

        case "comedy":
          result = 30000;

          if (this.audience > 20) {
            result += 10000 + 500 * (this.audience - 20);
          }

          result += 300 * this.audience;

          break;

        default:
          throw new Error(`알 수 없는 장르: ${this.play.type}`);
      }

      return result;
    }

    get volumeCredits() {
      let result = 0;

      result += Math.max(this.performance.audience - 30, 0);

      if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);

      return result;
    }
  }
}

// 클래스에 로직을 담았으니 다형성을 지원하도록 만들어보자. (타입 코드를 서브 클래스로 바꾸기)
// PerformanceCalculator 서브 클래스를 준비하고 createStatementData() 에서 적합한 서브 클래스를 사용하도록 만들어야한다.
// 그에 맞는 서브 클래스를 사용하려면 생성자 대신에 함수를 호출하도록 바꿔야한다.
// 왜냐하면, JS 에서는 서브 클래스의 인스턴스를 반환할 수 없기 때문이다.
{
  function enrichPerformance(aPerformance) {
    // 생성자 대신해 팩터리 함수를 사용하기
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));

    const result = Object.assign({}, aPerformance);

    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

    return result;
  }

  // 팩터리 함수를 사용하면, 어떤 서브 클래스의 인스턴스를 반환할 지를 선택할 수 있다.
  function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
      case "tragedy":
        return new TragedyCalculator(aPerformance, aPlay);
      case "comedy":
        return new ComedyCalculator(aPerformance, aPlay);
      default:
        throw new Error(`알 수 없는 장르: ${aPlay.type}`);
    }
  }

  class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
      this.performance = aPerformance;
      this.play = aPlay;
    }

    get amount() {
      throw new Error(`서브 클래스에서 처리하게 됩니다.`);
    }

    // 적립 포인트 계산 로직의 경우 일반적인 경우가 많으므로, 예외적인 케이스의 로직은 서브 클래스에서 오버라이드 하는 식의 방법이 좋다.
    get volumeCredits() {
      return Math.max(this.performance.audience - 30, 0);
    }
  }

  // 자연스럽게 서브 클래스에 PerformanceCalculator 의 로직이 오버라이드 되지만, 확실하게 하기 위해 다음과 같이 작설할 수 있다.
  class TragedyCalculator extends PerformanceCalculator {
    constructor() {
      super();
    }

    get amount() {
      let result = 40000;

      if (this.audience > 30) {
        result += 1000 * (this.audience - 30);
      }

      return result;
    }
  }

  class ComedyCalculator extends PerformanceCalculator {
    constructor() {
      super();
    }

    get amount() {
      let result = 30000;

      if (this.audience > 20) {
        result += 10000 + 500 * (this.audience - 20);
      }

      result += 300 * this.audience;

      return result;
    }

    get volumeCredits() {
      return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
  }
}

// 이제 새로운 장르에 대해서는 서브 클래스를 새로 만들고 createPerformanceCalculator() 에 추가하기만 하면 된다.
// 서브 클래스의 사용은 amountFor() 나 volumeCreditsFor() 같이 같은 타입의 다형성을 기반으로 실행되는 함수가 많으면 생각해보는 것이 좋다.

// 다뤄본 리팩토링 기법
// 1. 함수 추출
// 2. 변수 인라인
// 3. 함수 옮기기
// 4. 조건부 로직을 다형성으로 바꾸기
