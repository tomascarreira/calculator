const operatorFunctionArray = [dummieOp, add, subtract, multiply, divide, power];

let currentNumber = 0;
let savedNumber = 0;
let savedNumberUpdated = false;

let operator = 0;
let operatorActive = false;

let afterEqual = false;

let floatingPoint = 0;

function operate(operator, a, b) {
	return operatorFunctionArray[operator](a, b);
}

function dummieOp(a, b) {
	return b;
}

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function power(a, b) {
	return a ** b;
}

function updateScreen(text) {
	const screenText = document.querySelector(".screen-text");
	screenText.textContent = text;
}

const numberKeys = document.querySelectorAll(".number-key");
numberKeys.forEach((numberKey) => {
	numberKey.addEventListener("click", function (e) {
		if (afterEqual) {
			currentNumber = 0;
			afterEqual = false;
		}

		if (floatingPoint) {
			currentNumber += 10**-floatingPoint * +e.target.dataset.value;
			updateScreen(currentNumber);
			operatorActive = false;
			++floatingPoint;

		} else {
			currentNumber = currentNumber*10 + +e.target.dataset.value;
			updateScreen(currentNumber);
			operatorActive = false;
		}
	});
});

const operatorKeys = document.querySelectorAll(".operator-key");
operatorKeys.forEach((operatorKey) => {
	operatorKey.addEventListener("click", function (e) {
		if (operatorActive) {
			operator = e.target.dataset.key;

		} else if (savedNumberUpdated) {
			result = operate(operator, savedNumber, currentNumber);
			updateScreen(result);
			savedNumber = result;
			currentNumber = 0;
			operator = e.target.dataset.key;
			operatorActive = true;
			floatingPoint = 0;

		} else {
			operator = e.target.dataset.key;
			savedNumber = currentNumber;
			savedNumberUpdated = true;
			currentNumber = 0;
			operatorActive = true;
			floatingPoint = 0;
		}
	});
});

const equalKey = document.querySelector("#equal-key");
equalKey.addEventListener("click", function (e) {
	if (!operatorActive) {
		result = operate(operator, savedNumber, currentNumber);
		updateScreen(result);
		currentNumber = result;
		savedNumber = 0;
		savedNumberUpdated = false;
		operator = 0;
		afterEqual = true;
		floatingPoint = 0;
	} 
});

const clearKey = document.querySelector("#clear-key");
clearKey.addEventListener("click", function (e) {
	updateScreen(0);

	currentNumber = 0;
	savedNumber = 0;
	savedNumberUpdated = false;

	operator = 0;
	operatorActive = false;

	afterEqual = false;

	floatingPoint = 0;
});

const deleteKey = document.querySelector("#delete-key");
deleteKey.addEventListener("click", function (e) {
	const screenText = document.querySelector(".screen-text");

	if (floatingPoint) {
		newText = screenText.textContent.slice(0, -1);
		updateScreen(newText);
		currentNumber = +newText;
		--floatingPoint;

	} else {
		currentNumber = Math.trunc(currentNumber / 10);
		updateScreen(currentNumber);
	}
});

const floatingPointKey = document.querySelector("#floating-point-key");
floatingPointKey.addEventListener("click", function (e) {
	if (!floatingPoint) {
		updateScreen(currentNumber+".");
		++floatingPoint;		
	}
});