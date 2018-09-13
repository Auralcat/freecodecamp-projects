import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'This is a sample text.'
    }
    this.getCurrentText = this.getCurrentText.bind(this)
  }

  getCurrentText(str) {
    this.setState({
      text: str
    })
  }

  render() {
    return (
      <div>
          <header>
              <h1>Markdown Previewer</h1>
          </header>
          <main>
              <textarea id="editor" cols="80" name="editor" rows="10" value={ this.state.text }></textarea>
            <textarea id="preview" cols="30" name="preview" rows="10" value={ marked( this.state.text ) } readonly=""></textarea>
          </main>
      </div>
    );
  }
}

export default App;
