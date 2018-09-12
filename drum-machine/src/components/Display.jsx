import React from 'react';

export class Display extends React.Component {
    render() {
        return (
            <div>
                <p id="display">{this.props.infoToDisplay}</p>
            </div>
        )
    }
}
