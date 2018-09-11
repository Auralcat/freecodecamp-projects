import React, { Component } from 'react';

export class DrumPad extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      power: true,
      display: String.fromCharCode(160),
      currentPadBank: '',
      currentPadBankId: 'Header Kit',
      sliderVal: 0.3
    }

    // Bind them methods!
    this.displayClipName = this.displayClipName.bind(this)
    this.selectBank = this.selectBank.bind(this)
    this.adjustVolume = this.adjustVolume.bind(this)
    this.powerControl = this.powerControl.bind(this)
    this.clearDisplay = this.clearDisplay.bind(this)
  }

  powerControl() {

  }

  displayClipName() {

  }

  adjustVolume() {

  }

  selectBank() {

  }

  clearDisplay() {

  }

  render() {
    return(
    <div id="drum-machine" className="inner-container">
    {/* <PadBank /> */}
    <div className="logo">
        <div className="inner-logo">{'Auralcat' + String.fromCharCode(160)}</div>
    </div>
    <div className="control">
        <p>Power</p>
        <div onClick="this.powerControl" className="select">
            <div style="powerSlider" className="inner" />
        </div>
        <p id="display">{this.state.display}</p>
        <div className="volume-slider">
            <input max="1" min="0" name="volume" onChange={this.adjustVolume} step="0.01" type="range" value={this.state.sliderVal}/>
        </div>
    </div>
    <div className="control">
        <p>Bank</p>
        <div className="select" onClick={ this.selectBank }>
            <div style={ bankSlider } className="inner" />
        </div>
    </div>
    </div>
    )
  }
}