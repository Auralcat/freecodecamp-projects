import React, { Component } from 'react';

class Visor extends Component {
  render() {
    return (
      <input value={ this.props.display } readonly/>
    );
  }
}

export default App;
