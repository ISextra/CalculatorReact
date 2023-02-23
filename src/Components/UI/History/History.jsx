import React from 'react';
import classes from "./History.module.sass";
import MyHistoryMoveButton from "./Button/MyHistoryMoveButton";

const History = ({children, ...props}) => {
    return (
        <div {...props} className={classes.myHst}>
            <MyHistoryMoveButton>
                {String.fromCharCode(60)}
            </MyHistoryMoveButton>
            <div className={classes.myHstRst}>{children}</div>
            <MyHistoryMoveButton>
                {String.fromCharCode(62)}
            </MyHistoryMoveButton>
        </div>
    );
};

export default History;