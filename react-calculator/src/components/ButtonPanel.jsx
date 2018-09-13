import React, { Component } from 'react';

class ButtonPanel extends Component {
  render() {
      // Declare the Button component
      // You need a fn to translate the number to the string
      const CalcButton = ({label, callback}) => {
          return <button id={ label } onClick={ callback(label) }>{ label }</button>
      }

      return (
          <div className="button-panel">
              { this.props.buttonArray.map((elem) => <CalcButton label={ elem.label } callback={ elem.callback }/>) }
          </div>
    );
  }
}

export default App;