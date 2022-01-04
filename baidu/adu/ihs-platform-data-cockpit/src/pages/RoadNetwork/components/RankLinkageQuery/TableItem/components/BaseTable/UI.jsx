import React, { useState, useEffect } from 'react';
import Styles from './UI.module.less';
import './UI.less';
import { Select, DatePicker, Table, Pagination } from 'antd';

const BaseTable = props => {
    const { columns, data, paganationProps, total = 0, getPage = () => {},
        pageParams = { pageNo: 1, pageSize: 10 }, onRow, curRow, scroll, level } = props;

    const onPaginationChange = (page, pageSize) => {
        getPage({
            pageNo: page,
            pageSize: pageSize,
        });
    };
    // const [flag, setFlag] = useState(false);
    const handlerRowClass = (record, index) => {
        // if (level === 'C' && record.id === curRow) {
        //     return 'active-row';
        // }
        if (record.id === curRow) {
            return 'active-row';
        }

    };
    return (
        <div className={Styles.tableBox}>
            <div className={Styles.table}>
                <Table
                    style={{ height: '400px' }}
                    rowKey={record => {
                        return (record.id + Date.now());
                    }}
                    rowClassName={(record, index) => handlerRowClass(record, index)}
                    onRow={onRow}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    scroll={scroll}
                />
            </div>
            <div className={Styles.pagination}>
                <Pagination
                    defaultPageSize={10}
                    defaultCurrent={1}
                    pageSize={pageParams.pageSize}
                    total={total}
                    current={pageParams.pageNo}
                    showSizeChanger
                    pageSizeOptions={[10, 20, 50]}
                    onChange={onPaginationChange}
                    {...(paganationProps || {})}
                />
            </div>
        </div>
    );
};
export default React.memo(BaseTable);
