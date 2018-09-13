import React, { Component } from 'react';
import './App.css';
import Visor from './components/Visor.jsx';
import ButtonPanel from './components/ButtonPanel.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: '0'
    }
  }
  render() {
    const numbersCollection = [
      {
        label: 'one',
        callback() { return "Trurl?" }
      },
      {
        label: 'two',
        callback() { return "Trurl?" }
      },

    ]
    return (
      <div className="App">
        <Visor display={ this.state.display }/>
        <ButtonPanel buttonArray={ numbersCollection }/>
      </div>
    );
  }
}

export default App;
