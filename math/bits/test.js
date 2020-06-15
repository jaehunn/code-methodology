function bitsDiff(numberA, numberB) {
  return countSetBits(numberA ^ numberB); // XOR
}

function clearBit(number, bitPosition) {
  const mask = ~(1 << bitPoisition); // bit inversion

  return number & mask;
}

function divideByTwo(number) {
  return number >> 1;
}

function multiplyByTwo(number) {
  return number << 1;
}

function getBit(number, bitPosition) {
  return (number >> bitPosition) & 1;
}

function isEven(number) {
  return (number & 1) === 0;
}

function isPositive(number) {
  if (number === 0) return false;

  return ((number >> 31) & 1) === 0;
}

function isPowerOfTwo(number) {
  return (number & (number - 1)) === 0;
}

function updateBit(number, bitPosition, bitValue) {
  const bitValueNormalized = bitValue ? 1 : 0;

  const clearMask = ~(1 << bitPosition); //

  // clear => set
  return (number & clearMask) | (bitValueNormalized << bitPosition);
}

function switchSign(number) {
  return ~number + 1; // inversion -> +1
}

function setBit(number, bitPosition) {
  return number | (1 << bitPosition);
}

function multiplyUnsigned(numberA, numberB) {
  let result = 0;
  let multiplier = numberB;
  let bitIndex = 0;

  while (multiplier) {
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

    const plus = numberAi ^ numberBi;
    const bitSum = plus ^ carryIn;

    // carryIn or bit self
    const carryOut = (plus & carryIn) | (numberAi & numberBi);
    carry = carryOut;

    result |= bitSum << bit;
  }

  return result;
}
