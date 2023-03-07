import React from 'react';
import classes from "./WidgetButton.module.sass";

class WidgetButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            children,
            onClick,
            visibility,
            opacity,
            left,
            transform
        } = this.props

        return (
            <div
                onClick={onClick}
                className={classes.myWdgBtn}
                style={{
                    visibility: visibility,
                    opacity: opacity,
                    left: left,
                    transform: transform,
                }}
            >
                {children}
            </div>
        );
    }
}

export default WidgetButton;