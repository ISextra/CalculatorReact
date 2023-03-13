import React from 'react';
import classes from "./History.module.sass";
import MyHistoryMoveButton from "./Button/MyHistoryMoveButton";
import {DEFAULT_VALUES} from "../../../Constants/Constants";

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLeftMoveButton: false,
            showRightMoveButton: false,
            historyData: null,
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

    componentDidUpdate(prevProps) {
        if (this.props.historyData !== prevProps.historyData) {
            console.log("componentDidUpdate", prevProps, this.props);

            if (this.$historyRef.current.scrollWidth > this.$historyRef.current.clientWidth) {
                this.$historyRef.current.scrollLeft += 1e9;

                this.setState({
                    showLeftMoveButton: true
                });

                return;
            }

            this.setState({
                showLeftMoveButton: false,
                showRightMoveButton: false,
            });
        }
    }

    render() {
        const {
            historyData,
        } = this.props

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
                    {historyData}
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