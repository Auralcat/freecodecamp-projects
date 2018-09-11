import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { DrumPad } from './components/DrumPad.jsx'

class App extends Component {
  render() {
    return (
      // Standard React stuff
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <DrumPad />
      </div>
    );
  }
}

export default App;
