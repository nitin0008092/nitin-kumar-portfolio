/**
 * Instruction Set Simulator (ISS) Engine
 * Computer Organization and Architecture (COA) Demonstration Module
 * 
 * Performs:
 * 1. Expression Validation
 * 2. Infix to Postfix Conversion (Shunting-Yard)
 * 3. 3-Address Code Generation
 * 4. 2-Address Code Generation
 * 5. 1-Address Code Generation
 * 6. 0-Address Code Generation
 */

export const OPERATOR_MAP = {
  '+': { precedence: 1, name: 'ADD' },
  '-': { precedence: 1, name: 'SUB' },
  '*': { precedence: 2, name: 'MUL' },
  '/': { precedence: 2, name: 'DIV' }
};

export const PRESET_EXPRESSIONS = [
  "(A+B)*(C-D)/E",
  "A+B*C-D/E",
  "(A+B+C)*(D-E)",
  "A*B+C*D-E/F",
  "(A-B)/(C+D*E)"
];

/**
 * Validates the raw input arithmetic expression.
 * Returns { isValid: boolean, error: string | null, tokens: string[] }
 */
export function validateExpression(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') {
    return { isValid: false, error: 'Expression cannot be empty.', tokens: [] };
  }

  // Remove whitespace
  const expr = rawInput.replace(/\s+/g, '');
  if (expr.length === 0) {
    return { isValid: false, error: 'Expression cannot be blank.', tokens: [] };
  }

  // Check valid characters: A-Z, +, -, *, /, (, )
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if (!/[A-Z+\-*/()]/.test(char)) {
      if (/[a-z]/.test(char)) {
        return { isValid: false, error: `Invalid character '${char}'. Only uppercase letters A-Z are allowed.` };
      }
      if (/[0-9]/.test(char)) {
        return { isValid: false, error: `Invalid character '${char}'. Numbers are not supported (only A-Z variables).` };
      }
      return { isValid: false, error: `Invalid character '${char}'. Supported characters are A-Z, +, -, *, /, (, ).` };
    }
  }

  // Tokenize & Validate sequence
  const tokens = expr.split('');
  let parenBalance = 0;

  for (let i = 0; i < tokens.length; i++) {
    const current = tokens[i];
    const prev = i > 0 ? tokens[i - 1] : null;
    const next = i < tokens.length - 1 ? tokens[i + 1] : null;

    if (current === '(') {
      parenBalance++;
      if (next === ')') {
        return { isValid: false, error: 'Empty parentheses "()" detected.' };
      }
      if (next && ['+', '-', '*', '/'].includes(next)) {
        return { isValid: false, error: `Invalid operator '${next}' immediately following '(' at position ${i + 2}.` };
      }
    } else if (current === ')') {
      parenBalance--;
      if (parenBalance < 0) {
        return { isValid: false, error: 'Unbalanced parentheses: closing bracket \')\' before opening bracket \'(\'.' };
      }
      if (prev && ['+', '-', '*', '/'].includes(prev)) {
        return { isValid: false, error: `Invalid operator '${prev}' immediately before ')' at position ${i}.` };
      }
    } else if (['+', '-', '*', '/'].includes(current)) {
      if (i === 0) {
        return { isValid: false, error: `Expression cannot start with operator '${current}'.` };
      }
      if (i === tokens.length - 1) {
        return { isValid: false, error: `Expression cannot end with operator '${current}'.` };
      }
      if (next && ['+', '-', '*', '/'].includes(next)) {
        return { isValid: false, error: `Consecutive operators '${current}${next}' detected near position ${i + 1}.` };
      }
    } else if (/[A-Z]/.test(current)) {
      if (next && /[A-Z]/.test(next)) {
        return { isValid: false, error: `Missing operator between variable '${current}' and '${next}'.` };
      }
      if (next === '(') {
        return { isValid: false, error: `Missing operator between variable '${current}' and opening parenthesis '('.` };
      }
      if (prev === ')') {
        return { isValid: false, error: `Missing operator between closing parenthesis ')' and variable '${current}'.` };
      }
    }
  }

  if (parenBalance !== 0) {
    return { isValid: false, error: `Unbalanced parentheses: missing ${parenBalance} closing bracket(s) ')'.` };
  }

  return { isValid: true, error: null, tokens };
}

/**
 * Converts Infix expression tokens to Postfix notation using Dijkstra's Shunting-Yard algorithm.
 */
export function infixToPostfix(tokens) {
  const output = [];
  const operatorStack = [];

  for (const token of tokens) {
    if (/[A-Z]/.test(token)) {
      output.push(token);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
        output.push(operatorStack.pop());
      }
      operatorStack.pop(); // Pop '('
    } else if (OPERATOR_MAP[token]) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== '(' &&
        OPERATOR_MAP[operatorStack[operatorStack.length - 1]].precedence >= OPERATOR_MAP[token].precedence
      ) {
        output.push(operatorStack.pop());
      }
      operatorStack.push(token);
    }
  }

  while (operatorStack.length > 0) {
    output.push(operatorStack.pop());
  }

  return output.join('');
}

