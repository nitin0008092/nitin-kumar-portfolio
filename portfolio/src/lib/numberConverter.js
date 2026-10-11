/**
 * Number System Converter Engine
 * Handles Base 2 (Binary), Base 8 (Octal), Base 10 (Decimal), Base 16 (Hexadecimal)
 * Supports Integer & Fractional numbers, leading signs (+/-), step-by-step explanations.
 */

export const BASES = {
  2: { name: 'Binary', prefix: '0b', radix: 2, digits: '01' },
  8: { name: 'Octal', prefix: '0o', radix: 8, digits: '01234567' },
  10: { name: 'Decimal', prefix: '', radix: 10, digits: '0123456789' },
  16: { name: 'Hexadecimal', prefix: '0x', radix: 16, digits: '0123456789ABCDEF' }
};

/**
 * Validates input string against source base rules.
 */
export function validateNumberInput(rawInput, srcBase) {
  if (rawInput === null || rawInput === undefined) {
    return { isValid: false, error: 'Input cannot be empty.' };
  }

  const str = String(rawInput).trim();
  if (!str) {
    return { isValid: false, error: 'Input cannot be empty.' };
  }

  // Check sign
  let sign = '';
  let numberPart = str;
  if (str.startsWith('+') || str.startsWith('-')) {
    sign = str[0];
    numberPart = str.slice(1);
  }

  if (!numberPart) {
    return { isValid: false, error: 'Number part cannot be empty after sign.' };
  }

  // Check decimal points
  const dotParts = numberPart.split('.');
  if (dotParts.length > 2) {
    return { isValid: false, error: 'Multiple decimal points detected.' };
  }

  const allowedDigits = BASES[srcBase].digits;
  const upperPart = numberPart.toUpperCase();

  for (let i = 0; i < upperPart.length; i++) {
    const char = upperPart[i];
    if (char === '.') continue;
    if (!allowedDigits.includes(char)) {
      return {
        isValid: false,
        error: `Invalid digit '${rawInput[sign ? i + 1 : i]}' for base ${srcBase} (${BASES[srcBase].name}). Allowed digits: ${allowedDigits}`
      };
    }
  }

  return { isValid: true, error: null, sign, integerPart: dotParts[0], fractionPart: dotParts[1] || null };
}

/**
 * Parses integer string in given base to BigInt or Number value.
 */
function parseIntegerPart(intStr, srcRadix) {
  if (!intStr || intStr === '0') return BigInt(0);
  const upperStr = intStr.toUpperCase();
  let result = BigInt(0);
  const base = BigInt(srcRadix);

  for (let i = 0; i < upperStr.length; i++) {
    const char = upperStr[i];
    const val = BigInt(BASES[srcRadix].digits.indexOf(char));
    result = result * base + val;
  }
  return result;
}

/**
 * Converts BigInt integer value to target radix string.
 */
function formatIntegerPart(bigIntVal, destRadix) {
  if (bigIntVal === BigInt(0)) return '0';
  const digits = BASES[destRadix].digits;
  const base = BigInt(destRadix);
  let current = bigIntVal;
  let result = '';

  while (current > BigInt(0)) {
    const rem = Number(current % base);
    result = digits[rem] + result;
    current = current / base;
  }
  return result;
}

/**
 * Parses fractional string in given base to double precision decimal fraction [0, 1).
 */
function parseFractionPart(fracStr, srcRadix) {
  if (!fracStr) return 0;
  const upperStr = fracStr.toUpperCase();
  let fractionVal = 0;
  let factor = 1 / srcRadix;

  for (let i = 0; i < upperStr.length; i++) {
    const char = upperStr[i];
    const digitVal = BASES[srcRadix].digits.indexOf(char);
    fractionVal += digitVal * factor;
    factor /= srcRadix;
  }

  return fractionVal;
}

/**
 * Converts double precision decimal fraction [0, 1) to target radix string.
 * Returns { stringVal, isExact }
 */
function formatFractionPart(decimalFrac, destRadix, maxPrecision = 10) {
  if (decimalFrac === 0) return { stringVal: '', isExact: true };

  const digits = BASES[destRadix].digits;
  let current = decimalFrac;
  let result = '';
  let isExact = false;

  for (let i = 0; i < maxPrecision; i++) {
    if (current === 0) {
      isExact = true;
      break;
    }
    current *= destRadix;
    const integerDigit = Math.floor(current);
    result += digits[integerDigit];
    current -= integerDigit;
    // Fix micro floating point inaccuracies e.g. 0.999999999999
    if (Math.abs(current - 1) < 1e-12) {
      // Round up last
      result = result.slice(0, -1) + digits[integerDigit + 1];
      isExact = true;
      break;
    }
    if (Math.abs(current) < 1e-12) {
      isExact = true;
      break;
    }
  }

  return { stringVal: result, isExact };
}

/**
 * Performs full base conversion.
 */
