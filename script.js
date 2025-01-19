const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".op");
const disp = document.querySelector(".display");
let currInput = "";
let previous = "";
let operator = "";

const MAX_DISPLAY_LENGTH = 12; 
const MAX_DECIMALS = 8;

function display(value) {

    if (value.length > MAX_DISPLAY_LENGTH) {
        value = value.slice(0, MAX_DISPLAY_LENGTH);
    }
    disp.textContent = value || "0";
}

function calculate() {
    const num1 = parseFloat(previous);
    const num2 = parseFloat(currInput);

    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "x":
            return num1 * num2;
        case "/":
            return num1 / num2;
        case "%":
            if(!currInput){
                return num1/100
            }
            return (num1/num2)*100
        default:
            return num2;
    }
}

numbers.forEach((element) => {
    element.addEventListener("click", () => {
        currInput += element.textContent;
        display(`${previous} ${operator} ${currInput}`.trim());
    });
});

operators.forEach((element) => {
    element.addEventListener("click", () => {
        const operation = element.title;
        if (operation === "equal") {
            if (previous && operator && currInput) {
                let result = calculate();
                result = result.toFixed(MAX_DECIMALS);
                display(result);
                previous = result.toString();
                currInput = "";
                operator = "";
            }
        } else if (operation === "clear") {
            previous = "";
            currInput = "";
            operator = "";
            display("");
        } else if (operation === "back_space") {
            if (currInput) {
                currInput = currInput.slice(0, -1);
            } else if (operator) {
                operator = "";
            } else if (previous) {
                previous = previous.slice(0, -1);
            }
            display(`${previous} ${operator} ${currInput}`.trim());
        } else {
            if (currInput) {
                if (previous && operator) {
                    let result = calculate();
                    result = result.toFixed(MAX_DECIMALS);
                    previous = result.toString();
                } else {
                    previous = currInput;
                }
                currInput = "";
                operator = element.textContent;
                display(`${previous} ${operator}`);
            } else if (previous) {
                operator = element.textContent;
                display(`${previous} ${operator}`);
            }
        }
    });
});
