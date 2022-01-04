import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Menu, Dropdown, message } from 'antd';
import Styles from './UI.module.less';
import { MENU_CONFIG } from './config';
import { get, post, login } from 'src/common/request';

const Header = props => {
    const { history, logout } = props;
    const [userName, setUserName] = useState('未登录');
    const [currentKey, setCurrentKey] = useState('');
    // const [MENU_CONFIG, setMENU_CONFIG] = useState([]);

    const onMainMenuClick = item => {
        const href = item.href || '';
        if (href.indexOf('http://') === 0 || href.indexOf('https://') === 0 || href.indexOf('//') === 0) {
            window.location = href;
        }
        else {
            setCurrentKey(item.href);
            history.push(href);
        }
    };

    const getUserInfo = async () => {
        const response = await post('/admin/auth/myInfo');
        const { code, data } = response;
        if (code === 0) {
            const { realName }  = data;
            setUserName(realName);
        }
    };

    const goLogin = () => {
        login();
    };

    const goLogout = async () => {
        window.localStorage.setItem('token', null);
        window.localStorage.setItem('expires', null);
        message.success('您已退出登录');
        setTimeout(() => {
            login();
        }, 1000);
    };

    const goPortal = () => {
        const PORTAL_URL = process.env.NODE_ENV === 'production'
            ? 'http://13.99.25.56:9003/portal/'
            : 'http://180.76.60.136:9003/portal/';
        window.location = PORTAL_URL;
    };

    const loginMenu = () => (
        !userName || userName === '未登录'
            ? (
                <Menu>
                    <Menu.Item key={1} onClick={() => goLogin()}>
                        登录
                    </Menu.Item>
                </Menu>
            )
            : (
                <Menu>
                    <Menu.Item key={2} onClick={() => goPortal()}>
                        返回门户
                    </Menu.Item>
                    <Menu.Item key={2} onClick={() => goLogout()}>
                        退出登录
                    </Menu.Item>
                </Menu>
            )
    );


    useEffect(() => {
        history.listen(route => {
            const { pathname } = route;
            if (pathname) {
                setCurrentKey(pathname);
            }
        });
        const _pathname = history.location.pathname;
        setCurrentKey(_pathname);
        getUserInfo();
    }, []);

    return (
        <div className={Styles.aiHeader}>
            <div className={Styles.left}>
                <div className={Styles.logo}></div>
                <div className={Styles.name}></div>
            </div>
            <div className={Styles.right}>
                {MENU_CONFIG.mainMenu.map(item => (
                    <div
                        className={
                            classNames(Styles.button, currentKey.indexOf(item.path) === 0 && Styles.menuActive)
                        }
                        key={item.key}
                    >
                        <span onClick={() => onMainMenuClick(item)}>{item.name}</span>
                    </div>
                ))}
                <div className={Styles.user}>
                    <Dropdown
                        overlay={() => loginMenu()}
                        trigger={['click']}
                        placement="bottomCenter"
                    >
                        <span>{userName}</span>
                    </Dropdown>
                </div>
            </div>

        </div>
    );
};

export default React.memo(Header);
