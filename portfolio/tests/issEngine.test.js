import assert from 'node:assert/strict';
import {
  validateExpression,
  infixToPostfix,
  generateThreeAddressCode,
  generateTwoAddressCode,
  generateOneAddressCode,
  generateZeroAddressCode,
  simulateExpression
} from '../src/lib/issEngine.js';

console.log("▶ Running Instruction Set Simulator (ISS) Engine Tests...");

// 1. Validation Tests
{
  const v1 = validateExpression("(A+B)*(C-D)/E");
  assert.equal(v1.isValid, true, "Valid expression should pass validation");

  const v2 = validateExpression("(A+B");
  assert.equal(v2.isValid, false, "Unbalanced parentheses should fail");
  assert.match(v2.error, /Unbalanced parentheses/i);

  const v3 = validateExpression("A++B");
  assert.equal(v3.isValid, false, "Consecutive operators should fail");
  assert.match(v3.error, /Consecutive operators/i);

  const v4 = validateExpression("a+b");
  assert.equal(v4.isValid, false, "Lowercase characters should fail");
  assert.match(v4.error, /Only uppercase letters/i);

  const v5 = validateExpression("A+1");
  assert.equal(v5.isValid, false, "Numbers should fail");
}

// 2. Infix to Postfix Shunting-Yard Tests
{
  const v = validateExpression("(A+B)*(C-D)/E");
  const postfix = infixToPostfix(v.tokens);
  assert.equal(postfix, "AB+CD-*E/", "Postfix conversion should match expected RPN");
}

// 3. Instruction Generation & Counting Tests
{
  const sim = simulateExpression("(A+B)*(C-D)/E");
  assert.equal(sim.isValid, true);
  assert.equal(sim.postfix, "AB+CD-*E/");
  
  // 3AC check
  assert.equal(sim.threeAddress.count, 4, "3AC instruction count for (A+B)*(C-D)/E should be 4");
  assert.equal(sim.threeAddress.instructions[0].code, "T1 = A + B");

  // 2AC check
  assert.equal(sim.twoAddress.count, 6, "2AC instruction count should be 6");

  // 1AC check
  assert.equal(sim.oneAddress.count, 11, "1AC instruction count should be 11");

  // 0AC check
  assert.equal(sim.zeroAddress.count, 9, "0AC instruction count should be 9");
}

console.log("✔ Instruction Set Simulator (ISS) Engine Tests Passed!");
