
import AppDispatcher from '../AppDispatcher';
import * as ActionTypes from '../ActionTypes';

//为了使用EventEmitter原型对象上的方法
import { EventEmitter } from 'events';

//触发的事件名
const CHANGE_EVENT = 'changed';

//store中的状态
const counterValues = {
    'First': 0,
    'Second': 10,
    'Third': 20
};

//初始化一个store
const CounterStore = Object.assign({}, EventEmitter.prototype, {
    getCounterValues: function() {
        return counterValues;
    },
    
    //触发事件的函数
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    
    //监听事件,并添加事件的回调函数
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    
    //移除事件的回调函数
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// 监听 派发过来的actions
CounterStore.dispatchToken = AppDispatcher.register(action => {
    if(action.type == ActionTypes.INCREMENT) {
        //修改store中的状态值
        counterValues[action.flag] ++;
        
        //发布事件,以便于监听这个事件的组件进行更新
        CounterStore.emitChange();
    }else if(action.type == ActionTypes.DECREMENT) {
        counterValues[action.flag] --;
        
        CounterStore.emitChange();
    }
});

export default CounterStore;

