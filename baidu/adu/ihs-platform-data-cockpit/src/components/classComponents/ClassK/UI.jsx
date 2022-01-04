import React, { useEffect, useState } from 'react';
import { Table, Input, Pagination } from 'antd';
import axios from 'axios';
import qs from 'qs';
import { loginBaseURL } from 'src/env';
import TitleA from '@/components/TitleA';
import TitleB from '@/components/TitleB';
import NoData from '@/components/NoData';

import Styles from './UI.module.less';

function ClassK(props) {
    const { titleName, icon = '', config = {} } = props;
    const { theme, cardTag, id, updateDataByChild } = config;
    const [urlObj, setUrlObj] = useState({});
    const [keyword, setKeyword] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [pageConfig, setPageConfig] = useState({
        pageNo: 1,
        pageSize: 10,
        total: 0,
    });

    const COLUMNS_TABLE = [
        {
            title: '班次id',
            dataIndex: 'bus_number_id',
            key: 'bus_number_id',
        },
        {
            title: '班次类型',
            dataIndex: 'bus_type',
            key: 'bus_type',
        },
        {
            title: '预测接驳量（人）',
            dataIndex: 'trans_amount_forecast',
            key: 'trans_amount_forecast',
            sorter: {
                compare: (a, b) => a.trans_amount_forecast - b.trans_amount_forecast,
                // multiple: 3,
            },
        },
        {
            title: '接驳量异常分析',
            dataIndex: 'trans_abnormal_analyze',
            key: 'trans_abnormal_analyze',
        },
        {
            title: '接驳日期',
            dataIndex: 'trans_date',
            key: 'trans_date',
        },
        {
            title: '班次时间',
            dataIndex: 'bus_number_time',
            key: 'bus_number_time',
        },
    ];

    const onPaginationChange = (pageNo, pageSize) => {
        setPageConfig({
            ...pageConfig,
            pageNo,
            pageSize,
        });
    };

    const getChartData = () => {
        const { queryUrl } = urlObj;
        const { pageNo, pageSize } = pageConfig;
        const params = {
            pageNo,
            pageSize,
            keyword,
        };
        if (!queryUrl) {
            return;
        }
        axios.get(`${loginBaseURL}${queryUrl}?${qs.stringify(params, { indices: false })}`)
            .then(function (response) {
                const { data, status } = response;
                const { code } = data;
                if (status === 200 && code === 0) {
                    const chartDataRes = data.data ? data.data : {};
                    const { total = 0 } = chartDataRes;
                    const list = chartDataRes && chartDataRes.data ? chartDataRes.data : [];
                    setTableData(list);
                    setPageConfig({
                        ...pageConfig,
                        total,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const keyWordChange = e => {
        setKeyword(e.target.value);
    };

    useEffect(() => {
        getChartData();
    }, [urlObj, keyword, pageConfig.pageNo, pageConfig.pageSize]);


    useEffect(() => {
        const { tableName, bdaTableInfoEntityList } = config;
        const tableItem = bdaTableInfoEntityList.find(i => i.tableName === tableName);
        const { obtainFieldUrl, queryUrl } = tableItem ? tableItem : {};
        setUrlObj({
            obtainFieldUrl,
            queryUrl,
        });
    }, [config]);

    return (
        <div className={Styles.ClassK}>
            {
                config.theme === 1 && (<TitleA
                    titleName={titleName}
                    icon={icon}
                    cardTag={cardTag}
                    id={id}
                    updateParentData={updateDataByChild}
                />)
            }
            {
                config.theme === 2 && (<TitleB
                    titleName={titleName}
                    cardTag={cardTag}
                    id={id}
                    updateParentData={updateDataByChild}
                />)
            }

            <div className={`selectOneToTheme${config.theme}`}>
                <Input
                    placeholder="请输入关键字"
                    value={keyword}
                    onChange={keyWordChange}
                    style={{ width: `${theme === 1 ? '120px' : '170px'}`, marginLeft: '10px', height: '42px' }}
                />
            </div>
            <div className={`content ${Styles.content}`}>
                {
                    tableData.length && (
                        <div className={Styles.tableBox}>
                            <div className={Styles.table}>
                                <Table
                                    dataSource={tableData}
                                    rowKey={columns => columns.id}
                                    pagination={false}
                                >
                                    <Table.Column
                                        key='index'
                                        title='序号'
                                        fixed='left'
                                        width={80}
                                        render={(text, row, index) => {
                                            const start = (pageConfig.pageNo - 1) * pageConfig.pageSize;
                                            const _index = start + index;
                                            return (
                                                <>
                                                    {_index >= 9 ? (_index + 1) : `0${(_index + 1)}`}
                                                </>
                                            );
                                        }}
                                    />
                                    {COLUMNS_TABLE.map(column => (
                                        <Table.Column
                                            key={column.key}
                                            title={column.title}
                                            dataIndex={column.dataIndex}
                                        />
                                    ))}
                                </Table>
                            </div>
                            <div className={Styles.pagination}>
                                <Pagination
                                    defaultPageSize={10}
                                    defaultCurrent={1}
                                    pageSize={pageConfig.pageSize}
                                    total={pageConfig.total}
                                    current={pageConfig.pageNo}
                                    showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`}
                                    showSizeChanger
                                    showQuickJumper
                                    pageSizeOptions={[10, 20, 50]}
                                    onChange={onPaginationChange}
                                />
                            </div>
                        </div>
                    )
                }
                {
                    !tableData.length && <NoData />
                }
            </div>
        </div>
    );
}

export default React.memo(ClassK);
