import React, { Component } from 'react';
import './App.css';
import Visor from './components/Visor.jsx';
import ButtonPanel from './components/ButtonPanel.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Visor/>
        <ButtonPanel/>
        <ButtonPanel/>
      </div>
    );
  }
}

export default App;
