/**
 * @file Admin UI
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */

import React from 'react';

import Styles from './UI.module.less';

const Admin = props => {
    const { history } = props;

    const goHome = () => {
        history.push('/');
    };

    return (
        <div className={Styles.admin}>
            <div>
                <div>
                    Admin
                    <span onClick={goHome}>Goto Home</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Admin);
