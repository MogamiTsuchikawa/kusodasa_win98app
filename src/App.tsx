import React from 'react';
import logo from './logo.svg';
import './App.css';
import TitleBar from './components/TitleBar'

function App() {
  const windowStyle = {
    "height": "100%"
  }
  const bodyStyle = {
    "width": "calc(100% - 5px)",
    "height": "calc(100vh - 45px)"
  }
  return (
    <div className="App window" style={windowStyle}>
      <TitleBar title="This is Title" />
      <div className="window-body" style={bodyStyle}>
        <p>HelloWorld!</p>
      </div>
    </div>
  );
}

export default App;
