/**
 * @file createRootReducer
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */

import {
    combineReducers,
} from 'redux';

import appReducer from 'src/pages/App/reducer';
import modelReducer from './model';

/**
 * root reducer getter
 *
 * @param {Object=} customReducers custom reducers
 * @return {Redux.Reducer} redux root reducer
 */
export default function createRootReducer(customReducers) {
    return combineReducers({
        ...appReducer,
        ...modelReducer,
        ...customReducers,
    });
}
