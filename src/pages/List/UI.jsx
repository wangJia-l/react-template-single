import React, { useState, useEffect } from 'react';

import Styles from './UI.module.less';

const List = props => {
    const { history, fetchList } = props;
    const [list, setList] = useState([]);

    useEffect(() => {
        fetchList({
            cid: 130,
        }).then(res => {
            setList(res.result);
        });
    }, []);

    const gotoNextPage = path => {
        history.push(path);
    };

    return (
        <div className={Styles.list}>
            <div>
                List
                <span onClick={() => gotoNextPage('/')}>Goto Home.</span>
            </div>
        </div>
    );
};

export default React.memo(List);
