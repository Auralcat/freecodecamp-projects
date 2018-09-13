import React, { Component } from 'react';

class ButtonPanel extends Component {
  render() {
      // Declare the Button component
      // You need a fn to translate the number to the string
      const Button = ({label, callback}) => {
          return <button id={ label } onClick={ callback(label) }>{ label }</button>
      }

      return (
      <input value={ this.props.display } readonly/>
    );
  }
}

export default App;
