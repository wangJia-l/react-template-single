import React, { useState, useEffect } from 'react';
import Styles from '../TableItem/UI.module.less';
import { Select, DatePicker, Table } from 'antd';
import BaseTable from '../TableItem/components/BaseTable';
import moment from 'moment';
import { eventDateTime } from '../TableItem/api';
import { DIRECTION, TIME_RANGE, ROAD_SECTION, TIME1_TYPE, EVENT_TYPE } from '../config';
const EventTimeC = props => {
    const {
        getChild,
        getDefaultData = () => {},
        getRightType,
    } = props;
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
    let columns = [
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
    const searchData = [
        {
            label: '路段',
            data: Array.from(ROAD_SECTION).map(itm => ({ text: itm[1], value: itm[1] })),
            inputName: 'roadName',
            type: 'select',
            placeholder: '请选择路段',
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
            data: Array.from(TIME1_TYPE).map(itm => ({ text: itm[1], value: itm[0] })),
            inputName: 'time',
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
            label: '方向',
            data: Array.from(DIRECTION).map(itm => ({ text: itm[1], value: itm[0] })),
            inputName: 'direction',
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
                visibility: 'hidden',
            },
        },
        {
            label: '事件类型',
            data: Array.from(EVENT_TYPE).map(itm => ({ text: itm[1], value: itm[1] })),
            inputName: 'type',
            type: 'select',
            placeholder: '请选择事件类型',
            style: {
                width: '288px',
                fontSize: '14px',
                marginTop: '40px',
                marginLeft: '40px',
                height: '42px',
            },
        },
    ];
    const handlerChunk = (item, type) => {
        getRightType('E');
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
        getRightType('E');
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
        getRightType('E');
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
    const handleRowClick = (record, index) => {
        getRightType('E');
        let dateParams = '';
        if (timeLevel === 1 || timeLevel === 2) {
            dateParams = datetime.format('YYYY-MM-DD');
        }
        else {
            dateParams = datetime.format('YYYY-MM');
        }
        setRow(record.id);
        getChild({
            record,
            level: 'E',
            type,
            timeLevel,
            spaceType,
            datetime: dateParams,
            curDirection,
        });
    };
    useEffect(() => {
        getDataE();
    }, [datetime, timeLevel, curDirection, pageParams, roadName, type]);
    return (
        <div className={Styles.TableModule}>
            <div className={Styles.title}>
                <span className={Styles.TitleLeft}></span>
                <span className={Styles.TitleText}>事件高发时段排名</span>
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
                                handleRowClick(record, index);
                            },
                        };
                    }}
                />
            </div>
        </div>
    );
};
export default React.memo(EventTimeC);
