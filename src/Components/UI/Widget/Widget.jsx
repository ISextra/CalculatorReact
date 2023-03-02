import React from 'react';
import classes from "./Widget.module.sass";
import WidgetButton from "./Button/WidgetButton";

class Widget extends React.Component {
    constructor({onClick ,props}) {
        super(props);

        this.onClick = onClick;
        this.documentHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        this.documentWidth = Math.max(
            document.body.scrollWidth, document.documentElement.scrollWidth,
            document.body.offsetWidth, document.documentElement.offsetWidth,
            document.body.clientWidth, document.documentElement.clientWidth
        );
        this.widgetWidth = this.documentWidth / 4;
        this.widgetHeight = this.documentHeight;
        this.widgetLeft = this.documentWidth - this.widgetWidth;
    }

    render() {
        return (
            <div
                className={classes.myWdg}
                style={{
                    width: this.widgetWidth + "px",
                    height: this.widgetHeight + "px",
                    left: this.widgetLeft + "px",
                }}
            >
                <WidgetButton
                    onClick={this.onClick}
                />
            </div>
        );
    }
}

export default Widget;