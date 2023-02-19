import React from "react";

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <div>
                <p>Вы кликнули {this.state.count} раз(а)</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    увеличить
                </button>
                <button onClick={() => this.setState({ count: this.state.count - 1 })}>
                    уменьшить
                </button>
            </div>
        );
    }
}