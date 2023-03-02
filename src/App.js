import './Styles/App.sass';
import Calculator from "./Components/Calculator";
import Widget from "./Components/UI/Widget/Widget";
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        };


    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {
                        this.state.isOpen ? <Calculator/> : null
                    }
                    <Widget onClick={() => {
                        this.setState({
                            isOpen: !this.state.isOpen
                        });
                    }}
                    />
                </header>
            </div>
        );
    }
}

export default App;
