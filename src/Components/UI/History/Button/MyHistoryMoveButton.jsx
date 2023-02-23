import React from 'react';
import classes from "./MyHistoryMoveButton.module.css";

const MyHistoryMoveButton = ({children,...props}) => {
    return (
        <button {...props} className={classes.myHstMoveBtn}>
            {children}
        </button>
    );
};

export default MyHistoryMoveButton;