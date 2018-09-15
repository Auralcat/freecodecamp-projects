import React, { Component } from 'react';

export default class Visor extends Component {
  render() {
    return (
        <input id="display" value={ this.props.display } style={ { textAlign: "right" } }readOnly={ true }/>
    );
  }
}
