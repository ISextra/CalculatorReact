import './Styles/App.sass';
import Calculator from "./Components/Calculator";
import Widget from "./Components/UI/Widget/Widget";

import React, {useState} from "react";

function App() {
  const [isOpen, setOpen] = useState(true);

  return (
    <div className="App">
      <header className="App-header">
        {
          isOpen ? <Calculator/> : null
        }
        <Widget onClick={() => {
          setOpen(!isOpen);
        }}
        />
      </header>
    </div>
  );
}

export default App;
