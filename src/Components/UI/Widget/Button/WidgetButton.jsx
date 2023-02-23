import React from 'react';
import classes from "./WidgetButton.module.sass";

const WidgetButton = ({onClick}) => {
    return (
        <div onClick={onClick} className={classes.myWdgBtn}>
            Hide
        </div>
    );
};

export default WidgetButton;