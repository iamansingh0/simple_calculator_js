const calculator = {
  displayValue: "0",
  op1: null,
  waitingForSecondOperand: false,
  op2: null,
  operator: null,
  secondOperand: "0",
};

function input(digit) {
  const { displayValue } = calculator;
  calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
  console.log(calculator);
}

function secondInput(digit) {
  calculator.op2 = null;
  const { secondOperand } = calculator;
  calculator.secondOperand =
    secondOperand === "0" ? digit : secondOperand + digit;
  calculator.displayValue += digit;
  console.log(calculator);
}

function FirstInputDecimal(dot) {
  // If the `displayValue` property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
    console.log(calculator);
  }
}

function SecondInputDecimal(dot) {
  if (!calculator.secondOperand.includes(dot)) {
    calculator.secondOperand += dot;
    calculator.displayValue += dot;
    console.log(calculator);
  }
}

function OperatorHandling(op) {
  const { op1, displayValue, operator, op2, secondOperand } = calculator;
  calculator.waitingForSecondOperand = false;

  let inputValue, secondInputValue;

  if (op1 == null) {
    inputValue = parseFloat(displayValue);
    calculator.op1 = inputValue;
    // console.log(calculator)
  } else if (operator != null) {
    secondInputValue = parseFloat(secondOperand);
    console.log(`second input: ${secondInputValue}`);
    calculator.op2 = secondInputValue;
    const result = calculate(op1, calculator.op2, operator);
    console.log(result);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.op1 = result;
    calculator.secondOperand = "0";
    // console.log(calculator);
  }

  calculator.waitingForSecondOperand = true;
  calculator.displayValue += op;
  calculator.operator = op;
  console.log(calculator);
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.secondOperand = "0";
  calculator.op1 = null;
  calculator.op2 = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

function reset() {
  calculator.op1 = null;
  calculator.op2 = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function equalOperator() {
  const { op1, waitingForSecondOperand, secondOperand, displayValue, operator } = calculator;
  if ((waitingForSecondOperand === true && secondOperand === "0") || waitingForSecondOperand === false) {
    calculator.displayValue = parseFloat(displayValue);
    reset();
    console.log(calculator);
  } else if (waitingForSecondOperand === true && secondOperand != "0") {
    let secondInputValue = parseFloat(secondOperand);
    calculator.op2 = secondInputValue;
    const result = calculate(op1, calculator.op2, operator);
    console.log(result);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    reset();
    calculator.secondOperand = "0";
    console.log(calculator);
  }
}

function calculate(op1, op2, operator) {
  if (operator === "+") {
    return op1 + op2;
  } else if (operator === "-") {
    return op1 - op2;
  } else if (operator === "x") {
    return op1 * op2;
  } else if (operator === "÷") {
    return op1 / op2;
  }
  return op2;
}

function updateDisplay() {
  const screen = document.querySelector(".header-screen");
  screen.value = calculator.displayValue;
}
updateDisplay();

const keys = document.querySelector(".calculator-keys");

keys.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }
  if (target.classList.contains("special")) {
    OperatorHandling(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("decimal")) {
    if (calculator.waitingForSecondOperand === true) {
      SecondInputDecimal(target.value);
      updateDisplay();
    } else {
      FirstInputDecimal(target.value);
      updateDisplay();
    }
    return;
  }
  if (target.classList.contains("equal-sign")) {
    equalOperator();
    updateDisplay();
    return;
  }
  if (calculator.waitingForSecondOperand === true) {
    secondInput(target.value);
    updateDisplay();
  } else {
    input(target.value);
    updateDisplay();
  }
});

const allClear = document.querySelector(".keypad");
allClear.addEventListener("click", (event) => {
  const { target } = event;
  if (target.classList.contains("all-clear")) {
    resetCalculator();
    updateDisplay();
  }
});