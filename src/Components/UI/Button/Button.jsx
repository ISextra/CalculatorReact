import React from 'react';
import classes from "./Button.module.sass";

const Button = ({type, children, ...props}) => {

    const myButtonBackground = () => {
        switch (type) {
            case "complexOperation":
            case "basicOperation":
            case "cleanupOperation": {
                return "#2c2c2c";
            }
            case "number": {
                return "#000000";
            }
            case "equal": {
                return "#eb801d";
            }
            default: {
                break
            }
        }
    }
    return (
        <button {...props} className={classes.myBtn} style={{
            background: myButtonBackground(),
        }}>
            {children}
        </button>
    );
};

export default Button;