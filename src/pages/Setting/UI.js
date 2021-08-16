import React from 'react';

import Styles from './UI.module.less';

const Setting = props => {
    const { history } = props;

    const gotoNextPage = path => {
        history.push(path);
    };

    return (
        <div className={Styles.setting}>
            <div>I am Setting</div>
            <span onClick={() => gotoNextPage('/')}>Goto Home</span>
        </div>
    );
};

export default React.memo(Setting);
