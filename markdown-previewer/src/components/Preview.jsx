import React, { Component } from 'react';

export default class Preview extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div id="preview"> { this.props.callback(this.props.value) } </div>
        )
    }
}
