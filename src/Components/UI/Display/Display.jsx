import React from 'react';
import classes from "./Display.module.sass";

const Display = ({children, ...props}) => {
    return (
        <div {...props} className={classes.myDsp}>
            {children}
        </div>
    );
};

export default Display;