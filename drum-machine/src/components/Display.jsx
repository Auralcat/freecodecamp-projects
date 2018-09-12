import React from 'react';

export class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoToDisplay: ''
    }
  }

  render() {
    return (
        <div>
            <p id="display">
                {this.state.infoTodisplay}
            </p>
        </div>
    )}
}
