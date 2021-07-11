/**
 * @file index
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import history from 'src/routes/history';
import createStore from 'src/store/createStore';
import Router from 'src/routes/router';
import { fetchUser } from 'src/store/model/user/action';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { isMock } from './env';

import 'antd/dist/antd.css';
import 'src/common/style/global.less';

if (isMock) {
    require('../mock/index.js');
}

const store = createStore(history);

function render() {
    ReactDOM.render((
        <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <ConnectedRouter history={history}>
                    <Router />
                </ConnectedRouter>
            </ConfigProvider>
        </Provider>
    ), document.querySelector('.root'));
}

function init() {
    render();
    // store.dispatch(fetchUser()).then(function () {
    //     // render();
    // }).finally(() => {
    //     render();
    // });
}

init();
