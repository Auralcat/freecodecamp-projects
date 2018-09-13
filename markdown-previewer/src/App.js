import React, { Component } from 'react';
import marked from 'marked';
import './App.css';
import Editor from './components/Editor.jsx'
import Preview from './components/Preview.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "# Header 1\n\n## Header 2\n[This is a link](https://www.youtube.com/watch?v=kIRJxBdAKxs)\n* List Item\n\n`Single code line`\n\n```\nCode Block\n```\n\n**Booold!**\n_Underlined_\n~Strikethrough~\n![Guess who](https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Flastfm-img2.akamaized.net%2Fi%2Fu%2F174s%2Fbebae84e053e40d925ef6243762f6fed.png&f=1)\n\nBoopity boo:\n\n> Darude - Sandstorm\n> And Rickrolls"
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
          <main className="editor-and-preview">
            <Editor callback={ this.getCurrentText } value={ this.state.text }/>
            <Preview callback={ marked } value={ this.state.text }/>
          </main>
      </div>
    );
  }
}

export default App;