/**
 * Generates Three Address Code (3AC).
 * Example: T1 = A + B
 */
export function generateThreeAddressCode(postfix) {
  const stack = [];
  const instructions = [];
  let tempCounter = 1;

  for (const char of postfix) {
    if (/[A-Z]/.test(char)) {
      stack.push(char);
    } else if (OPERATOR_MAP[char]) {
      const op2 = stack.pop();
      const op1 = stack.pop();
      const tempVar = `T${tempCounter++}`;
      instructions.push({
        code: `${tempVar} = ${op1} ${char} ${op2}`,
        target: tempVar,
        op1,
        op: char,
        op2
      });
      stack.push(tempVar);
    }
  }

  return {
    instructions,
    count: instructions.length
  };
}

/**
 * Generates Two Address Code (2AC).
 * Example:
 * MOV R1, A
 * ADD R1, B
 */
export function generateTwoAddressCode(postfix) {
  const stack = [];
  const instructions = [];
  let regCounter = 1;

  for (const char of postfix) {
    if (/[A-Z]/.test(char)) {
      stack.push({ name: char, isReg: false });
    } else if (OPERATOR_MAP[char]) {
      const op2 = stack.pop();
      const op1 = stack.pop();
      const opName = OPERATOR_MAP[char].name;

      let resultReg;
      if (op1.isReg) {
        resultReg = op1.name;
        instructions.push({
          code: `${opName} ${resultReg}, ${op2.name}`,
          type: opName,
          reg: resultReg,
          operand: op2.name
        });
      } else {
        resultReg = `R${regCounter++}`;
        instructions.push({
          code: `MOV ${resultReg}, ${op1.name}`,
          type: 'MOV',
          reg: resultReg,
          operand: op1.name
        });
        instructions.push({
          code: `${opName} ${resultReg}, ${op2.name}`,
          type: opName,
          reg: resultReg,
          operand: op2.name
        });
      }

      stack.push({ name: resultReg, isReg: true });
    }
  }

  return {
    instructions,
    count: instructions.length
  };
}

/**
 * Generates One Address Code (1AC).
 * Uses Accumulator (AC) and memory temporaries.
 */
export function generateOneAddressCode(postfix) {
  const stack = [];
  const instructions = [];
  let tempCounter = 1;

  const tokens = postfix.split('');
  let currentAC = null;

  for (let i = 0; i < tokens.length; i++) {
    const char = tokens[i];
    if (/[A-Z]/.test(char)) {
      stack.push({ name: char, isTemp: false });
    } else if (OPERATOR_MAP[char]) {
      const op2 = stack.pop();
      const op1 = stack.pop();
      const opName = OPERATOR_MAP[char].name;
      const isLastStep = (i === tokens.length - 1);

      if (currentAC !== op1.name) {
        instructions.push({
          code: `LOAD ${op1.name}`,
          type: 'LOAD',
          operand: op1.name
        });
      }

      instructions.push({
        code: `${opName} ${op2.name}`,
        type: opName,
        operand: op2.name
      });

      if (isLastStep) {
        instructions.push({
          code: `STORE RESULT`,
          type: 'STORE',
          operand: 'RESULT'
        });
        currentAC = 'RESULT';
        stack.push({ name: 'RESULT', isTemp: true });
      } else {
        const tempVar = `T${tempCounter++}`;
        instructions.push({
          code: `STORE ${tempVar}`,
          type: 'STORE',
          operand: tempVar
        });
        currentAC = tempVar;
        stack.push({ name: tempVar, isTemp: true });
      }
    }
  }

  return {
    instructions,
    count: instructions.length
  };
}

/**
 * Generates Zero Address Code (0AC).
 * Uses Evaluation Stack (PUSH operand, ADD, SUB, MUL, DIV).
 */
export function generateZeroAddressCode(postfix) {
  const instructions = [];

  for (const char of postfix) {
    if (/[A-Z]/.test(char)) {
      instructions.push({
        code: `PUSH ${char}`,
        type: 'PUSH',
        operand: char
      });
    } else if (OPERATOR_MAP[char]) {
      const opName = OPERATOR_MAP[char].name;
      instructions.push({
        code: `${opName}`,
        type: opName,
        operand: null
      });
    }
  }

  return {
    instructions,
    count: instructions.length
  };
}

/**
 * Executes full simulation pipeline
 */
export function simulateExpression(rawExpression) {
  const validation = validateExpression(rawExpression);
  if (!validation.isValid) {
    return {
      isValid: false,
      error: validation.error,
      postfix: null,
      threeAddress: null,
      twoAddress: null,
      oneAddress: null,
      zeroAddress: null
    };
  }

  const postfix = infixToPostfix(validation.tokens);
  const threeAddress = generateThreeAddressCode(postfix);
  const twoAddress = generateTwoAddressCode(postfix);
  const oneAddress = generateOneAddressCode(postfix);
  const zeroAddress = generateZeroAddressCode(postfix);

  return {
    isValid: true,
    error: null,
    expression: rawExpression.replace(/\s+/g, ''),
    postfix,
    threeAddress,
    twoAddress,
    oneAddress,
    zeroAddress
  };
}
