/**
 * @file Footer UI
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */

import React from 'react';

import Styles from './UI.module.less';

const Footer = () => (
    <div className={Styles.aiFooter}>
        我是Footer
    </div>
);

export default React.memo(Footer);
