import React from 'react';

// This component is used only here.
const BankSelector = ({bankName, callback}) => {
    return (
        <button onClick={() => bankName}>{bankName}</button>
    )
}

export class BankPanel extends React.Component {
    render() {
        return (
            <div>
              <p>Bank</p>
              <div className="btn-group">
                  <BankSelector bankName="Smooth Piano Kit"/>
              </div>
            </div>
        )
    }
}
