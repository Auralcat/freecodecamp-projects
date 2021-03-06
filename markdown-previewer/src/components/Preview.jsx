import React, { Component } from 'react';


export default class Preview extends Component {
    constructor(props) {
        super(props)

        this.createMarkup = this.createMarkup.bind(this)
    }

    createMarkup() {
        return {__html: this.props.callback(this.props.value,
                                            {sanitize: true, breaks: true})}
    }

    render() {

        return (
            <div>
                <h3 style={ { textAlign: 'center' } }>Resulting markdown:</h3>
                <div id="preview" dangerouslySetInnerHTML={this.createMarkup()}/>
            </div>
        )
    }
}
