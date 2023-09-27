const previousScreenValue = document.querySelector("[data-previous-value]");
const currentScreenValue = document.querySelector("[data-current-value]");
const clearBtn = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const equalsBtn = document.querySelector("[data-equals]");
const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");

class Calculator {
    constructor(previousScreenValue, currentScreenValue) {
        this.previousScreenValue = previousScreenValue;
        this.currentScreenValue = currentScreenValue;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            
            case "-":
                computation = prev - current;
                break;
        
            case "*":
                computation = prev * current;
                break;
            
            case "/":
                if (current === 0) {
                    this.currentOperand = "ERROR!";
                    this.previousOperand = "";
                    this.operation = undefined;
                    return;
                }
                computation = prev / current;
                break;
            
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    chooseOperation(operation) {
        if(this.currentOperand === "") return
        if(this.previousOperand !== ""){
             this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    updateDisplay() {
        this.currentScreenValue.innerText = this.currentOperand;
        if (this.operation !== undefined) {
            this.previousScreenValue.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousScreenValue.innerText = this.previousOperand;
        }
    
    }
}


const calculator = new Calculator(previousScreenValue, currentScreenValue);

numberBtns.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});

operationBtns.forEach(button => {
    button.addEventListener("click",() => {
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    });
});

deleteBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});

clearBtn.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

equalsBtn.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});