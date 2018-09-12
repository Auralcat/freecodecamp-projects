import React from 'react';
import './App.css';
import { bankOne, bankTwo } from './consts.js';
import { PadBank } from './components/PadBank.jsx';
import { Display } from './components/Display.jsx';
import { VolumeSlider } from './components/VolumeSlider.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: String.fromCharCode(160),
      currentPadBank: bankOne,
      currentPadBankId: 'Heater Kit',
      sliderVal: 0.3
    }
    this.displayClipName = this.displayClipName.bind(this);
    this.selectBank = this.selectBank.bind(this);
  }

  selectBank() {
    this.state.currentPadBankId === 'Heater Kit' ?
      this.setState({
        currentPadBank: bankTwo,
        display: 'Smooth Piano Kit',
        currentPadBankId: 'Smooth Piano Kit',
      }) :
      this.setState({
        currentPadBank: bankOne,
        display: 'Heater Kit',
        currentPadBankId: 'Heater Kit',
      });
  }

  displayClipName(name) {
    this.setState({
      display: name
    });
  }

  render() {
    const bankSlider = this.state.currentPadBank === bankOne ? {
      float: 'left'
    } : {
      float: 'right'
    };
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Drum Machine App</h1>
        <div id="drum-machine" className="inner-container">
          <PadBank
            updateDisplay={this.displayClipName}
            clipVolume={this.state.sliderVal}
            currentPadBank={this.state.currentPadBank} />

          <div className="controls-container">
            <Display infoToDisplay={this.state.display} />
            <VolumeSlider sliderVal={this.state.sliderVal}/>
            <div className="control">
              <p>Bank</p>
              <div onClick={this.selectBank} className="select">
                <div style={bankSlider} className="inner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
