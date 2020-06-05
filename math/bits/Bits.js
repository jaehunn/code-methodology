function bitLength(number) {
  let bitsCounter = 0;

  while (1 << bitsCounter <= number) {
    bitsCounter += 1;
  }

  return bitsCounter;
}

function countSetBits(originalNumber) {
  let setBitsCount = 0;
  let number = originalNumber;

  while (number) {
    setBitsCount += number & 1; // &: AND

    number >>= 1;
  }

  return setBitsCount;
}

// ^: XOR
function bitsDiff(numberA, numberB) {
  return countSetBits(numberA ^ numberB);
}

function clearBit(number, bitPosition) {
  const mask = ~(1 << bitPosition); // ~: Bits Inversion

  return number & mask;
}

function divideByTwo(number) {
  return number >> 1; // shift
}

function multiplyByTwo(number) {
  return number << 1;
}

function getBit(number, bitPosition) {
  return (number >> bitPosition) & 1; //
}

function isEven(number) {
  return (number & 1) === 0; // 2^0: 1
}

function isPositive(number) {
  if (number === 0) return false; // 0

  return ((number >> 31) & 1) === 0; // sign bit
}

function isPowerOfTwo(number) {
  return (number & (number - 1)) === 0; // only one bit: 1
}

function updateBit(number, bitPosition, bitValue) {
  const bitValueNormalized = bitValue ? 1 : 0;

  const clearMask = ~(1 << bitPosition);

  return (number & clearMask) | (bitValueNormalized << bitPosition);
}

function switchSign(number) {
  return ~number + 1; // twos complement
}

function setBit(number, bitPosition) {
  return number | (1 << bitPosition);
}

function multiplyUnsigned(numberA, numberB) {
  let result = 0;

  let multiplier = numberB;

  let bitIndex = 0;

  while (multiplier !== 0) {
    if (multiplier & 1) {
      result += numberA << bitIndex;
    }

    bitIndex += 1;
    multiplier >>= 1;
  }

  return result;
}

function fullAdder(numberA, numberB) {
  let result = 0;
  let carry = 0;

  for (let bit = 0; bit < 32; bit += 1) {
    const numberAi = getBit(numberA, bit);
    const numberBi = getBit(numberB, bit);

    const carryIn = carry;

    const plus = numberAi ^ numberBi; // 00 11 -> 0
    const bitSum = plus ^ carryIn; // previous carryIn

    const carryOut = (plus & carryIn) | (numberAi & numberBi);
    carry = carryOut;

    result |= bitSum << bit;
  }

  return result;
}
