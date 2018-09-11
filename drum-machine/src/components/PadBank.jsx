import React from 'react';
import { DrumPad }  from './DrumPad.jsx';

export class PadBank extends React.Component {
  render() {
    let padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
            clipId={padBankArr[i].id}
            clip={padBankArr[i].url}
            keyTrigger={padBankArr[i].keyTrigger}
            keyCode={padBankArr[i].keyCode}
            updateDisplay={this.props.updateDisplay} />
        )
      })
      return (
      <div className="pad-bank" >
        {padBank}
      </div>
    )
  }
}
