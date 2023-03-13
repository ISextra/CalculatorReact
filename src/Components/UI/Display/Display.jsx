import React from 'react';
import classes from "./Display.module.sass";

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const {
            secondArg,
            result,
            isNeedShowResult,
            displayFontSize
        } = this.props

        return (
            <div
                className={classes.myDsp}
                style={{ fontSize: displayFontSize}}
            >
                {isNeedShowResult ? result : secondArg}
            </div>
        );
    }
}

export default Display;