
import React, { Component } from 'react';

import SummaryStore from '../stores/SummaryStore';

class Summary extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            total: SummaryStore.getSummary()
        };
        this.onUpdate = this.onUpdate.bind(this);
    }
    
    render() {
        return (
            <div>
                Total count: {this.state.total}
            </div>
        )
    }
    
    componentDidMount() {
        SummaryStore.addChangeListener(this.onUpdate);
    }
    
    componentWillUnmount() {
        SummaryStore.removeChangeListener(this.onUpdate);
    }
    
    onUpdate() {
        this.setState({
            total: SummaryStore.getSummary()
        })
    }
}

export default Summary;
