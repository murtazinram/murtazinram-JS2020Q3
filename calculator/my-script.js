class Calculator {

    constructor(previous, current) {
        this.previous = previous;
        this.current = current
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    appendNumber(number) {
        if (this.currentOperand.includes('.') && number === '.') return
        this.currentOperand = this.currentOperand.concat(number);
        // console.log(this.currentOperand)
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '' && this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // console.log('prev=' + prev)
        // console.log('current=' + current)

        if (isNaN(prev) || isNaN(current) && this.operation !== '√' && this.operation !== 'x²' && this.operation !== '±' && this.operation !== 'x³') return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case '*':
                computation = prev * current;
                break
            case '÷':
                computation = prev / current;
                break
            case '√':
                computation = Math.sqrt(Math.abs(prev));
                break
            case 'x³':
                computation = Math.pow(prev, 3)
                break
            case 'x²':
                computation = Math.pow(prev, 2)
                break
            default:
                return;
        }
        this.readyToReset = true;
        this.currentOperand = Math.round(computation * 10000) / 10000
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        console.log("number=" + number)
        const stringNumber = number.toString().split('.')
        const integerDigits = parseInt(stringNumber[0])
        const decimalDigits = stringNumber[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        console.log("decimal=" + decimalDigits)
        console.log("integerDisplay=" + integerDisplay)
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.current.innerHTML = this.getDisplayNumber(this.currentOperand)
        if (this.operation === 'x²') {
            this.previous.innerText = `sqr(${this.getDisplayNumber(this.previousOperand)})`
            this.compute()
            this.current.innerText = this.currentOperand
        } else if (this.operation === 'x³') {
            this.previous.innerText = `sqr3(${this.getDisplayNumber(this.previousOperand)})`
            this.compute()
            this.current.innerText = this.currentOperand
        } else if (this.operation === '√') {
            let number = this.previousOperand.toString().split('')
            this.previous.innerText = `√(${this.getDisplayNumber(this.previousOperand)})`
            this.compute()
            if (number[0] === '-') {
                this.current.innerText = 'invalid value'
            } else {
                this.current.innerText = this.currentOperand
            }
        } else if (this.operation != null) {
            this.previous.innerText = `${this.getDisplayNumber(this.previousOperand)}${this.operation}`
        } else {
            this.previous.innerText = ''
        }
    }

    negativeNumber() {
        this.currentOperand = -this.currentOperand
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]')
const previous = document.querySelector('.previous-operand')
const current = document.querySelector('.current-operand')
const acButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const plusMinusButton = document.querySelector('[data-plus-minus]')

const calculator = new Calculator(previous, current)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

acButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})

equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

plusMinusButton.addEventListener("click", button => {
    calculator.negativeNumber();
    calculator.updateDisplay();
})

console.log(calculator);