import React from 'react';
import { Breadcrumb } from 'antd';
import Styles from './UI.module.less';

const Header = props => {
    const { list, history } = props;

    const goPath = route => {
        const { href } = route;
        history.push(href);
    };

    return (
        <div className={Styles.breadCrumb}>
            <div className={Styles.breadCrumbAll}>
                <Breadcrumb
                    className={Styles.xBread}
                    separator={<span style={{ color: '#536c9b' }}>/</span>}
                >
                    {
                        list.map(route => (
                            <Breadcrumb.Item key={route.key} onClick={() => goPath(route)}>
                                {route.name}
                            </Breadcrumb.Item>
                        ))
                    }

                </Breadcrumb>
            </div>
        </div>
    );
};

export default React.memo(Header);
