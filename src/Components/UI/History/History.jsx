import React from 'react';
import classes from "./History.module.sass";
import MyHistoryMoveButton from "./Button/MyHistoryMoveButton";

class History extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.firstArg = this.props.firstarg;
        this.currentOperation = this.props.currentoperation;
        this.secondArg = this.props.secondarg;


        this.children = props.children;
        this.props = props;
    }

    render() {
        return (
            <div {...this.props} className={classes.myHst}>
                <MyHistoryMoveButton>
                    {String.fromCharCode(60)}
                </MyHistoryMoveButton>
                <div className={classes.myHstRst}
                >
                    {this.children}
                </div>
                <MyHistoryMoveButton>
                    {String.fromCharCode(62)}
                </MyHistoryMoveButton>
            </div>
        );
    }
}

export default History;