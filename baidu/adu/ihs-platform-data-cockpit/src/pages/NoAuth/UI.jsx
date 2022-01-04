import React from 'react';

import Styles from './UI.module.less';

const NoAuth = props => {
    const { history } = props;

    const goHome = () => {
        history.push('/');
    };

    return (
        <div className={Styles.noauth}>
            <div>
                <div>
                    You do not have permission to use it，
                    <span onClick={goHome}>goto home.</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(NoAuth);
