import React from 'react';
import classes from "./Widget.module.sass";
import WidgetButton from "./Button/WidgetButton";
import {BUTTONS_CONTENT, DEFAULT_VALUES} from "../../../Constants/Constants";

class Widget extends React.Component {
    constructor({onClick ,props}) {
        super(props);
        this.state = {
            widgetElementContent: BUTTONS_CONTENT.HIDE,
            widgetElementsVisibility: DEFAULT_VALUES.STYLE_HIDDEN,
            widgetElementsOpacity: DEFAULT_VALUES.STYLE_OPACITY_HIDDEN,
            widgetElementsLeft: DEFAULT_VALUES.ZERO,
            widgetElementsTransform: `rotate(${DEFAULT_VALUES.ZERO}deg)`,
        };

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
                onMouseEnter={() => {
                    this.setState({
                        widgetElementsVisibility: DEFAULT_VALUES.STYLE_VISIBLE,
                        widgetElementsOpacity: DEFAULT_VALUES.STYLE_OPACITY_VISIBLE,
                        widgetElementsLeft: DEFAULT_VALUES.ZERO,
                        widgetElementsTransform: `rotate(${DEFAULT_VALUES.ZERO}deg)`,
                    })
                }}
                onMouseLeave={() => {
                    this.setState({
                        widgetElementsVisibility: DEFAULT_VALUES.STYLE_HIDDEN,
                        widgetElementsOpacity: DEFAULT_VALUES.STYLE_OPACITY_HIDDEN,
                        widgetElementsLeft: DEFAULT_VALUES.WIDGET_BUTTON_ANIMATION_LEFT + "px",
                        widgetElementsTransform: `rotate(${DEFAULT_VALUES.WIDGET_BUTTON_ANIMATION_TRANSFORM}deg)`,
                    })
                }}
                className={classes.myWdg}
                style={{
                    width: this.widgetWidth + "px",
                    height: this.widgetHeight + "px",
                    left: this.widgetLeft + "px",
                }}
            >
                <WidgetButton
                    onClick={this.onClick}
                    visibility={this.state.widgetElementsVisibility}
                    opacity={this.state.widgetElementsOpacity}
                    left={this.state.widgetElementsLeft}
                    transform={this.state.widgetElementsTransform}
                >
                    {this.state.widgetElementContent}
                </WidgetButton>
            </div>
        );
    }
}

export default Widget;