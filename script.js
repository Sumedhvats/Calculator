const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".op");
const disp = document.querySelector(".display");
let currInput = "";
let previous = "";
let operator = "";

function display(value) {
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
            return num1 % num2;
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
                const result = calculate();
                display(result);
                previous = result.toString();
                currInput = "";
                operator = "";
            }
        } else if (operation === "clear") {
            previous = "";
            currInput = "";
            operator = "";
            display();
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
                    const result = calculate();
                    previous = result.toString();
                } else {
                    previous = currInput;
                }
                currInput = "";
                operator = element.textContent;
                display(`${previous} `);
            }
        }
    });
});