export function convertNumber(rawInput, srcBase, destBase) {
  const validation = validateNumberInput(rawInput, srcBase);
  if (!validation.isValid) {
    return {
      isValid: false,
      error: validation.error,
      result: null,
      isExact: true,
      steps: []
    };
  }

  const { sign, integerPart, fractionPart } = validation;
  const srcRadix = Number(srcBase);
  const destRadix = Number(destBase);

  // If source and dest bases are identical
  if (srcRadix === destRadix) {
    const formattedInt = (integerPart || '0').toUpperCase();
    const formattedFrac = fractionPart ? `.${fractionPart.toUpperCase()}` : '';
    const cleanSign = sign === '+' ? '' : sign;
    return {
      isValid: true,
      error: null,
      result: `${cleanSign}${formattedInt}${formattedFrac}`,
      isExact: true,
      steps: ["Source and destination bases are identical. Output is equal to normalized input."]
    };
  }

  // 1. Integer Conversion
  const intBigInt = parseIntegerPart(integerPart || '0', srcRadix);
  const destIntStr = formatIntegerPart(intBigInt, destRadix);

  // 2. Fraction Conversion
  let destFracStr = '';
  let isExact = true;
  if (fractionPart) {
    const decimalFrac = parseFractionPart(fractionPart, srcRadix);
    const fracRes = formatFractionPart(decimalFrac, destRadix, 10);
    destFracStr = fracRes.stringVal ? `.${fracRes.stringVal}` : '';
    isExact = fracRes.isExact;
  }

  const cleanSign = sign === '+' ? '' : sign;
  const finalResult = `${cleanSign}${destIntStr}${destFracStr}`;

  // 3. Step Generation
  const steps = generateConversionSteps({
    rawInput: String(rawInput).trim(),
    srcBase,
    destBase,
    sign,
    integerPart: integerPart || '0',
    fractionPart,
    intBigInt,
    destIntStr,
    destFracStr,
    isExact
  });

  return {
    isValid: true,
    error: null,
    result: finalResult,
    isExact,
    steps
  };
}

/**
 * Generates detailed mathematical step-by-step breakdown.
 */
export function generateConversionSteps({ rawInput, srcBase, destBase, integerPart, fractionPart, intBigInt, destIntStr, destFracStr, isExact }) {
  const steps = [];
  const srcName = BASES[srcBase].name;
  const destName = BASES[destBase].name;
  const srcRadix = Number(srcBase);
  const destRadix = Number(destBase);

  steps.push(`Converting ${rawInput} from Base ${srcBase} (${srcName}) to Base ${destBase} (${destName})`);

  // Direct Binary <-> Octal / Hexadecimal fast paths
  if ((srcBase === 2 && destBase === 8) || (srcBase === 2 && destBase === 16)) {
    const groupSize = destBase === 8 ? 3 : 4;
    steps.push(`Direct Bit-Grouping Method (Binary → ${destName}):`);
    steps.push(`1. Group binary digits into sets of ${groupSize} bits from right-to-left for integer part, and left-to-right for fraction part.`);
    steps.push(`2. Integer part '${integerPart}' converts directly to '${destIntStr}'.`);
    if (fractionPart) {
      steps.push(`3. Fractional part '.${fractionPart}' converts directly to '${destFracStr}'.`);
    }
    return steps;
  }

  if ((srcBase === 8 && destBase === 2) || (srcBase === 16 && destBase === 2)) {
    const groupSize = srcBase === 8 ? 3 : 4;
    steps.push(`Direct Bit-Expansion Method (${srcName} → Binary):`);
    steps.push(`1. Expand each digit into its corresponding ${groupSize}-bit binary representation.`);
    steps.push(`2. Integer part '${integerPart}' expands to '${destIntStr}'.`);
    if (fractionPart) {
      steps.push(`3. Fractional part '.${fractionPart}' expands to '${destFracStr}'.`);
    }
    return steps;
  }

  // General Step-by-Step Conversion via Decimal Intermediate (if src != 10 and dest != 10)
  if (srcRadix !== 10) {
    steps.push(`Step 1: Convert Integer Part '${integerPart}' from Base ${srcBase} to Base 10 (Decimal):`);
    const upperInt = integerPart.toUpperCase();
    const len = upperInt.length;
    let expansionTerms = [];
    for (let i = 0; i < len; i++) {
      const char = upperInt[i];
      const val = BASES[srcRadix].digits.indexOf(char);
      const power = len - 1 - i;
      expansionTerms.push(`(${val} × ${srcRadix}^${power})`);
    }
    steps.push(`   ${upperInt}_${srcBase} = ${expansionTerms.join(' + ')} = ${intBigInt.toString()}_10`);

    if (fractionPart) {
      steps.push(`Step 2: Convert Fractional Part '.${fractionPart}' from Base ${srcBase} to Base 10 (Decimal):`);
      const decimalFrac = parseFractionPart(fractionPart, srcRadix);
      steps.push(`   0.${fractionPart}_${srcBase} = ${decimalFrac.toString()}_10`);
    }
  }

  if (destRadix !== 10) {
    const stepNum = srcRadix !== 10 ? (fractionPart ? '3' : '2') : '1';
    steps.push(`Step ${stepNum}: Convert Decimal Value to Base ${destBase} (${destName}):`);
    steps.push(`   Integer Part: ${intBigInt.toString()}_10 = ${destIntStr}_${destBase}`);
    if (fractionPart && destFracStr) {
      steps.push(`   Fractional Part: = ${destFracStr}_${destBase}${isExact ? ' (exact)' : ' (rounded)'}`);
    }
  }

  return steps;
}
