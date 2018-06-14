
import * as ActionTypes from './ActionTypes';
import AppDispatcher from './AppDispatcher';

export const increment = flag => {
    //当ui组件调用increment的时候,会派发一个action
    AppDispatcher.dispatch({
        type: ActionTypes.INCREMENT,
        flag
    })
};

export const decrement = flag => {
    AppDispatcher.dispatch({
        type: ActionTypes.DECREMENT,
        flag
    })
};