import React from 'react';
import classes from "./Calculator.module.sass";
import {ELEMENTS} from "../Constants/Constants";
import Button from "./UI/Button/Button";
import Display from "./UI/Display/Display";
import History from "./UI/History/History";

const Calculator = () => {
    return (
        <div  className={classes.calc}>
            <History/>
            <Display>0</Display>
            {ELEMENTS.map((button, index) =>
                <Button key={index} type={button.type}>
                    {button.content}
                </Button>
            )}
        </div>
    );
};

export default Calculator;