import React from 'react';
import classes from "./Display.module.sass";
import Calculator from "../../Calculator";

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
        } = this.props

        return (
            <div {...this.props} className={classes.myDsp}>
                {isNeedShowResult ? result : secondArg}
            </div>
        );
    }
}

export default Display;