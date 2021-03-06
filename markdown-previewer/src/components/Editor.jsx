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
            <div>
                <h3 style={ { textAlign: 'center' } }>Editor:</h3>
                <textarea id="editor" style={ {width: "100%", height: "100%"} }cols="60" rows="15" value={ this.props.value } name="editor" onChange={ this.handleChange }></textarea>
            </div>
        )
    }
}
