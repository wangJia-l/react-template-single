import React from 'react';

import Styles from './UI.module.less';

const NoData = props => {
    const { theme } = props;

    return (
        <div
            // style={{
            //     top: `${theme === 1 ? '50px' : '0'}`,
            //     height: `${theme === 1 ? 'calc(100% - 50px)' : '100%'}`,
            // }}
            className={Styles.NoData}
        >
            <div className={Styles.icon}></div>
            <p>暂无数据内容，请稍后再试···</p>
        </div>
    );
};

export default React.memo(NoData);
