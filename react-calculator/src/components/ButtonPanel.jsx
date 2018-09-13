import React, { Component } from 'react';

export default class ButtonPanel extends Component {
  render() {
      // Declare the Button component
      // You need a fn to translate the number to the string
      const CalcButton = ({name, label, callback}) => {
          return <button id={ name } onClick={ callback } value={ label }>{ label }</button>
      }

      return (
          <div className="button-panel">
              { this.props.buttonArray.map((elem) => <CalcButton name={ elem.name } label={ elem.label } callback={ this.props.callback }/>) }
          </div>
    );
  }
}
