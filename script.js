// Query selectors
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const calculatorScreen = document.querySelector('.calculator--screen');
const equalButton = document.querySelector('.equal');
const decimalButton = document.querySelector('.decimal');
const clearAllButton = document.querySelector('.clear--all');
const clearButton = document.querySelector('.clear');
const posNegButton = document.querySelector('.sign');

// Variables
let readySecondOperand = false;
let firstOperand, secondOperand, operator;
let displayValue = 0;


//Functions
function changeDisplay(e) {
    if (readySecondOperand) {
        operatorButtons.forEach(button => {
            button.classList.remove('active');
        })
        if (secondOperand) {
            calculatorScreen.textContent += e.target.value;
            secondOperand = Number(calculatorScreen.textContent);
        } else {
            calculatorScreen.textContent = e.target.value;
            secondOperand = Number(calculatorScreen.textContent);
        }
        return;
    }

    if (Number(calculatorScreen.textContent) === 0) {
        calculatorScreen.textContent = e.target.value;
    } else {
        calculatorScreen.textContent += e.target.value;
    }
    firstOperand = Number(calculatorScreen.textContent);

}

function useOperator(e) {
    operatorButtons.forEach(button => {
        button.classList.remove('active');
    })

    if(firstOperand && secondOperand && operator) {
        equals();
        firstOperand = Number(calculatorScreen.textContent);
    }

    operator = e.target.value;
    e.target.classList.add('active');
    readySecondOperand = true;
}

function equals() {
    if (secondOperand) {
        let result = operate(firstOperand, secondOperand, operator);
        calculatorScreen.textContent = Number(result.toFixed(5));
        secondOperand = null;
        firstOperand = result;
    } else if (secondOperand === 0) {
        let result = operate(firstOperand, secondOperand, operator);
        if(isNaN(result)) {
            calculatorScreen.textContent = `don't do that`;
            firstOperand = null;
            secondOperand = null;
            return;
        }
        calculatorScreen.textContent = Number(result);
        secondOperand = null;
        firstOperand = result;
    }
}

function decimal() {
    if (!calculatorScreen.textContent.includes('.')) {
        calculatorScreen.textContent += '.';
    }
}


function clearAll() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    calculatorScreen.textContent = '0';
}

function clear() {
    if (calculatorScreen.textContent.length > 1) {
        calculatorScreen.textContent = calculatorScreen.textContent.slice(0, -1);
    } else {
        calculatorScreen.textContent = '0';
    }
}

function changeSign() {
    if (Number(calculatorScreen.textContent > 0)) {
        calculatorScreen.textContent = -Math.abs(Number(calculatorScreen.textContent));
    } else {
        calculatorScreen.textContent = Math.abs(Number(calculatorScreen.textContent));
    }
}

function operate(a, b, operator) {
    if (operator === '+') {
        return a + b;
    } else if (operator === '-' ) {
        return a - b;
    } else if (operator === 'x') {
        return a * b;
    } else if (operator === '/') {
        if (b === 0) {
            return;
        } else {
            return a / b;
        }
    }
}

// Event Listeners

numberButtons.forEach(button => {
    button.addEventListener('click', changeDisplay);
})

operatorButtons.forEach(button => {
    button.addEventListener('click', useOperator);
})

equalButton.addEventListener('click', equals);

decimalButton.addEventListener('click', decimal);

clearAllButton.addEventListener('click', clearAll);

clearButton.addEventListener('click', clear);

posNegButton.addEventListener('click', changeSign);