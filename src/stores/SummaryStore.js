
//肯定要引入AppDispatcher, 以便监听派发过来的action, 并在里面进行修改state的操作
import AppDispatcher from '../AppDispatcher';

//还要引入ActionTypes, 以便于在register里面做相应的判断
import * as ActionTypes from '../ActionTypes';

//EventEmitter, 用来在初始化一个store的时候,使用它的原型对象上面的方法
import { EventEmitter } from 'events';

//全局只有一个状态,不再建立新的状态,而使用CounterStore中的状态
import CounterStore from './CounterStore';

//事件名
const CHANGE_EVENT = 'changed';

//计算状态里的值得和
function computeSummary(CounterValues) {
    let sum = 0;
    for(const key in CounterValues) {
        if(CounterValues.hasOwnProperty(key)) {
            sum += CounterValues[key];
        }
    }
    
    return sum;
}

//初始化一个store
const SummaryStore = Object.assign({}, EventEmitter.prototype, {
   //返回这个store中的状态值
    getSummary: function() {
        return computeSummary(CounterStore.getCounterValues())
    },
    
    // 触发事件的函数
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    
    // 监听事件, 并添加事件的回调
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback)
    },
    
    //移除事件的监听函数
    removeChangeListener: function(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }
});

//监听派发过来的actions
SummaryStore.dispatchToken = AppDispatcher.register(action => {
    if(action.type == ActionTypes.INCREMENT || action.type == ActionTypes.DECREMENT) {
        //要等到CounterStore的状态改变后再发布事件
        AppDispatcher.waitFor([CounterStore.dispatchToken]);
        SummaryStore.emitChange();
    }
});

export default SummaryStore;

