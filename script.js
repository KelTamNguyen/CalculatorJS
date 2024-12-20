console.log('The script is running');

// Variables
let leftHandSide, operator, rightHandSide = undefined;

// DOM Nodes
const input = document.querySelector('.input');
const numKeys = Array.from(document.querySelectorAll('.numkey'));
const operatorKeys = Array.from(document.querySelectorAll('.operator'));
const equal = document.querySelector('#equal');
const decimal = document.querySelector('#decimal');
const negate = document.querySelector('#negate');
const clearBtn = document.querySelector('#clear-btn');

// Functions
function clearDisplay() {
	input.textContent = '';
	leftHandSide = undefined;
	operator = undefined;
	rightHandSide = undefined;
	console.log('--Display Cleared--');
	console.log('LHS: ', leftHandSide);
	console.log('operator: ', operator);
	console.log('RHS: ', rightHandSide);
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

function operate() {
	switch (operator) {
		case '+':
			input.textContent = add(leftHandSide, rightHandSide).toString();
			leftHandSide = undefined;
			rightHandSide = undefined;
			operator = undefined;
			break;
			case '-':
				input.textContent = subtract(leftHandSide, rightHandSide).toString();
				leftHandSide = undefined;
				rightHandSide = undefined;
				operator = undefined;
				break;
			case '÷':
				input.textContent = division(leftHandSide, rightHandSide).toString();
				leftHandSide = undefined;
				rightHandSide = undefined;
				operator = undefined;
				break;	
			case '×':
				input.textContent = multiply(leftHandSide, rightHandSide).toString();
				leftHandSide = undefined;
				rightHandSide = undefined;
				operator = undefined;
				break;	
	}
}

// Event Listeners
numKeys.forEach(numkey => numkey.addEventListener('click', (e) => {
	console.log('keypad pressed: ', e.target.textContent);
	if (operator) {
		input.textContent = ''
		input.textContent += e.target.textContent;
		rightHandSide = Number(input.textContent);
		console.log('right operand: ', rightHandSide);
	} else {
		input.textContent += e.target.textContent;
		leftHandSide = Number(input.textContent);
		console.log('left operand: ', leftHandSide);
	}
}));

operatorKeys.forEach(operatorBtn => operatorBtn.addEventListener('click', (e) => {
	console.log('operator pressed: ', e.target.textContent);
	if (leftHandSide) {
		operator = e.target.textContent;
	}
	if (operator === undefined) {
		input.textContent = '';
		input.textContent += e.target.textContent;
	} else {
		return;
	}
	console.log('operator: ', operator);

}));
equal.addEventListener('click', operate);
clearBtn.addEventListener('click', clearDisplay);


// Debug
// console.log('6 + 9 = ', add(6, 9));
// console.log('6 - 9 = ', subtract(6, 9));
// console.log('6 * 9 = ', multiply(6, 9));
// console.log('6 / 9 = ', division(6, 9));
// console.log('6 ^ 9 = ', power(6, 9));
// console.log('6 % 4 = ', findRemainder(6, 4));
// console.log('negated 6 = ', negateNumber(6));
// console.log(numKeys);