import React, { useEffect, useState } from 'react';

import Styles from './UI.module.less';

function ClassD(props) {
    const { chartData, icon = '' } = props;

    useEffect(() => {
    }, []);

    return (
        <div className={Styles.ClassD}>
            <div className={Styles.icon}></div>
            <div className={Styles.text}>
                <p>服务区停车位个数</p>
                <p>
                    <span>3456</span>
                    <span>个</span>
                </p>
            </div>
        </div>
    );
}

export default React.memo(ClassD);
