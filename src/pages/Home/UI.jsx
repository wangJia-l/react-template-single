import React, { useEffect } from 'react';
// import LoadScript from 'src/components/LoadScript';

import Styles from './UI.module.less';

function Home(props) {
    const { userInfo, fetchUser, history } = props;

    useEffect(() => {
        if (!userInfo) {
            fetchUser().then(res => {
                // console.log(res);
            });
        }
    }, []);

    const gotoNextPage = path => {
        history.push(path);
    };

    return (
        <div className={Styles.home}>
            <div>
                Home
                <span onClick={() => gotoNextPage('/list')}>Goto List, </span>
                <span onClick={() => gotoNextPage('/admin')}>Goto Admin</span>
            </div>
        </div>
    );
}

export default React.memo(Home);
