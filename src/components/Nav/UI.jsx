import React from 'react';
import { Menu } from 'antd';

import Styles from './UI.module.less';

const { SubMenu } = Menu;

const Nav = props => {
    const {
        title, menu, defaultOpenKeys, defaultSelectedKeys, onClick,
    } = props;

    const onMenuClick = e => {
        onClick(e);
    };

    const renderMenu = m => {
        if (m.type === 'MenuItem') {
            return <Menu.Item key={m.key}>{m.title}</Menu.Item>;
        }
        if (m.type === 'SubMenu') {
            return (
                <SubMenu key={m.key} title={m.title}>
                    {
                        m.items.map(item => renderMenu(item))
                    }
                </SubMenu>
            );
        }
        return <></>;
    };

    return (
        <div className={Styles.aiNav}>
            <div className={Styles.navTitle}>{title}</div>
            <div className={Styles.navContent}>
                <Menu
                    onClick={onMenuClick}
                    defaultSelectedKeys={defaultSelectedKeys}
                    defaultOpenKeys={defaultOpenKeys}
                    mode="inline"
                >
                    {
                        menu.map(m => renderMenu(m))
                    }
                </Menu>
            </div>
        </div>
    );
};

export default React.memo(Nav);
