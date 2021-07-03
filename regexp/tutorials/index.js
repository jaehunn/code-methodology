// @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions

const log = console.log;

// 0. 정규표현식은 문자열의 특정 문자나 문자열을 "검색", "대체", "추출" 에 용이하다.

// 생성방법과 형식
// 1) 생성자 방식, new RegExp("표현식", "옵션") => 문자열로 작성해야하므로 따옴표에 주의한다.
// 2) 리터럴 방식, /표현식/옵션 => 따옴표없이 작성하며, \(Escape Character) 를 표현식에 작성하면 명령을 줄 수도 있다.

// 1. 연습하기

// 메서드
// 1) match(regexp): 정규식에 "일치" 하는 문자, 문자열을 배열형태로 "반환" 한다.
// 2) test(regexp): 정규식에 "일치" 하는 지에 대한 "여부" 를 불리언 형태로 반환한다.
// 3) replace(regexp, "새 문자열"): 정규식에 "일치" 하는 문자, 문자열을 새롭게 전달한 문자, 문자열로 "대체" 한다.

// 옵션(플래그)
// 1) g: 모든 문자열에 대해 (global)
// 2) i: 대/소문자를 구분하지 않고 (ignore case)
// 3) m: 여러 줄에 대해 (multi line) => global 과 어떻게 다를까?

const str = `
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
    Autem aperiam esse voluptates maxime dolor iste earum, 
    cupiditate Dolor alias illum.
`;

const str2 = "Autem ilme esse@seee werwww maxime dolor iste earum!";

const str3 = "010-1234-5678";

log(str.match(/dolor/g)); // ['dolor', 'dolor']
log(str.match(/dolor/gi)); // ['dolor', 'dolor', 'Dolor']

log(str.match(/./g)); // [' ', ' ', ' ', ' ', 'L', 'o', 'r', 'e', 'm', ',', ' ', 'i', ...] => . 은 임의의 하나의 문자를 말한다. 따라서 모든 문자를 배열로 가지게된다.
log(str.match(/.olor/g)); // [ 'dolor', 'dolor', 'Dolor' ]

// test() 메서드는 정규식.test(문자열) 로 적용한다.
log(/,/m.test(str)); // true

log(str.replace(/,/m, ".")); // 처음 일치한 문자(,) 에 대해 대체한다. 2번째 줄에서 일치한 , 는 그대로다.
log(str.replace(/,/gm, ".")); // 모두 바뀐다.
log(str); // 문자열이므로 불변성을 유지한다.

// 2. 명령주기

log(str.match(/\./g)); // ['.', '.'] => 임의의 문자가 아닌 문자 . 에 대해 적용한다.
log(/\.$/g.test(str)); // false => \ (Escape Character) 로 명령을 줄 수 있다. $ 는 적용하고자 하는 문자열의 끝을 의미한다. str 의 끝은 empty 다. (줄이 바뀌어 있다.)
log(/\.$/gm.test(str)); // true => global 과 multi line 의 차이가 이런 것이다. 문자의 처음과 끝을 검사할 때 여러 줄에 대한 검사를 이루고 싶다면 multi line 을 적용하자.

// 패턴 1
// 1) ^: 적용하고자 하는 문자, 문자열의 시작부분
// 2) $: 적용하고자 하는 문자, 문자열의 끝부분
// 3) .: 임의의 하나의 문자
// 4) A|B: A 또는 B
// 5) AB?: B 가 없거나 일치

log(str2.match(/^a/gi)); // ^ 다음의 문자, 문자열로 시작하는 단어를 대소문자 구분없이 모든 문자에 대해서 검색한다. => a 가 출력된다. Autem 은 A 로 시작하므로 일치되는 순간 바로 반환한다.
log(str.match(/s?it/g)); // ['sit', 'it', 'it'] => 문자를 탐색하고 반환하므로 원래의 문자는 신경쓰지않는다. elit 에는 상관없이 s?it 에 대응되므로 대응되는 것만 추출한다.
log(str.match(/au|autem/gi)); // 많이 헷갈리는 것이 Autem 이 출력되는 것을 예상했으나 Au 라는 단어를 찾는 순간 그 단어를 반환한다. 찾고자하는 문자, 문자열의 형식은 신경쓰지않는다.

// 패턴 2
// 1) {숫자}: 숫자만큼 연속 일치
// 2) {숫자, }: 숫자 이상만큼 연속 일치
// 3) {숫자1, 숫자2}: 숫자1 이상 숫자2 이하만큼 연속 일치
// 4) w: 숫자 또는 알파벳
// 5) W: w (숫자 또는 알파벳) 을 제외한 특수문자
// 6) b: 경계를 말한다. 경계는 시작과 끝을 설정하며, 만약 \bmoon\b 라면 m 과 n 을 경계로 설정한다.
log(str2.match(/r?w{3}/g)); // rwww
log(str2.match(/w{1,}/g)); // ['w', 'www'] => comma 뒤에 공백을 주어선 안된다.
log(str2.match(/\bi..e\b/g)); // ['ilme', 'iste'] => i 와 e 의 경계로 이루어진 길이가 4인 문자열을 모두 찾는다
log(str2.match(/\W/g)); // [' ', ' ', '@ ', ' ', ' ', ' ', ' ', '!'] => 공백도 특수문자에 해당한다.

// 패턴 3
// 1) d: 숫자
// 2) s: 공백
// 3) (?=): 앞쪽 일치 => 사용법은 예제를 통해서
// 4) (?<=): 뒤쪽 일치
log(str3.match(/\d{1,}(?=-)/g)); // ['010', '1234'] => - 앞쪽에 일치하는 것이 두개다.
log(str2.match(/\w{1,}(?=@)/g)); // ['esse'] => @ 앞쪽의 것들을 적용한다.
log(str2.match(/(?<=@)\w{1,}/g)); // ['seee'] => @ 뒤쪽의 것들을 적용한다.
