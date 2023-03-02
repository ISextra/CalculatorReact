import React from 'react';
import classes from "./Button.module.sass";

class Button extends React.Component {
    constructor({type, onClick, children, props}) {
        super(props);

        this.type = type;
        this.onClick = onClick;
        this.children = children;
    }

    myButtonBackground() {
        switch (this.type) {
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
        return  (
            <button
                {...this.props}
                className={classes.myBtn}
                onClick={this.onClick}
                style={{
                    background: this.myButtonBackground(),
                }}
            >
                {this.children}
            </button>
           );
    }
}

export default Button;