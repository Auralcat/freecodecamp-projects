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

    this.updateDisplay = this.updateDisplay.bind(this)
  }

  updateDisplay(event) {
    console.log(event);
    this.setState({
      display: this.state.display + event.target.value
    })
  }

  render() {
    const numbersCollection = ['zero', 'one', 'two', 'three', 'four', 'five',
                               'six', 'seven', 'eight', 'nine']
    const mappedNumbers = numbersCollection.map((num) => {
      return {
        name: num,
        label: numbersCollection.indexOf(num),
      }
    })
    return (
      <div className="App">
        <Visor display={ this.state.display }/>
        <ButtonPanel buttonArray={ mappedNumbers } callback={ this.updateDisplay }/>
      </div>
    );
  }
}

export default App;
