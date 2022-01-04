import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import history from 'src/routes/history';
import createStore from 'src/store/createStore';
import Router from 'src/routes/router';

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
    // 获取地址栏参数
    const getQueryVariable = variable => {
        let query = window.location.search.substring(1);
        let vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=');
            if (pair[0] === variable) {
                return pair[1];
            }
        }
        return (false);
    };
    if (process.env.NODE_ENV === 'development') {
        getQueryVariable('token') && window.localStorage.setItem('token', getQueryVariable('token'));
    }
    render();
}

init();
