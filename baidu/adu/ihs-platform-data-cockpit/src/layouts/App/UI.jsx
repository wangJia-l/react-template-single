import React from 'react';

import { hot } from 'react-hot-loader/root';

import { Layout } from 'antd';
import AiHeader from 'src/components/header';

import Styles from './UI.module.less';

const { Header, Content } = Layout;

function App(props) {
    const { history } = props;
    const { location } = history;
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    if ((!userInfo || !userInfo.access_token) && location.pathname === '/manage/login') {
        return (
            <Content>{props.children}</Content>
        );
    }

    if (location.pathname === '/manage/login') {
        history.push('/manage/userRights/user');
    }
    return (
        <Layout className={Styles.layout} style={{ display: 'flex', alignItems: 'center' }}>
            <Header style={{ width: 'calc(100% - 40px)',
                paddingTop: '20px', backgroundColor: '#0b1525', minWidth: '1920px' }}
            >
                <AiHeader userInfo={userInfo} history={history} />
            </Header>
            <Content style={{ marginTop: '100px', width: '1920px' }}>
                <Layout>
                    <Content className={Styles.contentBox}>{props.children}</Content>
                </Layout>
            </Content>
        </Layout>
    );
}

export default hot(React.memo(App));
