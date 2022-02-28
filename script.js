console.log('The script is running');

// operators
var plus = document.querySelector('#plus');
var minus = document.querySelector('#minus');
var times = document.querySelector('#times');
var divide = document.querySelector('#divide');
var power = document.querySelector('#power');
var equal = document.querySelector('#equal');
var negate = document.querySelector('#negate');
var decimal = document.querySelector('#decimal');

// numbers


// Math Section begin
function add(a, b) {
	return a + b;
};

function subtract(minuend, subtrahend) {
	return minuend - subtrahend;
};

function multiply(a, b) {
  return a * b;
};

function divide(dividend, divisor) {
  return dividend / divisor;
} 

function power(base, exponent) {
	return Math.pow(base, exponent);
};

// Math Section End

console.log('6 + 9 = ', add(6,9));
console.log('6 - 9 = ', subtract(6,9));
console.log('6 * 9 = ', multiply(6,9));
console.log('6 / 9 = ', divide(6,9));
console.log('6 ^ 9 = ', power(6,9));