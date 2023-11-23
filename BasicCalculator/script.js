document.addEventListener('DOMContentLoaded', function () {

    // Select the calculator container, display container, and keys container
    const calculator = document.querySelector('.calculator');
    const display = document.querySelector('.display');
    const keys = calculator.querySelector('.keys');

    // Calculate Function
    function calculate(value_1, operator, value_2) {

        // The result is initally blank/unkown
        let result = '';

        // If our operator is add
        if (operator === 'add') {

            // The result will be the float addition of value 1 and value 2
            result = parseFloat(value_1) + parseFloat(value_2);
        } 

        // Otherwise if the operator is subtract
        else if (operator === 'subtract') {

            // The result will be the float subtraction of value 1 and value 2
            result = parseFloat(value_1) - parseFloat(value_2);
        } 

        // Otherwise if the operator is multiply
        else if (operator === 'multiply') {

            // The result will be the float multiplication of value 1 and value 2
            result = parseFloat(value_1) * parseFloat(value_2);
        } 

        // Otherwise if the operator is divide
        else if (operator === 'divide') {

            // The result will be the float division of value 1 and value 2
            result = parseFloat(value_1) / parseFloat(value_2);
        }

        // The result is then rounded to the nearest 5th for more clarity 
        result = Math.round(result*100000)/100000;

        // Return the result
        return result;
    }

    // Initialize Calculator Dataset
    calculator.dataset.value_first = '';
    calculator.dataset.operator = '';
    calculator.dataset.value_second = '';
    calculator.dataset.prior_key = '';
    calculator.dataset.last_action = '';
    calculator.dataset.last_result = '';

    // Event listener
    keys.addEventListener('click', (e) => {

        // If the user clicks on a button...
        if (e.target.matches('button')) {

            // Reference clicked key
            const key = e.target;

            // Extract data action attribute in HTML
            const action = key.dataset.action;

            // Get text content of clicked key
            const content_key = key.textContent;

            // Retrieve/Display and Trim numbers on calculator display
            const number_display = display.textContent.trim();

            // Record prior key from user entry
            const prior_key = calculator.dataset.prior_key;

            // Remove the depression for arithmetic keys
            Array.from(key.parentNode.children).forEach((k) => k.classList.remove('is-depressed'));

            // Reset prior_key when a number or other key is pressed
            calculator.dataset.prior_key = ' ';

            // If the user presses a number...
            if (!action) {

                // If the display shows the number zero or the prior key is an operator key...
                if (number_display === '0' || prior_key === 'operator' || prior_key === 'calculate') {

                    // We'll replace the calculator's display with the user's number
                    display.textContent = content_key.replace(/\s+/g, '');

                } 

                // Otherwise...
                else {

                    // Append the number to the display with a space in between
                    display.textContent += content_key.replace(/\s+/g, '');
                }

                // We will record the prior key as a number key
                calculator.dataset.prior_key = 'number';

            }

            // If the key pressed is a decimal key...
            if (action === 'decimal') {

                // And if the number displayed doesn't already have a decimal
                if (!number_display.includes('.')) {

                    // Display the decimal
                    display.textContent += '.';
                } 
                // Otherwise if the prior key was an operator key or the equals key...
                else if (prior_key === 'operator' || prior_key === 'calculate') {

                    // We will display 0. if the user presses a decimal with a number unprompted
                    display.textContent = '0.';
                }

                // We will record the prior key as a decimal key
                calculator.dataset.prior_key = 'decimal';
            }

            // If the user presses any operators...
            if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {

                // We will record the first value, the operator, and the second value
                const value_first = calculator.dataset.value_first;
                const operator = calculator.dataset.operator;
                const value_second = calculator.dataset.value_second || number_display.replace(/\s+/g, '');

                // Accounting for updated sum in the display if the user does something like (5 + 6 + 7 + 8)
                // If there is a first value, an operator, and the prior key isn't an operator, and the prior key isn't an equals key...
                if (value_first && operator && prior_key !== 'operator' && prior_key !== 'calculate') {

                    // Calculate and display the result
                    const result = calculate(value_first, operator, value_second);
                    display.textContent = result;

                    // Update our new first value as our calculated value
                    calculator.dataset.value_first = result;
                } 

                // Otherwise...
                else {

                    // If there aren't any calculations, we will set the number displayed as our first number
                    calculator.dataset.value_first = number_display.replace(/\s+/g, '');
                }

                // We will make it depressed or "pushed down"
                key.classList.add('is-depressed');

                // We will record the operator key as a key in "action"
                calculator.dataset.operator = action;

                // We will record the prior key as an operator key
                calculator.dataset.prior_key = 'operator';
            }

            // If the user presses the equals key...
            if (action === 'calculate') {
                
                // Get our first value, operator, and second value 
                let value_first = calculator.dataset.value_first;
                const operator = calculator.dataset.operator;
                let value_second = number_display.replace(/\s+/g, '');
        
                // If the user enters our first value...
                if (value_first) {

                    // And the user's prior key was equals key..
                    if (prior_key === 'calculate') {

                        // Use the previous result as the new value_first
                        value_first = calculator.dataset.mod_value;
                        value_second = calculator.dataset.last_result;
                    }
                    

                    // Calculate and display the result
                    const result = calculate(value_first, operator, value_second);
                    display.textContent = result;
            
                    // Store our result as the modified value
                    calculator.dataset.mod_value = result;
                    calculator.dataset.value_second = '';
                    calculator.dataset.prior_key = 'calculate';
            
                    // Store the last action and result
                    calculator.dataset.last_action = operator;
                    calculator.dataset.last_result = value_second;
                }
            }
            
            // If the user presses the clear key...
            if (action === 'clear') {

                // We will clear the prior key, first value, second value, operator, and display. 
                calculator.dataset.prior_key = 'clear';
                calculator.dataset.value_first = '';
                calculator.dataset.operator = '';
                calculator.dataset.value_second = '';
                calculator.dataset.prior_key = '';
                display.textContent = '0';
            }

            if (action === 'recall') {

                // Recall the last action and result
                calculator.dataset.prior_key = 'number';
                display.textContent = calculator.dataset.last_result;
            }
        }
    });
});
