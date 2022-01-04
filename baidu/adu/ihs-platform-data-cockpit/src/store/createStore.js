/**
 * @file redux store creator
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */

import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';

import ReduxThunk from 'redux-thunk';

import {
    routerMiddleware,
    connectRouter,
} from 'connected-react-router';

import {
    isDev,
} from 'src/env';
import getPreloadedState from './getPreloadedState';

import createRootReducer from './createRootReducer';

const composeEnhancer = isDev
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

/**
 * Redux store creator
 *
 * @param {History} history react-router history
 * @return {Redux.Store} redux store
 */
export default function (history) {
    return createStore(
        createRootReducer({
            router: connectRouter(history),
        }),
        getPreloadedState(),
        composeEnhancer(
            applyMiddleware(
                ReduxThunk,
                routerMiddleware(history)
            )
        )
    );
}
