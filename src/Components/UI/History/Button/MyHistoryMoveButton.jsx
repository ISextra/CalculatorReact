import React from 'react';
import classes from "./MyHistoryMoveButton.module.css";

class MyHistoryMoveButton extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const {
            children,
            onClick,
        } = this.props

        return (
            <button
                className={classes.myHstMoveBtn}
                onClick={onClick}
            >
                {children}
            </button>
        )
    }
}

export default MyHistoryMoveButton;