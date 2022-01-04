import React, { useState, useEffect } from 'react';
import Styles from '../TableItem/UI.module.less';
import { Select, DatePicker, Table } from 'antd';
import BaseTable from '../TableItem/components/BaseTable';
import moment from 'moment';
import { eventPlaceList } from '../TableItem/api';
import { DIRECTION, TIME_TYPE, TIME_RANGE, SPACE_TYPE, EVENT_TYPE } from '../config';
const EventPlaceC = props => {
    const {
        getChild = () => {},
        getDefaultData = () => {},
        getRightType = () => {},
    } = props;
    // 事件类型
    const [type, setEventType] = useState('异常停车');
    // 方向
    const [curDirection, setDirection] = useState(-1);
    // 空间
    const [spaceType, setSpaceType] = useState(-1);
    // 时间
    const [timeLevel, setTimeLevel] = useState(-1);
    const defaultTimeRange = new Date().getHours() === 0 ? 23 : new Date().getHours() - 1;
    const [timeRange, setTimeRange] = useState(defaultTimeRange);
    const [datetime, setDateTime] = useState(moment().subtract(1, 'months'));
    const [dataSource, setDataSource] = useState([]);
    const [pageParams, setPageParams] = useState({
        pageNo: 1,
        pageSize: 10,
    });
    const [total, setTotal] = useState(0);
    const [curRow, setRow] = useState('');
    const [childData, setChildData] = useState({});
    const defaultSearch = [
        {
            label: '事件类型',
            data: Array.from(EVENT_TYPE).map(itm => ({ text: itm[1], value: itm[1] })),
            inputName: 'type',
            type: 'select',
            placeholder: '请选择事件类型',
            style: {
                width: '324px',
                fontSize: '14px',
                marginTop: '40px',
                marginLeft: '40px',
                height: '42px',
            },
        },
        {
            label: '空间',
            data: Array.from(SPACE_TYPE).map(itm => ({ text: itm[1], value: itm[0] })),
            inputName: 'space',
            type: 'chunk',
        },
        {
            label: '日期',
            inputName: 'date',
            type: 'datePicker',
            style: {
                width: '324px',
                fontSize: '14px',
                marginTop: '40px',
                marginLeft: '40px',
                height: '42px',
            },
        },
        {
            label: '时间',
            data: Array.from(TIME_TYPE).map(itm => ({ text: itm[1], value: itm[0] })),
            inputName: 'time',
            type: 'chunk',
        },
        // {
        //     label: '时间段',
        //     inputName: 'stepIndex',
        //     data: Array.from(TIME_RANGE).map((itm) => ({ text: itm[1], value: itm[0] })),
        //     type: 'select',
        //     show: true,
        //     style: {
        //         width: '324px',
        //         fontSize: '14px',
        //         marginTop: '40px',
        //         marginLeft: '40px',
        //         height: '42px',
        //     },
        // },
    ];
    const [searchData, setSearchData] = useState(defaultSearch);
    const tableColumn = () => {
        switch (spaceType) {
            case -1:
                return [
                    {
                        title: '地点名称',
                        key: 'roadName',
                        dataIndex: 'roadName',
                    },
                ];
            case 1:
                return [
                    {
                        title: '开始桩号',
                        dataIndex: 'startStake',
                        key: 'startStake',
                    },
                    {
                        title: '结束桩号',
                        dataIndex: 'endStake',
                        key: 'endStake',
                    },
                ];
            case 2:
                return [
                    {
                        title: '桩号',
                        dataIndex: 'stakeCode',
                        key: 'stakeCode',
                    },
                ];
        }
    };
    const columns = [
        {
            title: '排名',
            dataIndex: 'order',
            key: 'order',
            render: (text, record, index) => {
                const order = (pageParams.pageNo - 1) * pageParams.pageSize + (index + 1);
                switch (order) {
                    case 1:
                        return <span style={{ color: '#FF4B4B' }}>{order < 10 ? '0' + order : order}</span>;
                    case 2:
                        return <span style={{ color: '#FF8839' }}>{order < 10 ? '0' + order : order}</span>;
                    case 3:
                        return <span style={{ color: '#FFD35C' }}>{order < 10 ? '0' + order : order}</span>;
                    default:
                        return <span>{order < 10 ? '0' + order : order}</span>;
                }
            },
            width: 80,
        },
        ...tableColumn(),
        {
            title: '方向',
            dataIndex: 'roadDirNo',
            key: 'roadDirNo',
            render: text => DIRECTION.get(text),
        },
        {
            title: '事件类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '事件数量',
            dataIndex: 'eventCnt',
            key: 'eventCnt',
        },
    ];
    // console.log('steup')
    const handlerChunk = (item, type) => {
        if (type === 'direction') {
            setDirection(item.value);
        }
        else if (type === 'space') {
            setSpaceType(item.value);
        }
        else if (type === 'time') {
            setTimeLevel(item.value);
            if (item.value === 1 || item.value === 2) {
                setDateTime(moment().subtract(1, 'days'));
            }
            else {
                setDateTime(moment().subtract(1, 'months'));
            }
            if (item.value === 2) {
                setSearchData([
                    {
                        label: '事件类型',
                        data: Array.from(EVENT_TYPE).map(itm => ({ text: itm[1], value: itm[1] })),
                        inputName: 'type',
                        type: 'select',
                        placeholder: '请选择事件类型',
                        style: {
                            width: '324px',
                            fontSize: '14px',
                            marginTop: '40px',
                            marginLeft: '40px',
                            height: '42px',
                        },
                    },
                    {
                        label: '空间',
                        data: Array.from(SPACE_TYPE).map(itm => ({ text: itm[1], value: itm[0] })),
                        inputName: 'space',
                        type: 'chunk',
                    },
                    {
                        label: '日期',
                        inputName: 'date',
                        type: 'datePicker',
                        style: {
                            width: '324px',
                            fontSize: '14px',
                            marginTop: '40px',
                            marginLeft: '40px',
                            height: '42px',
                        },
                    },
                    {
                        label: '时间',
                        data: Array.from(TIME_TYPE).map(itm => ({ text: itm[1], value: itm[0] })),
                        inputName: 'time',
                        type: 'chunk',
                    },
                    {
                        label: '时间段',
                        inputName: 'stepIndex',
                        data: Array.from(TIME_RANGE).map(itm => ({ text: itm[1], value: itm[0] })),
                        type: 'select',
                        show: true,
                        style: {
                            width: '324px',
                            fontSize: '14px',
                            marginTop: '40px',
                            marginLeft: '40px',
                            height: '42px',
                        },
                    },
                ]);

            }
            else {
                setSearchData(defaultSearch);
            }
        }
        getRightType('B');
    };
    const chunkType = type => {
        if (type === 'direction') {
            return curDirection;
        }
        else if (type === 'space') {
            return spaceType;
        }
        else if (type === 'time') {
            return timeLevel;
        }
    };
    const handleSelectChange = (val, type) => {
        getRightType('B');
        if (type === 'type') {
            setEventType(val);
        }
        else if (type === 'stepIndex') {
            setTimeRange(val);
        }
    };
    const handlerDickerChange = (date, dateString, timeLevel) => {
        getRightType('B');
        setDateTime(date);
    };
    const paganationProps = {
        showTotal: (total, range) => `共 ${total} 条`,
    };
    const getPage = val => {
        setPageParams(val);
    };
    const getDataB = () => {
        let dateParams = '';
        const datetimeClone = datetime;
        if (timeLevel === 1 || timeLevel === 2) {
            dateParams = datetimeClone.format('YYYY-MM-DD');
        }
        else {
            dateParams = datetimeClone.format('YYYY-MM');
        }
        const params = {
            space: spaceType,
            time: timeLevel,
            type,
            datetime: dateParams,
            stepIndex: timeRange,
            ...pageParams,
        };
        eventPlaceList(params).then(res => {
            if (res.code === 0) {
                setDataSource(res.data.list);
                setTotal(res.data.total);
                getChild({
                    record: res.data.list[0] || {},
                    level: 'B',
                    timeLevel,
                    type,
                    spaceType,
                    datetime: dateParams,
                    timeRange,
                });
            }
        });
    };
    const handleRowClick = (record, index) => {
        console.log(record, index);
        let dateParams = '';
        if (timeLevel === 1 || timeLevel === 2) {
            dateParams = datetime.format('YYYY-MM-DD');
        }
        else {
            dateParams = datetime.format('YYYY-MM');
        }
        setRow(record.id);
        getRightType('B');
        getChild({
            record,
            level: 'B',
            timeLevel,
            type,
            spaceType,
            datetime: dateParams,
            timeRange,
        });
    };
    useEffect(() => {
        getDataB();
    }, [datetime, timeLevel, spaceType, pageParams, timeRange, type]);
    // useEffect(() => {
    //     getDataC()
    // }, []);
    return (
        <div className={Styles.TableModule}>
            <div className={Styles.title}>
                <span className={Styles.TitleLeft}></span>
                <span className={Styles.TitleText}>事件高发地排名</span>
            </div>
            <div className={Styles.form}>
                {searchData.map(item => {
                    switch (item.type) {
                        case 'select':
                            if (item.inputName === 'stepIndex') {
                                return (
                                    timeLevel === 2 && (
                                        <Select
                                            placeholder={item.placeholder}
                                            allowClear
                                            key={item.label + Date.now()}
                                            size="large"
                                            style={Object.assign({}, item.style)}
                                            disabled={item.disabled}
                                            value={timeRange}
                                            onChange={val => handleSelectChange(val, item.inputName)}
                                        >
                                            {item.data
                                                && item.data.length
                                                && item.data.map(itm => (
                                                    <Select.Option key={itm.value} value={itm.value}>
                                                        {itm.text}
                                                    </Select.Option>
                                                ))}
                                        </Select>
                                    )
                                );
                            }
                            return (
                                <Select
                                    placeholder={item.placeholder}
                                    allowClear
                                    key={item.label + Date.now()}
                                    size="large"
                                    value={item.inputName === 'type' ? type : timeRange}
                                    style={Object.assign({}, item.style)}
                                    disabled={item.disabled}
                                    onChange={val => handleSelectChange(val, item.inputName)}
                                >
                                    {item.data
                                        && item.data.length
                                        && item.data.map(itm => (
                                            <Select.Option key={itm.value} value={itm.value}>
                                                {itm.text}
                                            </Select.Option>
                                        ))}
                                </Select>
                            );
                        case 'datePicker':
                            return (
                                <DatePicker
                                    size="large"
                                    picker={timeLevel === -1 ? 'month' : ''}
                                    key={item.label + Date.now()}
                                    getPopupContainer={triggerNode => triggerNode}
                                    style={Object.assign({}, item.style)}
                                    disabled={item.disabled}
                                    value={datetime}
                                    onChange={(date, dateString) =>
                                        handlerDickerChange(date, dateString, timeLevel)
                                    }
                                />
                            );
                        case 'chunk':
                            return (
                                <div className={Styles.ChunkItem} key={item.label + Date.now()}>
                                    <span className={Styles.label}>{item.label}</span>
                                    <div className={Styles.chunk}>
                                        {item.data.map(itm => (
                                            <span
                                                className={[
                                                    Styles.ItemChunk,
                                                    chunkType(item.inputName) === itm.value ? Styles.active : '',
                                                ].join(' ')}
                                                key={itm.value}
                                                onClick={() => handlerChunk(itm, item.inputName)}
                                            >
                                                {itm.text}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                    }
                })}
            </div>
            <div className={Styles.TableArea}>
                <BaseTable
                    columns={columns}
                    data={dataSource}
                    paganationProps={paganationProps}
                    pageParams={pageParams}
                    getPage={getPage}
                    curRow={curRow}
                    total={total}
                    scroll={{ x: 647, y: 370 }}
                    onRow={(record, index) => {
                        return {
                            onClick: event => {
                                handleRowClick(record, index);
                            },
                        };
                    }}
                />
            </div>
        </div>
    );
};
export default React.memo(EventPlaceC);
