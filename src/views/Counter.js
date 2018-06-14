
import React, { Component } from 'react';
//肯定需要引入全局的状态, 从而可以监听对应的事件
import CounterStore from '../stores/CounterStore';

//还需要引入Actions, 来让AppDispatch派发相应的action
import * as Actions from '../Actions';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //从全局的状态中拿到对应组件的状态
            count: CounterStore.getCounterValues()[props.flag]
        };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }
    
    render() {
        const { flag } = this.props;
        return (
            <div>
                <button style={style} onClick={this.increment}>+</button>
                <button style={style} onClick={this.decrement}>-</button>
                <span>{flag} count: {this.state.count}</span>
            </div>
        )
    }
    
    componentDidMount() {
        CounterStore.addChangeListener(this.onUpdate);
    }
    
    //在组件中注册的事件回调,一定要在组件销毁的时候清理掉,不然会造成内存的泄露的
    componentWillUnmount() {
        CounterStore.removeChangeListener(this.onUpdate);
    }
    
    increment() {
        //点击按钮,触发actions, 从而
        Actions.increment(this.props.flag)
    }
    
    decrement() {
        Actions.decrement(this.props.flag)
        
    }
    
    onUpdate() {
        //获取更改后的全局状态的新值
        const newCount = CounterStore.getCounterValues()[this.props.flag];
        
        //更新本组件实例对象的视图
        this.setState({
            count: newCount
        })
    }
}

const style = {
    margin: "10px"
};

export default Counter;

