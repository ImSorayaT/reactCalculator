import React from "react";
import { evaluate } from 'mathjs';
import { CalculatorDisplay } from "./CalculatorDisplay";

export class Calculator extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            calculate : '0',
            display: '0',
            equals: false
        };

        this.changeCalculate = this.changeCalculate.bind(this);
        this.sumCalculate = this.sumCalculate.bind(this);
        this.clearCalculate = this.clearCalculate.bind(this);
        this.changeCharge = this.changeCharge.bind(this);

    }


    //**
    // Changes the equation value. 
    // First, it starts a new equation after '='
        // If not
            // is the new input Not a Number
                // if it's a '%'
                // if it's a '.'
                // if it's a '+', '-' '*' or '/'
            // If it is a number
        //
    // eg. '+' by '-', so it's not '+-' 
    // or the first '0' by '5', so it's not '05' but just '5'
    //**
    changeCalculate(e){
    
        this.setState((prevState) => {
            const newDisplayValue = this.getDisplayValue(e);
            const newCalcValue = e.target.value;

            const calcLength = prevState.calculate.length; // calculate state count
            const lastCalcChar = prevState.calculate.slice(-1); // last letter of the calc state
    
            const descLength = prevState.display.length; // display state count

            // if equals was not the last button clicked
            if(this.state.equals == false){
                
                if(isNaN(newCalcValue)){ // if the newest input is not a number

                    if(newCalcValue == '%'){ // if the newest input is '%'
                        
                        if(!isNaN(lastCalcChar)){
                            return this.addToCalc(prevState,newCalcValue, newDisplayValue)
                        }
                    
                    }else if(newCalcValue == '.'){  // if the newest input is '.'

                        // if there isn't already a '.'
                        if(prevState.calculate.indexOf('.') == -1){
                            
                            // if the last character is a number
                            if(!isNaN(lastCalcChar)){

                                // add to previous
                                return this.addToCalc(prevState,newCalcValue, newDisplayValue)


                            // otherwise, unless a character is also a '.'
                            }else if(lastCalcChar != '.'){

                                // add '.' with a '0' in front of it
                                return this.addToCalc(prevState, '0' + newCalcValue, '0' + newDisplayValue)

                            }
                        }
                    
                    }else{ // if the newest input is '+', '-', '*' or '/'
                        //if last input was not a number or '%'
                        if(isNaN(lastCalcChar) && lastCalcChar != '%'){
                            if(lastCalcChar !== '.' ){
                                return ({ 
                                    calculate: prevState.calculate.slice(0, calcLength -1) + newCalcValue,
                                    display: prevState.display.slice(0, descLength -1) + newDisplayValue,
                                });
                            }
                        }else{
                            return this.addToCalc(prevState,newCalcValue, newDisplayValue)
                        }
                    }

                // if it's a number
                }else{
                    // if it's the first input and the number is bigger than zero
                    if(calcLength == 1 && prevState.calculate == '0' && parseFloat(e.target.value) > 0 ){

                        // replace the previous input
                        return ({ 
                            calculate: prevState.calculate.slice(0, calcLength -1) + newCalcValue,
                            display: prevState.display.slice(0, descLength -1) + newDisplayValue,
                        });
                    }else{
                        //
                        if(lastCalcChar != '%'){
                            return this.addToCalc(prevState,newCalcValue, newDisplayValue)
                        }

                    }

                }
            
            // if it's first chara after '='
            }else{            
                // if new value is not a number
                if(isNaN(newCalcValue)){
                    // add to previous values
                    return this.addToCalc(prevState,newCalcValue, newDisplayValue)
                }else{

                    // replace the previous value entirely
                    return ({ 
                        calculate: newCalcValue,
                        display: newDisplayValue
                    });
                }
            }

        });

        this.clearEquals();
    }

    // Switches the last number between positive and negative
    changeCharge(e){
        this.setState((prevState) => {     
            // The whole calculation length   
            const calcLength = prevState.calculate.length; // calculate state count

            // Last Item
            console.log(prevState.calculate);
            if(prevState.calculate == 'Infinity' || prevState.calculate == '-Infinity'){
                
                if(prevState.calculate == 'Infinity'){
                    return ({
                        calculate: '-Infinity',
                        display: '-Infinity'
                    });
                }else{
                    return ({
                        calculate: 'Infinity',
                        display: 'Infinity'
                    });
                }

            }else{
                const calcSplit = prevState.calculate.match(/(?:\d+\.)?\d+/g); // split by numbers
                const lastItem = calcSplit[calcSplit.length - 1]; // get the last number
                const lastItemLength = lastItem.length; // char count of the last number

                // Before items
                const beforeLast = prevState.calculate.charAt( calcLength - lastItem.length - 1);
                const beforeBeforeLast = prevState.calculate.charAt( calcLength - lastItem.length - 2);


                console.log(lastItem);

                // if there's only one number
                if( calcSplit.length == 1 ){
                    
                    // if there's a '-' in front of that number
                    if(prevState.calculate.charAt( 0) == '-'){

                        // remove the first character
                        return ({
                            calculate: prevState.calculate.substr(1),
                            display: prevState.display.substr(1)
                        });

                        // if there isn't a '-' in front of that number
                    }else if(prevState.calculate != '0'){

                        // add '-' in front of the first number
                        return ({
                            calculate: '-' + prevState.calculate,
                            display: '-' + prevState.display
                        });
                    }
                    
                    // if there's more than one number
                }else{
                    const newLastNumber = '-' + lastItem; // add '-' in front of the last number

                    //**
                    // this is to double-check if the two symbols in front of the last number are not eg. 2 - -2
                    // if they are the second '-' needs to be removed to make the second 2 a positive number
                    //**

                    // if the char before the last number and the character before it are not numbers
                    // and if the character before the character in front of the number isn't a '%'
                    if(lastItem == '0'){

                        return ({
                            calculate: prevState.calculate,
                            display: prevState.display
                        });

                    }else if( isNaN(beforeLast) && isNaN(beforeBeforeLast) && beforeBeforeLast != '%' ){
                        
                        // remove the first character before the last number
                        return ({
                            calculate: prevState.calculate.slice(0, calcLength - lastItemLength - 1) + lastItem,
                            display: prevState.display.slice(0, calcLength - lastItemLength - 1) + lastItem
                        });
                    }else{
                        // replace the last number with the newLastNumber (with the '-')
                        return ({
                            calculate: prevState.calculate.toString().slice(0, calcLength - lastItemLength) + newLastNumber,
                            display: prevState.display.toString().slice(0, calcLength - lastItemLength) + newLastNumber
                        });
                    }

                }
            }
        });
    }

    // The clear button
    clearCalculate(e){
        this.setState(() => ({ 
            display: '0',
            calculate: '0',
        }));

        this.clearEquals();
    }

    // The equals button
    sumCalculate(e){
        let result = '';
        result = evaluate(this.state.calculate);

        if(result != null){
            this.setState(() => ({ 
                display: result.toString(),
                calculate: result.toString(),
                equals: true
            }));
        }

    }

    // clears the state checking if the last input was '='
    clearEquals(){
        this.setState(() => ({ 
            equals: false
        }));
    }

    // checks if the button has a display attribute
    // if not, the calculator will display the value attribute
    // that helps us display '*' as 'x'
    getDisplayValue(e) {

        let displayValue = '';

        if(e.target.getAttribute('display') !== null){
            displayValue = e.target.getAttribute('display');
        }else{
            displayValue = e.target.value;
        }

        return displayValue;

    }

    addToCalc(prevState, newCalc, newDesc){
        return ({ 
            calculate: prevState.calculate + newCalc,
            display: prevState.display + newDesc,
        });
    }


    render(){
        return(  
           <CalculatorDisplay 
            changeCalculate={this.changeCalculate}  
            sumCalculate={this.sumCalculate} 
            clearCalculate={this.clearCalculate} 
            changeCharge={this.changeCharge}
            display={this.state.display} 
            />
        );
    }
}