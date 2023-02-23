import React from 'react';
import classes from "./Widget.module.sass";
import WidgetButton from "./Button/WidgetButton";

const Widget = ({onClick}) => {
    const documentHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    const documentWidth = Math.max(
        document.body.scrollWidth, document.documentElement.scrollWidth,
        document.body.offsetWidth, document.documentElement.offsetWidth,
        document.body.clientWidth, document.documentElement.clientWidth
    );
    const widgetWidth = documentWidth / 4;
    const widgetHeight = documentHeight;
    const widgetLeft = documentWidth - widgetWidth;

    console.log(widgetLeft)

    return (
        <div className={classes.myWdg} style={{
            width: widgetWidth + "px",
            height: widgetHeight + "px",
            left: widgetLeft + "px",
        }}>
            <WidgetButton onClick={onClick}/>
        </div>
    );
};

export default Widget;