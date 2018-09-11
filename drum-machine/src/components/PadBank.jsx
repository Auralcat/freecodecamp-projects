import React, { Component } from 'react';
import { DrumPad }  from './DrumPad.jsx';

export class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padBank;
    this.props.power ?
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
                        clipId={padBankArr[i].id}
                        clip={padBankArr[i].url}
                        keyTrigger={padBankArr[i].keyTrigger}
                        keyCode={padBankArr[i].keyCode}
                        updateDisplay={this.props.updateDisplay}
                        power={this.props.power} />
        )
      }) :
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
                        clipId={padBankArr[i].id}
                        clip="#"
                        keyTrigger={padBankArr[i].keyTrigger}
                        keyCode={padBankArr[i].keyCode}
                        updateDisplay={this.props.updateDisplay}
                        power={this.props.power} />
        )
      });
    return (
      <div className="pad-bank" >
                {padBank}
            </div>
    )
  }
}
