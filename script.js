document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // DISPLAY
    // =========================

    const expressionDisplay =
        document.getElementById("expressionDisplay");

    const resultDisplay =
        document.getElementById("resultDisplay");


    // =========================
    // BUTTONS
    // =========================

    const clearButton =
        document.getElementById("clear");

    const signButton =
        document.getElementById("sign");

    const percentageButton =
        document.getElementById("percentage");

    const equalsButton =
        document.getElementById("equals");


    // =========================
    // VARIABLES
    // =========================

    let currentInput = "";

    let firstNumber = null;

    let operator = null;

    let expression = "";

    let calculationFinished = false;


    // =========================
    // SHOW NORMAL INPUT
    // =========================

    function showInput() {

        expressionDisplay.textContent = "";

        if (expression === "") {

            resultDisplay.textContent =
                currentInput || "0";

        } else {

            resultDisplay.textContent =
                expression + currentInput;

        }
    }


    // =========================
    // SHOW FINAL RESULT
    // =========================

    function showResult(answer, fullExpression) {

        expressionDisplay.textContent =
            fullExpression;

        resultDisplay.textContent =
            answer;
    }


    // =========================
    // SHOW AC
    // =========================

    function showAC() {

        clearButton.innerHTML = "AC";
    }


    // =========================
    // SHOW BACKSPACE
    // =========================

    function showBackspace() {

        clearButton.innerHTML =
            '<i class="fa-solid fa-delete-left"></i>';
    }


    // =========================
    // NUMBER & DECIMAL BUTTONS
    // =========================

    const numberButtons =
        document.querySelectorAll("[data-value]");


    numberButtons.forEach(button => {

        button.addEventListener("click", () => {

            const value =
                button.getAttribute("data-value");


            // Ignore operators
            if (
                value === "+" ||
                value === "-" ||
                value === "*" ||
                value === "/"
            ) {
                return;
            }


            // If a calculation has finished
            // and a new number is pressed,
            // start a new calculation.
            if (calculationFinished) {

                currentInput = "";

                expression = "";

                calculationFinished = false;
            }


            // NUMBER
            if (!isNaN(value)) {

                currentInput += value;

                showInput();

                showBackspace();

                return;
            }


            // DECIMAL
            if (value === ".") {

                if (!currentInput.includes(".")) {

                    if (currentInput === "") {

                        currentInput = "0.";

                    } else {

                        currentInput += ".";
                    }

                    showInput();

                    showBackspace();
                }
            }

        });

    });


    // =========================
    // OPERATOR BUTTONS
    // =========================

    const operatorButtons =
        document.querySelectorAll(".operator[data-value]");


    operatorButtons.forEach(button => {

        button.addEventListener("click", () => {

            const value =
                button.getAttribute("data-value");


            // Don't allow operator
            // without a number
            if (currentInput === "") {
                return;
            }


            // Save first number
            firstNumber =
                parseFloat(currentInput);


            // Save operator
            operator = value;


            // Change symbols
            let symbol = value;

            if (value === "*") {
                symbol = "×";
            }

            if (value === "/") {
                symbol = "÷";
            }


            // Save expression
            expression =
                currentInput + symbol;


            // Clear second number
            currentInput = "";


            // Show:
            // 7×
            showInput();

            showBackspace();

        });

    });


    // =========================
    // EQUALS
    // =========================

    equalsButton.addEventListener("click", () => {

        if (
            firstNumber === null ||
            operator === null ||
            currentInput === ""
        ) {
            return;
        }


        const secondNumber =
            parseFloat(currentInput);


        let answer;


        // Addition
        if (operator === "+") {

            answer =
                firstNumber + secondNumber;
        }


        // Subtraction
        else if (operator === "-") {

            answer =
                firstNumber - secondNumber;
        }


        // Multiplication
        else if (operator === "*") {

            answer =
                firstNumber * secondNumber;
        }


        // Division
        else if (operator === "/") {

            if (secondNumber === 0) {

                expressionDisplay.textContent =
                    firstNumber + "÷" + secondNumber;

                resultDisplay.textContent =
                    "Error";

                return;
            }

            answer =
                firstNumber / secondNumber;
        }


        // Display symbol
        let symbol = operator;

        if (operator === "*") {
            symbol = "×";
        }

        if (operator === "/") {
            symbol = "÷";
        }


        // Complete expression
        const fullExpression =
            firstNumber +
            symbol +
            secondNumber;


        // Show input above
        // and result underneath
        showResult(
            answer,
            fullExpression
        );


        // Save answer
        currentInput =
            answer.toString();


        // Reset calculation
        firstNumber = null;

        operator = null;

        expression = "";

        calculationFinished = true;


        // Return to AC
        showAC();

    });


    // =========================
    // AC / BACKSPACE
    // =========================

    clearButton.addEventListener("click", () => {


        // After calculation:
        // AC completely resets calculator
        if (calculationFinished) {

            currentInput = "";

            firstNumber = null;

            operator = null;

            expression = "";

            calculationFinished = false;


            expressionDisplay.textContent = "";

            resultDisplay.textContent = "0";


            showAC();

            return;
        }


        // BACKSPACE while typing
        if (currentInput !== "") {

            currentInput =
                currentInput.slice(0, -1);


            if (currentInput === "") {

                if (expression !== "") {

                    resultDisplay.textContent =
                        expression;

                } else {

                    resultDisplay.textContent =
                        "0";
                }

                showAC();

            } else {

                showInput();

            }

            return;
        }


        // Complete reset
        currentInput = "";

        firstNumber = null;

        operator = null;

        expression = "";

        calculationFinished = false;


        expressionDisplay.textContent = "";

        resultDisplay.textContent = "0";


        showAC();

    });


    // =========================
    // + / -
    // =========================

    signButton.addEventListener("click", () => {

        if (currentInput === "") {
            return;
        }


        currentInput =
            (parseFloat(currentInput) * -1).toString();


        showInput();

    });


    // =========================
    // PERCENTAGE
    // =========================

    percentageButton.addEventListener("click", () => {

        if (currentInput === "") {
            return;
        }


        currentInput =
            (parseFloat(currentInput) / 100).toString();


        showInput();

    });


    // =========================
    // INITIAL STATE
    // =========================

    showAC();

    resultDisplay.textContent = "0";

});