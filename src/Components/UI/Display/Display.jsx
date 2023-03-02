import React from 'react';
import classes from "./Display.module.sass";

class Display extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div {...this.props} className={classes.myDsp}>
                {this.props.children}
            </div>
        );
    }
}

export default Display;