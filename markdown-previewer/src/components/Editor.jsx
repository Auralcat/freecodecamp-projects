import React, { Component } from 'react';

export default class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: 'Trurl?'
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            inputValue: event.target.value
        })
    }

    render() {
        return (
            <textarea id="editor" name="editor" value={ this.state.value } onChange={ this.handleChange }></textarea>
        )
    }
}
