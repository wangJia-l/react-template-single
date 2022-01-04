import React, { useState, useEffect } from 'react';
import Styles from './UI.module.less';
import { Select, DatePicker, Table } from 'antd';
import BaseTable from './components/BaseTable';
import moment from 'moment';
import { DIRECTION, TIME_RANGE } from '../config';
const TableItem = props => {
    const {
        data,
        eventDateTime,
        eventPlaceList,
        eventTypeList,
        jamDateTime,
        jamWeekList,
        getChild,
        getDefaultData = () => {},
        getRightType,
    } = props;
    const { title, searchData, level } = data;
    // 路段
    const [roadName, setRoadName] = useState('容城东-雄安');
    // 事件类型
    const [type, setEventType] = useState('异常停车');
    // 方向
    const [curDirection, setDirection] = useState(-1);
    // 空间
    const [spaceType, setSpaceType] = useState(-1);
    // 时间
    const [timeLevel, setTimeLevel] = useState(-1);
    const [timeRange, setTimeRange] = useState(0);
    const [datetime, setDateTime] = useState(moment().subtract(1, 'months'));
    const [dataSource, setDataSource] = useState([]);
    const [pageParams, setPageParams] = useState({
        pageNo: 1,
        pageSize: 10,
    });
    const [total, setTotal] = useState(0);
    const [curRow, setRow] = useState('');
    let columns = null;
    if (level === 'A') {
        columns = [
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
            {
                title: '地点名称',
                dataIndex: 'roadName',
                key: 'roadName',
            },
            {
                title: '方向',
                dataIndex: 'roadDirNo',
                key: 'roadDirNo',
                render: text => DIRECTION.get(text),
            },
            {
                title: '拥堵指数',
                dataIndex: 'jamIndex',
                key: 'jamIndex',
            },
            {
                title: '周',
                dataIndex: 'week',
                key: 'week',
            },
        ];
    }
    else if (level === 'D') {
        columns = [
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
            {
                title: '地点名称',
                dataIndex: 'roadName',
                key: 'roadName',
            },
            {
                title: '方向',
                dataIndex: 'roadDirNo',
                key: 'roadDirNo',
                render: text => DIRECTION.get(text),
            },
            {
                title: '时间段',
                dataIndex: 'stepIndex',
                key: 'stepIndex',
                render: text => TIME_RANGE.get(text),
            },
            {
                title: '拥堵指数',
                dataIndex: 'jamIndex',
                key: 'jamIndex',
            },
        ];
    }
    else if (level === 'E') {
        columns = [
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
            {
                title: '地点名称',
                dataIndex: 'roadName',
                key: 'roadName',
            },
            {
                title: '方向',
                dataIndex: 'roadDirNo',
                key: 'roadDirNo',
                render: text => DIRECTION.get(text),
            },
            {
                title: '事件数量',
                dataIndex: 'eventCnt',
                key: 'eventCnt',
            },
            {
                title: '时间',
                dataIndex: 'stepIndex',
                key: 'stepIndex',
                render: text => TIME_RANGE.get(text),
            },
        ];
    }
    else if (level === 'F') {
        columns = [
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
            {
                title: '地点名称',
                dataIndex: 'roadName',
                key: 'roadName',
            },
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
    }
    const handlerChunk = (item, type) => {
        console.log(item, level);
        getRightType(level);
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
        }
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
        console.log(val, type, 'select');
        getRightType(level);
        if (type === 'roadName') {
            setRoadName(val);
        }
        else if (type === 'type') {
            setEventType(val);
        }
        else if (type === 'stepIndex') {
            setTimeRange(val);
        }
    };
    const handlerDickerChange = (date, dateString, timeLevel) => {
        setDateTime(date);
        getRightType(level);
    };
    const paganationProps = {
        showTotal: (total, range) => `共 ${total} 条`,
    };
    const getPage = val => {
        setPageParams(val);
    };
    const getDataE = () => {
        let dateParams = '';
        if (timeLevel === 1 || timeLevel === 2) {
            dateParams = datetime.format('YYYY-MM-DD');
        }
        else {
            dateParams = datetime.format('YYYY-MM');
        }
        const params = {
            roadName,
            time: timeLevel,
            type,
            datetime: dateParams,
            roadDirNo: curDirection,
            ...pageParams,
        };
        eventDateTime(params).then(res => {
            if (res.code === 0) {
                setDataSource(res.data.list);
                setTotal(res.data.total);
                // getDefaultData({
                //     record: res.data.list[0] || {},
                //     roadName,
                //     timeLevel,
                //     type,
                //     datetime: dateParams,
                //     curDirection,
                // });
                getChild({
                    record: res.data.list[0] || {},
                    level: 'E',
                    type,
                    timeLevel,
                    spaceType,
                    // datetime: level === 'A' ? record.datetime : dateParams,
                    datetime: dateParams,
                    curDirection,
                });
            }
        });
    };
    const getDataF = () => {
        let dateParams = '';
        if (timeLevel === 1 || timeLevel === 2) {
            dateParams = datetime.format('YYYY-MM-DD');
        }
        else {
            dateParams = datetime.format('YYYY-MM');
        }
        const params = {
            roadName,
            time: timeLevel,
            datetime: dateParams,
            roadDirNo: curDirection,
            ...pageParams,
        };
        eventTypeList(params).then(res => {
            if (res.code === 0) {
                setDataSource(res.data.list);
                setTotal(res.data.total);
                getChild({
                    record: res.data.list[0] || {},
                    level: 'F',
                    type: res.data.list[0] && res.data.list[0].type,
                    timeLevel,
                    spaceType,
                    datetime: dateParams,
                    curDirection,
                });
            }
        });
    };
    const getDataD = () => {
        let dateParams = '';
        if (timeLevel === 1 || timeLevel === 2) {
            dateParams = datetime.format('YYYY-MM-DD');
        }
        else {
            dateParams = datetime.format('YYYY-MM');
        }
        const params = {
            roadName,
            time: timeLevel,
            datetime: dateParams,
            roadDirNo: curDirection,
            ...pageParams,
        };
        jamDateTime(params).then(res => {
            setDataSource(res.data.list);
            setTotal(res.data.total);
            getChild({
                record: res.data.list[0] || {},
                level: 'D',
                type,
                timeLevel,
                spaceType,
                // datetime: level === 'A' ? record.datetime : dateParams,
                datetime: dateParams,
                curDirection,
            });
        });
    };
    const getDataA = () => {
        const params = {
            roadName,
            roadDirNo: curDirection,
            datetime: moment().format('YYYY-MM-DD'),
            ...pageParams,
        };
        jamWeekList(params).then(res => {
            setDataSource(res.data.list);
            setTotal(res.data.total);
            getChild({
                record: res.data.list[0] || {},
                level: 'A',
                // type,
                // timeLevel,
                // spaceType,
                // datetime: level === 'A' ? record.datetime : dateParams,
                datetime: moment().format('YYYY-MM-DD'),
                curDirection,
            });
        });
    };
    const handleRowClick = (record, index, level) => {
        console.log(record, index, level);
        getRightType(level);
        let dateParams = '';
        if (timeLevel === 1 || timeLevel === 2) {
            dateParams = datetime.format('YYYY-MM-DD');
        }
        else {
            dateParams = datetime.format('YYYY-MM');
        }
        setRow(record.id);
        if (level === 'F') {
            getChild({
                record,
                level,
                type: record.type,
                timeLevel,
                spaceType,
                datetime: dateParams,
                curDirection,
            });
        }
        else {
            getChild({
                record,
                level,
                type,
                timeLevel,
                spaceType,
                datetime: level === 'A' ? record.datetime : dateParams,
                curDirection,
            });
        }
    };
    useEffect(() => {
        if (level === 'D') {
            getDataD();
        }
        if (level === 'A') {
            getDataA();
        }
        if (level === 'E') {
            getDataE();
        }
        if (level === 'F') {
            getDataF();
        }
    }, [datetime, timeLevel, curDirection, spaceType, pageParams, roadName, type]);
    return (
        <div className={Styles.TableModule}>
            <div className={Styles.title}>
                <span className={Styles.TitleLeft}></span>
                <span className={Styles.TitleText}>{title}</span>
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
                                    size="large"
                                    value={item.inputName === 'roadName' ? roadName : type}
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
                            switch (timeLevel) {
                                case -1:
                                    return (
                                        <DatePicker
                                            size="large"
                                            picker="month"
                                            getPopupContainer={triggerNode => triggerNode}
                                            style={Object.assign({}, item.style)}
                                            disabled={item.disabled}
                                            value={datetime}
                                            onChange={(date, dateString) =>
                                                handlerDickerChange(date, dateString, timeLevel)
                                            }
                                        />
                                    );
                                case 1:
                                    return (
                                        <DatePicker
                                            size="large"
                                            style={Object.assign({}, item.style)}
                                            disabled={item.disabled}
                                            getPopupContainer={triggerNode => triggerNode}
                                            value={datetime}
                                            onChange={(date, dateString) =>
                                                handlerDickerChange(date, dateString, timeLevel)
                                            }
                                        />
                                    );
                                case 2:
                                    return (
                                        <DatePicker
                                            size="large"
                                            style={Object.assign({}, item.style)}
                                            disabled={item.disabled}
                                            getPopupContainer={triggerNode => triggerNode}
                                            value={datetime}
                                            onChange={(date, dateString) =>
                                                handlerDickerChange(date, dateString, timeLevel)
                                            }
                                        />
                                    );
                            }
                        case 'chunk':
                            return (
                                <div className={Styles.ChunkItem}>
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
                                handleRowClick(record, index, level);
                            },
                        };
                    }}
                />
            </div>
        </div>
    );
};
export default React.memo(TableItem);
