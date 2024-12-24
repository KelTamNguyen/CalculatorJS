// console.log('The script is running');

// DOM Nodes
const keypad = document.querySelector('#keypad');
const calculator = document.querySelector('#calculator-container');

// Functions
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
  if (divisor !== 0) return dividend / divisor;
	else return 'DIVIDE BY 0 ERROR';
} 

function power(base, exponent) {
	return base ** exponent;
};

function negateNumber(number) {
	return number * -1;
}

function findRemainder(a, n) {
	return a % n;
}

function calculate(n1, operator, n2=null) {
	// console.log(n1);
	// console.log(n2);
	n1 = parseFloat(n1);
	if (n2) n2 = parseFloat(n2);
	switch(operator) {
		case 'add':
			return add(n1, n2);
		case 'subtract':
			return subtract(n1, n2);
		case 'multiply':
			return multiply(n1, n2);
		case 'divide':
			return division(n1, n2);
		case 'modulus':
			return findRemainder(n1, n2);
		case 'exponent':
			return power(n1, n2);
		case 'negate':
			return negateNumber(n1);
	}
}

function getKeyType(key) {
  const { action } = key.dataset
  if (!action) return 'number';
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide' ||
		action === 'modulus' ||
		action === 'exponent'
  ) return 'operator';
	if  (action === 'negate') return 'negate';
  // For everything else, return the action
  return action;
}

function createResultString(key, displayedNum, state) {
  const keyContent = key.textContent;
  const keyType = getKeyType(key);
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = state;

  if (keyType === 'number') {
    if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') return keyContent;
    else return displayedNum + keyContent;
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.';
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';
    return displayedNum;
  }

	if (keyType === 'negate') return calculate(displayedNum, 'negate');

  if (keyType === 'operator') {
    if (
			firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
		) {
			return calculate(firstValue, operator, displayedNum);
		}
		else return displayedNum;
  }

  if (keyType === 'clear') return '0';

  if (keyType === 'calculate') {
		if (firstValue) {
			if(previousKeyType === 'calculate') {
				// Consecutive presses of the equals button results in consecutive calculations
				return calculate(displayedNum, operator, modValue);
			}
			// Normal calculation
			else return calculate(firstValue, operator, displayedNum);
		}
		return displayedNum;
  }
}

function updateCalculatorState(key, calculator, calculatedValue, displayedNum) {
  const keyType = getKeyType(key);
  const {
    firstValue,
    operator,
    modValue,
    previousKeyType
  } = calculator.dataset;

  calculator.dataset.previousKeyType = keyType;

  if (keyType === 'operator') {
		// Set to the most recently pressed operator
    calculator.dataset.operator = key.dataset.action;

		if (firstValue && previousKeyType !== 'operator' && previousKeyType !== 'calculate') calculator.dataset.firstValue = calculatedValue;
		else calculator.dataset.firstValue = displayedNum;
  }

  if (keyType === 'calculate') {
		if (firstValue && previousKeyType === 'calculate') calculator.dataset.modValue = modValue;
		else calculator.dataset.modValue = displayedNum;
	}

  if (keyType === 'clear' && key.textContent === 'AC') {
    calculator.dataset.firstValue = '';
    calculator.dataset.modValue = '';
    calculator.dataset.operator = '';
    calculator.dataset.previousKeyType = '';
  }
}

function updateVisualState(key, calculator) {
  const keyType = getKeyType(key)
  Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

	// Add styles to the currently active operator button
  if (keyType === 'operator') key.classList.add('is-depressed');
	// When CE is pressed, change the CE button back to AC button
  if (keyType === 'clear' && key.textContent !== 'AC') key.textContent = 'AC';
	// When there are entries in the calculator, change "all clear" to "clear entry"
  if (keyType !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]');
    clearButton.textContent = 'CE';
  }
}

keypad.addEventListener('click', (e) => {
  if (!e.target.matches('button')) return;
  const key = e.target;
  const displayedNum = input.textContent;
  const resultString = createResultString(key, displayedNum, calculator.dataset);

  input.textContent = resultString;
  updateCalculatorState(key, calculator, resultString, displayedNum);
  updateVisualState(key, calculator);
});
