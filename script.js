console.log('The script is running');

// Variables
// let lhs = 0;
// let operator, rhs = undefined;
let inputs = [];

// DOM Nodes
const input = document.querySelector('#input');
const numKeys = Array.from(document.querySelectorAll('.numkey'));
const operatorKeys = Array.from(document.querySelectorAll('.operator'));
const equal = document.querySelector('#equal');
const decimal = document.querySelector('#decimal');
const negate = document.querySelector('#negate');
const clearBtn = document.querySelector('#clear-btn');
const keypad = document.querySelector('#keypad');
const calculator = document.querySelector('#calculator-container');

// Functions
function clearDisplay() {
	input.textContent = '';
	lhs = undefined;
	operator = undefined;
	rhs = undefined;
	console.log('--Display Cleared--');
	console.log('LHS: ', lhs);
	console.log('operator: ', operator);
	console.log('RHS: ', rhs);
}

function add(a, b) {
	return a + b;
};

function subtract(minuend, subtrahend) {
	return minuend - subtrahend;
};

function multiply(a, b) {
  return a * b;
}

function division(dividend, divisor) {
  return dividend / divisor;
} 

function power(base, exponent) {
	return Math.pow(base, exponent);
};

function negateNumber(number) {
	return 0 - number;
}

function findRemainder(a, n) {
	return a % n;
}

function calculate(n1, operator, n2) {
	console.log(n1);
	console.log(n2);
	n1 = parseFloat(n1);
	n2 = parseFloat(n2);
	switch(operator) {
		case 'add':
			return n1 + n2;
		case 'subtract':
			return n1 - n2;
		case 'multiply':
			return n1 * n2;
		case 'divide':
			return n1 / n2;
		case 'modulus':
			return n1 % n2;
		case 'exponent':
			return n1 ** n2;
	}
}

keypad.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = input.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'));

    if (!action) {
      if (
        displayedNum === '0' ||
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        input.textContent = keyContent;
      } else {
        input.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = 'number';
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        input.textContent = displayedNum + '.';
      } else if (
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate'
      ) {
        input.textContent = '0.';
      }

      calculator.dataset.previousKeyType = 'decimal';
    }

		if (action === 'negate') {
			console.log('+/- pressed!');
			input.textContent = (parseFloat(input.textContent) * -1).toString();
			calculator.dataset.previousKeyType = 'negate';
		}

    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (
        firstValue &&
        operator &&
        previousKeyType !== 'operator' &&
        previousKeyType !== 'calculate'
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        input.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add('is-depressed');
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.operator = action;
    }

    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = '';
        calculator.dataset.modValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = '';
      } else {
        key.textContent = 'AC';
      }

      input.textContent = 0;
      calculator.dataset.previousKeyType = 'clear';
    }

    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]');
      clearButton.textContent = 'CE';
    }

    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === 'calculate') {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }

        input.textContent = calculate(firstValue, operator, secondValue);
      }

      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = 'calculate';
    }
  }
});


// Debug
// console.log('6 + 9 = ', add(6, 9));
// console.log('6 - 9 = ', subtract(6, 9));
// console.log('6 * 9 = ', multiply(6, 9));
// console.log('6 / 9 = ', division(6, 9));
// console.log('6 ^ 9 = ', power(6, 9));
// console.log('6 % 4 = ', findRemainder(6, 4));
// console.log('negated 6 = ', negateNumber(6));
// console.log(numKeys);