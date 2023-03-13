import React from 'react';
import classes from "./History.module.sass";
import MyHistoryMoveButton from "./Button/MyHistoryMoveButton";
import {DEFAULT_VALUES} from "../../../Constants/Constants";

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLeftMoveButton: true,
            showRightMoveButton: true,
        }

        this.props = props;
        this.finalResult = "";

        this.$historyRef = React.createRef();
        this.$leftMoveButton = React.createRef();
        this.$rightMoveButton = React.createRef();

        this.onClickMoveRight = this.onClickMoveRight.bind(this);
        this.onClickMoveLeft = this.onClickMoveLeft.bind(this);
    }

    onClickMoveRight(event) {
        const scrollLeftBefore = this.$historyRef.current.scrollLeft;
        this.$historyRef.current.scrollLeft += DEFAULT_VALUES.HISTORY_SCROLL_LENGTH;
        const scrollLeftAfter = this.$historyRef.current.scrollLeft;

        this.setState({
            showLeftMoveButton: true
        })

        if (scrollLeftBefore === scrollLeftAfter) {
            this.setState({
                showRightMoveButton: false
            })

            return
        }

        this.setState({
            showRightMoveButton: true
        })
    }

    onClickMoveLeft(event) {
        console.log(this.$leftMoveButton)
        const scrollLeftBefore = this.$historyRef.current.scrollLeft;
        this.$historyRef.current.scrollLeft -= DEFAULT_VALUES.HISTORY_SCROLL_LENGTH;
        const scrollLeftAfter = this.$historyRef.current.scrollLeft;

        this.setState({
            showRightMoveButton: true
        })


        if (scrollLeftBefore === scrollLeftAfter) {
            this.setState({
                showLeftMoveButton: false
            })

            return
        }

        this.setState({
            showLeftMoveButton: true
        })
    }



    getCorrectResult(arg1 , arg2, arg3) {
        let result = "";

        if (arg1 !== null) {
            result = `${arg1}`;
        }

        if (arg2 !== null) {
            result = `${result} ${arg2}`;
        }

        if (arg3 !== null) {
            result = `${result} ${arg3}`;
        }

        return result;
    }

    render() {
        const {
            firstArg,
            secondArg,
            currentOperation,
        } = this.props
        this.finalResult = this.getCorrectResult(firstArg, secondArg, currentOperation);

        return (
            <div
                className={classes.myHst}
            >
                {
                    this.state.showLeftMoveButton ?
                        <MyHistoryMoveButton
                            ref={this.$leftMoveButton}
                            onClick={this.onClickMoveLeft}
                        >
                            {String.fromCharCode(60)}
                        </MyHistoryMoveButton>
                        :
                        null
                }
                <div
                    className={classes.myHstRst}
                    ref={this.$historyRef}
                >
                    {this.finalResult}
                </div>
                {
                    this.state.showRightMoveButton ?
                        <MyHistoryMoveButton
                            ref={this.$rightMoveButton}
                            onClick={this.onClickMoveRight}
                        >
                            {String.fromCharCode(62)}
                        </MyHistoryMoveButton>
                        :
                        null
                }
            </div>
        );
    }
}

export default History;