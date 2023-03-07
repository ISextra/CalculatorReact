import React from 'react';
import classes from "./History.module.sass";
import MyHistoryMoveButton from "./Button/MyHistoryMoveButton";

class History extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    getCorrectResult(firstArg, secondArg, currentOperation) {
        let result = "";

        if (firstArg !== null) {
            result = `${firstArg}`;
        }

        if (secondArg !== null) {
            result = `${result} ${secondArg}`;
        }

        if (currentOperation !== null) {
            result = `${result} ${currentOperation}`;
        }

        return result;
    }

    render() {
        const {
            firstarg,
            secondarg,
            currentoperation,
        } = this.props;
        return (
            <div
                {...this.props}
                className={classes.myHst}
            >
                <MyHistoryMoveButton>
                    {String.fromCharCode(60)}
                </MyHistoryMoveButton>
                <div
                    className={classes.myHstRst}
                >
                    {this.getCorrectResult(firstarg, secondarg, currentoperation)}
                </div>
                <MyHistoryMoveButton>
                    {String.fromCharCode(62)}
                </MyHistoryMoveButton>
            </div>
        );
    }
}

export default History;