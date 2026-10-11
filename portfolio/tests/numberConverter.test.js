import assert from 'node:assert/strict';
import {
  validateNumberInput,
  convertNumber
} from '../src/lib/numberConverter.js';

console.log("▶ Running Number System Converter Tests...");

// 1. Validation Tests
{
  const v1 = validateNumberInput("101101", 2);
  assert.equal(v1.isValid, true);

  const v2 = validateNumberInput("102101", 2);
  assert.equal(v2.isValid, false, "Digit '2' in Binary should fail validation");

  const v3 = validateNumberInput("57.625", 8);
  assert.equal(v3.isValid, true);

  const v4 = validateNumberInput("58.625", 8);
  assert.equal(v4.isValid, false, "Digit '8' in Octal should fail validation");

  const v5 = validateNumberInput("2D.A", 16);
  assert.equal(v5.isValid, true);

  const v6 = validateNumberInput("2G.A", 16);
  assert.equal(v6.isValid, false, "Digit 'G' in Hexadecimal should fail validation");

  const v7 = validateNumberInput("10.5.2", 10);
  assert.equal(v7.isValid, false, "Multiple decimal points should fail validation");
}

// 2. Conversion Tests across all Base Pairs
{
  // Binary -> Decimal (101101_2 = 45_10)
  const c1 = convertNumber("101101", 2, 10);
  assert.equal(c1.isValid, true);
  assert.equal(c1.result, "45");

  // Decimal -> Hexadecimal (45_10 = 2D_16)
  const c2 = convertNumber("45", 10, 16);
  assert.equal(c2.isValid, true);
  assert.equal(c2.result, "2D");

  // Octal -> Hexadecimal (57_8 = 47_10 = 2F_16)
  const c3 = convertNumber("57", 8, 16);
  assert.equal(c3.isValid, true);
  assert.equal(c3.result, "2F");

  // Fractional test: Decimal 10.625 -> Binary (1010.101)
  const c4 = convertNumber("10.625", 10, 2);
  assert.equal(c4.isValid, true);
  assert.equal(c4.result, "1010.101");

  // Negative number test: -45 Decimal -> Hex (-2D)
  const c5 = convertNumber("-45", 10, 16);
  assert.equal(c5.isValid, true);
  assert.equal(c5.result, "-2D");

  // Lowercase Hex input: 2d -> Decimal 45
  const c6 = convertNumber("2d", 16, 10);
  assert.equal(c6.isValid, true);
  assert.equal(c6.result, "45");

  // Step breakdown check
  assert.ok(c4.steps.length > 0, "Step breakdown should be generated");
}

console.log("✔ Number System Converter Tests Passed!");
