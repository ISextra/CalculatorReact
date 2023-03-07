import React from 'react';
import classes from "./Button.module.sass";

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    myButtonBackground(type) {
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

    render() {
        const {
            type,
            onClick,
            children,
        } = this.props

        return  (
            <button
                {...this.props}
                className={classes.myBtn}
                onClick={onClick}
                style={{
                    background: this.myButtonBackground(type),
                }}
            >
                {children}
            </button>
           );
    }
}

export default Button;