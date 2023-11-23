//import { makeStyles, styled } from '@mui/material/styles';
import { Button, TextField, Grid, Paper } from '@mui/material';
import React, { useState } from "react";
import './App.css';

// Calculator Button Prop
function CalculatorButton(props) {

  // Get label and onClick props
  const { label, onClick } = props;
  
  return (
    // Render button element w/provided label + invoke onClick function
    <button onClick={() => onClick(label)}>{label}</button>
  );
}

function App() {

  // Define our state hooks
  const [display, setDisplay] = useState('0'); // display
  const [valFirst, setValFirst] = useState(''); // first value
  const [operator, setOperator] = useState(''); // operator
  const [valSecond, setValSecond] = useState(''); // second value
  const [priorKey, setPriorKey] = useState(''); // prior key
  const [depression, setDepression] = useState(''); // key depression
  const [priorOperator, setPriorOperator] = useState(''); // prior operator
  const [priorValue, setPriorValue] = useState(''); // prior value


  const handleButtonClick = (value) => {
    
    //  If the user enters a number from 0 to 9...
    if (/[0-9]/.test(value)) {

      // And the operater is already set/clicked on
      if (operator) {

        // We will want to update the second value + remove leading zeros
        setValSecond((valSecond + value).replace(/^0+/, ''));
        setDisplay((valSecond + value).replace(/^0+/, ''));
      } 
      
      // Otherwise if the user hasn't clicked on the operator
      else {

        // We will want to update the first value + remove leading zeros
        setValFirst((valFirst + value).replace(/^0+/, ''));
        setDisplay((valFirst + value).replace(/^0+/, ''));
      }

      // Record our prior key and key depression
      setPriorKey('');
      setDepression('');
    } 

    // Otherwise if the user enters a decimal key...
    else if (value === '.') {

      // If the display doesn't already have a decimal key...
      if (!display.includes('.')) {

        // We will allow the display to show one
        setDisplay(display + '.');

        // If the user hasn't entered an operator key or no operator is set
        if (!operator) {

          // We will update first value as a decimal
          setValFirst(valFirst + '.');
        } 
        
        // Otherwise if the user has entered an operator key or an operator is set
        else {

          // We will update our second value as a decimal
          setValSecond(valSecond + '.');
        }
      }

      // Record our prior key as blank
      setPriorKey('');
    }
    
    // Otherwise if the user enters an operator key...
    else if (['+', '-', '*', '/'].includes(value)) {

      // We will set our operator key as the specified value (aka Handle our operator)
      setOperator(value);

      // If our prior key was a calculate/= key...
      if (priorKey === 'calculate') {

        // We will not depress the operator key
        setDepression(null);
      } 

      // Otherwise
      else {

        // We will depress the operator key corresponding to the one the user pressed
        setDepression(value);
      }

      // Show result of previous operation before next one
      // If the prior key wasn't an operator and a calculation key, and the user entered a new first number and operator
      if (valFirst && operator && priorKey !== 'operator' && priorKey !== 'calculate') {

        // We will calculate the result of the user entries
        const result = calculate(valFirst, operator, valSecond);

        // Display the result
        setDisplay(result);

        // Override the first value as the result
        setValFirst(result);

        // Clear our second value 
        setValSecond('');

        // Set our operator key as the specified value
        setOperator(value);

        // Record our prior key as an operator key
        setPriorKey('operator');
      }
  
      // Clear our second value
      setValSecond('');

      // Record our prior key as an operator key
      setPriorKey('operator');
      
    } 

    // Otherwise if the user enters equals...
    else if (value === '=') {

      // Record our Key Depression as blank
      setDepression('');

      // If they already impelmented a first value, operator, and second value...
      if (valFirst && operator && valSecond) {

        // If the prior key was equals...
        if (priorKey === 'calculate') {

          // We will calculate our new result and override our result
          const result = calculate(valFirst, priorOperator, priorValue);

          // We will override our first value with the new result
          setValFirst(result);

          // And override our display with the new result
          setDisplay(result);
        }

        // Otherwise if the user just enters as normal...
        else if (valFirst && operator && valSecond) {
          if (valFirst && operator && valSecond) {

            // We will calculate with the user inputs
            const result = calculate(valFirst, operator, valSecond);

            // Override our display with the result
            setDisplay(result);

            // Override our first value with our result
            setValFirst(result);

            // Record our operator
            setPriorOperator(operator);

            // And record our second value
            setPriorValue(valSecond);
          }
        }

        // Record our prior key
        setPriorKey('calculate');
      }
    } 

    // Otherwise if the user enters clear...
    else if (value === 'C') {
      // We will replace the display with zero
      setDisplay('0');

      // And clear the first value, operator, second value, prior key, and key depression
      setValFirst('');
      setOperator('');
      setValSecond('');
      setPriorKey('');
      setDepression('');
    } 


  };
    
  // Calculation Function
  const calculate = (valFirst, operator, valSecond) => {

    // First we will convert the strings to numbers...
    const val1 = parseFloat(valFirst);
    const val2 = parseFloat(valSecond);
    
    let result;
  
    // Then perform the operation based on the user entry/recorded operator...
    if (operator === '+') {
      result =  (val1 + val2).toString();
    } 
    
    else if (operator === '-') {
      result =  (val1 - val2).toString();
    } 
    
    else if (operator === '*') {
      result =  (val1 * val2).toString();
    } 
    
    else if (operator === '/') {
      result =  (val1 / val2).toString();
    } 
    
    else {
      result = '0';
    }

    // Return the result of the calculation
    return result;

  };

  
  return (

    // calculator grid container
    <Grid container className = "calculator">

      {/* Display to cover calculator */}
      <Grid  xs={12}>
        <TextField className = "display" value={display} />
      </Grid>

      {/* First row */}
      <Grid xs={2.5}>
        <Button className = "num" variant="outlined" onClick={() => handleButtonClick('7')}>7</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className = "num" variant="outlined" onClick={() => handleButtonClick('8')}>8</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className = "num" variant="outlined" onClick={() => handleButtonClick('9')}>9</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className={`operator ${depression === '-' ? 'active' : ''}`} variant="outlined" onClick={() => handleButtonClick('-')}>-</Button>
      </Grid>

      {/* Second row */}
      <Grid xs={2.5}>
        <Button className = "num" variant="outlined" onClick={() => handleButtonClick('4')}>4</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className = "num" variant="outlined" onClick={() => handleButtonClick('5')}>5</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className = "num" variant="outlined" onClick={() => handleButtonClick('6')}>6</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className={`operator ${depression === '+' ? 'active' : ''}`} variant="outlined" onClick={() => handleButtonClick('+')}>+</Button>
      </Grid>

      {/* Third row */}
      <Grid xs={2.5}>
        <Button className = "num" variant="outlined" onClick={() => handleButtonClick('1')}>1</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className = "num" variant="outlined" onClick={() => handleButtonClick('2')}>2</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className = "num" variant="outlined" onClick={() => handleButtonClick('3')}>3</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className={`operator ${depression === '/' ? 'active' : ''}`} variant="outlined" onClick={() => handleButtonClick('/')}>÷</Button>
      </Grid>

      {/* Fourth Row */}
      <Grid xs={2.5}>
        <Button className = "num" variant="outlined" onClick={() => handleButtonClick('0')}>0</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className = "num" variant="outlined" onClick={() => handleButtonClick('.')}>.</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className = "equal" variant="outlined" onClick={() => handleButtonClick('=')}>=</Button>
      </Grid>
      <Grid xs={2.5}>
        <Button className={`operator ${depression === '*' ? 'active' : ''}`} variant="outlined" onClick={() => handleButtonClick('*')}>×</Button>
      </Grid>


      {/* Final row/Clear Button */}
      <Grid xs={12}>
        <Button className="clear" variant="outlined" onClick={() => handleButtonClick('C')}>C</Button>
      </Grid>

    </Grid>
  );
}

export default App;