import React, { Component } from 'react';

export default class Editor extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
    }

    // The idea here is to pass the value from the editor to the App component.
    handleChange(event) {
        this.props.callback(event.target.value)
    }

    render() {
        return (
            <textarea id="editor" name="editor" onChange={ this.handleChange }></textarea>
        )
    }
}
