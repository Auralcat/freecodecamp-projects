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

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(event) {
    switch(event.target.value) {
    case '=':
      this.setState({
        display: String(eval(this.state.display))
      })
      break;
    case 'C':
      this.setState({
        display: '0'
      })
      break;
    case '.':
      // Check the preview string instead of the current one.
      let isolatedDecimals = this.state.display.split(/[\+\-\/\*]/)
      let allowedDecimalsRegex = /^\d+(\.\d{1,9})?$/
      let regexTest = isolatedDecimals.every((n) => allowedDecimalsRegex.test(n))
      console.log(isolatedDecimals, regexTest)
      if (regexTest && this.state.display.split('').pop() !== '.') {
        this.setState({
          display: this.state.display + '.'
        })
      }
      break;
    default:
      let operations = '+-/*'.split('')
      if (this.state.display === '0'
          || (operations.includes(this.state.display.split('').pop()) && isNaN(event.target.value))) {
        this.setState({
          display: this.state.display.replace(/.$/, event.target.value)
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
