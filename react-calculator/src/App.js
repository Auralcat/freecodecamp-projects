import React, { Component } from 'react';
import './App.css';
import Visor from './components/Visor.jsx';
import ButtonPanel from './components/ButtonPanel.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      display: '0',
      precision: 4,
      decimalClicks: 0,
      locked: false
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(event) {
    switch(event.target.value) {
    case '=':
      let precisionFactor = Math.pow(10, this.state.precision)
      this.setState({
        display: (eval(this.state.display) * precisionFactor) / precisionFactor
      })
      break;
    case 'C':
      this.setState({
        display: '0'
      })
      break;
    case '.':
      // Count the click
      this.setState({
        decimalClicks: this.state.decimalClicks += 1
      })
      // Check the preview string instead of the current one.
      let isolatedDecimals = this.state.display.split(/[\+\-\/\*]/)
      let allowedDecimalsRegex = /^\d+(\.\d{1,9})?$/
      let regexTest = isolatedDecimals.every((n) => allowedDecimalsRegex.test(n))
      if (regexTest && !isolatedDecimals[isolatedDecimals.length - 1].includes('.')) {
        this.setState({
          display: this.state.display + '.'
        })
      } else if (this.state.decimalClicks >= 2 && !this.state.locked) {
        this.setState({
          display: this.state.display + '0',
          decimalClicks: 0,
          locked: true
        })
      }
      break;
    default:
      let operations = '+-/*'.split('')
      if (this.state.display === '0'
          || (operations.includes(this.state.display.split('').pop()) && isNaN(event.target.value))) {
        this.setState({
          display: this.state.display.replace(/.$/, event.target.value),
          locked: false
        })
      } else {
        this.setState({
          display: this.state.display + event.target.value
        })
      }
    }
  }

  render() {
    const numbersCollection = ['zero', 'one', 'two', 'three', 'four', 'five',
                               'six', 'seven', 'eight', 'nine']
    const opsCollection = [
      {
        name: 'add',
        label: '+'
      },
      {
        name: 'subtract',
        label: '-'
      },
      {
        name: 'multiply',
        label: '*'
      },
      {
        name: 'divide',
        label: '/'
      },
      {
        name: 'equals',
        label: '='
      },
      {
        name: 'clear',
        label: 'C'
      },
      {
        name: 'decimal',
        label: '.'
      },
    ]
    const mappedNumbers = numbersCollection.map((num) => {
      return {
        name: num,
        label: numbersCollection.indexOf(num),
      }
    })
    return (
      <div className="App">
        <Visor display={ this.state.display }/>
        <ButtonPanel buttonArray={ mappedNumbers } callback={ this.handleButtonClick }/>
        <ButtonPanel buttonArray={ opsCollection } callback={ this.handleButtonClick }/>
      </div>
    );
  }
}

export default App;
