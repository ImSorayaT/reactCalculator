import React from "react";
import { evaluate } from 'mathjs';
import { Calculator } from "./Calculator";

export class CalculatorDisplay extends React.Component{

    constructor(props){
        super(props);

        this.changeCalculate = this.changeCalculate.bind(this);
        this.sumCalculate = this.sumCalculate.bind(this);
        this.clearCalculate = this.clearCalculate.bind(this);
        this.changeCharge = this.changeCharge.bind(this);

    }

    changeCalculate(e){
        this.props.changeCalculate(e);
    }

    sumCalculate(e){
        this.props.sumCalculate(e);
    }

    clearCalculate(e){
        this.props.clearCalculate(e);
    }

    changeCharge(e){
        this.props.changeCharge(e);
    }

    
    render(){
        const display = this.props.display;
        return(  
            <div className={'ui grid calculator'}>
                <div className={ 'row results-row '}>
                    <span>{ display }</span>
                </div>
                <div className={ 'row'}>
                    <div className={"twelve wide column"}>
                        <div className={'ui grid'}>
                            <div className={'three column row'}>
                                <div className={'column'}>
                                    <button onClick={this.clearCalculate} className={'ui button fluid'}>C</button>
                                </div>

                                <div className={'column'}>
                                    <button onClick={this.changeCharge} className={'ui button fluid'}>+/-</button>
                                </div>

                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='%' className={'ui button fluid'}>%</button>
                                </div>
                            
                            </div>
                            <div className={'three column row'}>
                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='1' className={'ui button fluid'}>1</button>
                                </div>
                                
                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='2' className={'ui button fluid'}>2</button>
                                </div>
                                
                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='3' className={'ui button fluid'}>3</button>
                                </div>
                            </div>

                            <div className={'three column row'}>
                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='4' className={'ui button fluid'}>4</button>
                                </div>

                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='5' className={'ui button fluid'}>5</button>
                                </div>

                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='6' className={'ui button fluid'}>6</button>
                                </div>
                            </div>
                            <div className={'three column row'}>
                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='7' className={'ui button fluid'}>7</button>
                                </div>
                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='8' className={'ui button fluid'}>8</button>
                                </div>
                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='9' className={'ui button fluid'}>9</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"four wide column"}>
                        <div className={'ui grid'}>
                            <div className={'row'}>
                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='+' className={'ui button fluid teal'}>+</button>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='-' className={'ui button fluid teal'}>-</button>
                                </div>
                            </div>
                            <div className={'row'}>
                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='*' display='x' className={'ui button fluid teal'}>x</button>
                                    </div>
                            </div>
                            <div className={'row'}>
                                <div className={'column'}>
                                    <button onClick={this.changeCalculate} value='/' className={'ui button fluid teal'}>/</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={ 'row'}>
                    <div className={'four wide column'}>
                        <button onClick={this.changeCalculate} value='0' className={'ui button fluid'}>0</button>
                    </div>
                    <div className={'four wide column'}>
                        <button onClick={this.changeCalculate} value='.' className={'ui button fluid'}>.</button>
                    </div>
                    <div className={'eight wide column'}>
                        <button className={'ui button fluid grey'} onClick={this.sumCalculate} >=</button>
                    </div>
                    
                </div>
            </div>
            
        );
    }
}