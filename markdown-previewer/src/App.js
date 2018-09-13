import React, { Component } from 'react';
import marked from 'marked';
import './App.css';
import Editor from './components/Editor.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: 'This is a sample text.\n\nDoes this work with other stuff?'
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
            <Editor callback={ this.getCurrentText } />
            <div id="preview">
              { marked(this.state.text) }
            </div>
          </main>
      </div>
    );
  }
}

export default App;
