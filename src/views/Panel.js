
import React, { Component } from 'react';
import Counter from './Counter';
import Summary from './Summary';

class Panel extends Component {
    render() {
        return (
            <div style={{margin: "20px"}}>
                <Counter flag="First" />
                <Counter flag="Second" />
                <Counter flag="Third" />
                <hr/>
                <Summary />
            </div>
        )
    }
}

export default Panel;