import React from 'react';

// This component is used only here.
const BankSelector = ({bankName, callback}) => {
    return (
        <button onClick={() => callback(bankName)}>{bankName}</button>
    )
}

export class BankPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentBank: 'FooBar'
        }
    }
    render() {
        return (
            <div>
              <p>Bank</p>
              <div className="btn-group">
                  <BankSelector bankName="Smooth Piano Kit" callback={(bankName) => this.setState({currentBank: bankName})}/>
              </div>
            </div>
        )
    }
}
