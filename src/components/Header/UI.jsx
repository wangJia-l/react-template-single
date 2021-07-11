/**
 * @file Header UI
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */

import React, { useEffect } from 'react';

import Styles from './UI.module.less';

const Header = props => {
    // const { userInfo, history } = props;

    useEffect(() => {

    }, []);

    return (
        <div className={Styles.aiHeader}>
            我是Header
        </div>
    );
};

export default React.memo(Header);
