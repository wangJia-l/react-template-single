import React, { useState, useEffect } from 'react';

import {
    hot,
} from 'react-hot-loader/root';

import { Layout } from 'antd';
import AiHeader from 'src/components/header';
import AiFooter from 'src/components/footer';
import AiNav from 'src/components/nav';
import { loginBaseURL } from 'src/env';
import { MENUS, getDefaultKey } from './config';

import Styles from './UI.module.less';

const {
    Header, Footer, Sider, Content,
} = Layout;

function App(props) {
    const { history, userInfo } = props;
    const [defaultOpenKey, setDefaultOpenKey] = useState(() => {
        const defaultKeys = getDefaultKey(history.location.pathname);
        return [defaultKeys[0]];
    });
    const [defaultSelectedKey, setDefaultSelectedKey] = useState(() => {
        const defaultKeys = getDefaultKey(history.location.pathname);
        return [defaultKeys[1]];
    });

    useEffect(() => {
        // 重定向
        // if (!userInfo || !userInfo.id) {
        //     const redirectUrl = encodeURIComponent(history.location.href);
        //     const loginUrl = `${loginBaseURL}?redirect=${redirectUrl}`;
        //     window.location = loginUrl;
        // }
    }, []);

    const findMenuItem = (m, key) => {
        if (m.type === 'MenuItem') {
            if (key === m.key) {
                return m.url;
            }
            return '';
        }
        if (m.type === 'SubMenu') {
            let url = '';
            for (let i = 0; i < m.items.length; i++) {
                url = findMenuItem(m.items[i], key);
                if (url) {
                    break;
                }
            }
            return url;
        }
    };

    const findMenu = (menu, key) => {
        let url = '';
        for (let i = 0; i < menu.length; i++) {
            url = findMenuItem(menu[i], key);
            if (url) {
                break;
            }
        }
        return url;
    };

    const onMenuClick = e => {
        const itemKey = e.key;
        const url = findMenu(MENUS, itemKey);
        history.push(url);
    };

    return (
        <Layout className={Styles.layout}>
            <Header>
                <AiHeader />
            </Header>
            <Content>
                <Layout>
                    <Sider theme="light">
                        <AiNav {...{
                            title: '百度',
                            menu: MENUS.filter(m => !m.auth || m.auth === userInfo.role),
                            defaultOpenKeys: defaultOpenKey,
                            defaultSelectedKeys: defaultSelectedKey,
                            onClick: onMenuClick,
                        }}
                        />
                    </Sider>
                    <Content>{props.children}</Content>
                </Layout>
            </Content>
            <Footer>
                <AiFooter />
            </Footer>
        </Layout>
    );
}

export default hot(React.memo(App));
