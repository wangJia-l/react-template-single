import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { message } from 'antd';
import _ from 'lodash';
import {
    ROAD_SECTION,
    DIRECTION,
    EVENT_TYPE,
    TIME1_TYPE,
    TIME_RANGE,
} from './config';
import { jamPlaceInfo, jamWeekInfo, jamDatetimeInfo, eventPlaceInfo, eventDatetimeInfo, eventTypeInfo } from './api';
import TableItem from './TableItem';
import JamPlace from './jamplace';
import EventPlace from './eventplace';
import JamTime from './jamtime';
import JamWeek from './jamweek';
import EventTime from './eventTime';
import EventTypeC from './eventType';
import BaseTable from './TableItem/components/BaseTable';
import EchartsC from './echartsC';
import * as $echarts from 'echarts';
import 'react-grid-layout/css/styles';
import 'react-resizable/css/styles';

import Styles from './UI.module.less';
import riseIcon from '@/assets/images/rise-icon.png';
import declineIcon from '@/assets/images/decline-icon.png';
import './UI.less';

const RankLinkageQuery = props => {
    const [total, setTotal] = useState(0);
    const [detail, setDetailData] = useState({
        spaceType: -1,
        timeLevel: -1,
    });
    const [detailC, setDetailC] = useState({
        spaceType: -1,
        timeLevel: -1,
    });
    const [detailD, setDetailD] = useState({
        spaceType: -1,
        timeLevel: -1,
    });
    const [detailA, setDetailA] = useState({
        spaceType: -1,
        timeLevel: -1,
    });
    const [detailB, setDetailB] = useState({});
    const [detailE, setDetailE] = useState({
        spaceType: -1,
        timeLevel: -1,
    });
    const [detailF, setDetailF] = useState({
        spaceType: -1,
        timeLevel: -1,
    });
    const [brokenLineOptions, setBrokenLineOptions] = useState({});
    const [rightType, setRightType] = useState('C');
    const [historyData, setHistoryData] = useState([]);
    const [xData, setXdata] = useState([]);
    const [yData, setYdata] = useState([]);
    const [pageParams, setPageParams] = useState({
        pageNo: 1,
        pageSize: 10,
    });
    const [cardData, setCardData] = useState([
        // {
        //     title: '拥堵高发时段排名',
        //     level: 'D',
        //     searchData: [
        //         {
        //             label: '路段',
        //             data: Array.from(ROAD_SECTION).map(itm => ({ text: itm[1], value: itm[1] })),
        //             inputName: 'roadName',
        //             type: 'select',
        //             placeholder: '请选择路段',
        //             style: {
        //                 width: '324px',
        //                 fontSize: '14px',
        //                 marginTop: '40px',
        //                 marginLeft: '40px',
        //                 height: '42px',
        //             },
        //         },
        //         {
        //             label: '时间',
        //             data: Array.from(TIME1_TYPE).map(itm => ({ text: itm[1], value: itm[0] })),
        //             inputName: 'time',
        //             type: 'chunk',
        //         },
        //         {
        //             label: '日期',
        //             inputName: 'date',
        //             type: 'datePicker',
        //             style: {
        //                 width: '324px',
        //                 fontSize: '14px',
        //                 marginTop: '40px',
        //                 marginLeft: '40px',
        //                 height: '42px',
        //             },
        //         },
        //         {
        //             label: '方向',
        //             data: Array.from(DIRECTION).map(itm => ({ text: itm[1], value: itm[0] })),
        //             inputName: 'direction',
        //             type: 'chunk',
        //         },
        //     ],
        // },
        // {
        //     title: '拥堵高发周排期',
        //     level: 'A',
        //     searchData: [
        //         {
        //             label: '路段',
        //             data: Array.from(ROAD_SECTION).map(itm => ({ text: itm[1], value: itm[1] })),
        //             inputName: 'roadName',
        //             type: 'select',
        //             placeholder: '请选择路段',
        //             style: {
        //                 width: '324px',
        //                 fontSize: '14px',
        //                 marginTop: '40px',
        //                 marginLeft: '40px',
        //                 height: '42px',
        //             },
        //         },
        //         {
        //             label: '方向',
        //             data: Array.from(DIRECTION).map(itm => ({ text: itm[1], value: itm[0] })),
        //             inputName: 'direction',
        //             type: 'chunk',
        //         },
        //     ],
        // },
        // {
        //     title: '事件高发时段排名',
        //     level: 'E',
        //     searchData: [
        //         {
        //             label: '路段',
        //             data: Array.from(ROAD_SECTION).map(itm => ({ text: itm[1], value: itm[1] })),
        //             inputName: 'roadName',
        //             type: 'select',
        //             placeholder: '请选择路段',
        //             style: {
        //                 width: '324px',
        //                 fontSize: '14px',
        //                 marginTop: '40px',
        //                 marginLeft: '40px',
        //                 height: '42px',
        //             },
        //         },
        //         {
        //             label: '时间',
        //             data: Array.from(TIME1_TYPE).map(itm => ({ text: itm[1], value: itm[0] })),
        //             inputName: 'time',
        //             type: 'chunk',
        //         },
        //         {
        //             label: '日期',
        //             inputName: 'date',
        //             type: 'datePicker',
        //             style: {
        //                 width: '324px',
        //                 fontSize: '14px',
        //                 marginTop: '40px',
        //                 marginLeft: '40px',
        //                 height: '42px',
        //             },
        //         },
        //         {
        //             label: '方向',
        //             data: Array.from(DIRECTION).map(itm => ({ text: itm[1], value: itm[0] })),
        //             inputName: 'direction',
        //             type: 'chunk',
        //         },
        //         {
        //             label: '日期',
        //             inputName: 'date',
        //             type: 'datePicker',
        //             style: {
        //                 width: '324px',
        //                 fontSize: '14px',
        //                 marginTop: '40px',
        //                 marginLeft: '40px',
        //                 height: '42px',
        //                 visibility: 'hidden',
        //             },
        //         },
        //         {
        //             label: '事件类型',
        //             data: Array.from(EVENT_TYPE).map(itm => ({ text: itm[1], value: itm[1] })),
        //             inputName: 'type',
        //             type: 'select',
        //             placeholder: '请选择事件类型',
        //             style: {
        //                 width: '288px',
        //                 fontSize: '14px',
        //                 marginTop: '40px',
        //                 marginLeft: '40px',
        //                 height: '42px',
        //             },
        //         },
        //     ],
        // },
        {
            title: '事件高发类型排名',
            level: 'F',
            searchData: [
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
            ],
        },
    ]);
    let timeColumn = [];
    if (detail.timeLevel === -1) {
        timeColumn = [
            {
                title: '月份',
                dataIndex: 'datetime',
                key: 'datetime',
            },
        ];
    } else if (detail.timeLevel === 1) {
        timeColumn = [
            {
                title: '日期',
                dataIndex: 'datetime',
                key: 'datetime',
            },
        ];
    } else if (detail.timeLevel === 2) {
        timeColumn = [
            {
                title: '时段',
                dataIndex: 'stepIndex',
                key: 'stepIndex',
                render: text => TIME_RANGE.get(text),
            },
            {
                title: '日期',
                dataIndex: 'datetime',
                key: 'datetime',
            },
        ];
    }
    let nameColumn = [];
    if (detail.spaceType === -1) {
        nameColumn = [
            {
                title: '名称',
                dataIndex: 'roadName',
                key: 'roadName',
            },
        ];
    } else if (detail.spaceType === 1) {
        nameColumn = [
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
    } else if (detail.spaceType === 2) {
        nameColumn = [
            {
                title: '桩号',
                dataIndex: 'stakeCode',
                key: 'stakeCode',
            },
        ];
    }
    let HistoryColumns = [];
    if (rightType === 'C') {
        HistoryColumns = [
            {
                title: '序号',
                dataIndex: 'order',
                key: 'order',
                render: (text, record, index) => {
                    const order = (pageParams.pageNo - 1) * pageParams.pageSize + (index + 1);
                    return <span>{order < 10 ? '0' + order : order}</span>;
                },
                width: 80,
            },
            ...nameColumn,
            {
                title: '方向',
                dataIndex: 'roadDirNo',
                key: 'roadDirNo',
                render: text => DIRECTION.get(text),
            },
            ...timeColumn,
            {
                title: '拥堵指数',
                key: 'jamIndex',
                dataIndex: 'jamIndex',
            },
            {
                title: '环比变化',
                key: 'ringRatio',
                dataIndex: 'ringRatio',
                render: text => {
                    if (text > 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{text}%</span>
                                <img className="tip-icon" src={riseIcon} alt="" />
                            </div>
                        );
                    }
                    else if (text < 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{Math.abs(text)}%</span>
                                <img className="tip-icon" src={declineIcon} alt="" />
                            </div>
                        );
                    }
                    return <div>0%</div>;
                },
            },
        ];
    }
    else if (rightType === 'D') {
        HistoryColumns = [
            {
                title: '序号',
                dataIndex: 'order',
                key: 'order',
                render: (text, record, index) => {
                    const order = (pageParams.pageNo - 1) * pageParams.pageSize + (index + 1);
                    return <span>{order < 10 ? '0' + order : order}</span>;
                },
                width: 80,
            },
            {
                title: '名称',
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
            ...timeColumn,
            {
                title: '拥堵指数',
                key: 'jamIndex',
                dataIndex: 'jamIndex',
            },
            {
                title: '环比变化',
                key: 'ringRatio',
                dataIndex: 'ringRatio',
                render: text => {
                    if (text > 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{text}%</span>
                                <img className="tip-icon" src={riseIcon} alt="" />
                            </div>
                        );
                    }
                    else if (text < 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{Math.abs(text)}%</span>
                                <img className="tip-icon" src={declineIcon} alt="" />
                            </div>
                        );
                    }
                    return <div>0%</div>;
                },
            },
        ];
    }
    else if (rightType === 'A') {
        HistoryColumns = [
            {
                title: '序号',
                dataIndex: 'order',
                key: 'order',
                render: (text, record, index) => {
                    const order = (pageParams.pageNo - 1) * pageParams.pageSize + (index + 1);
                    return <span>{order < 10 ? '0' + order : order}</span>;
                },
                width: 80,
            },
            {
                title: '名称',
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
                title: '日期',
                dataIndex: 'datetime',
                key: 'datetime',
            },
            {
                title: '拥堵指数',
                key: 'jamIndex',
                dataIndex: 'jamIndex',
            },
            {
                title: '环比变化',
                key: 'ringRatio',
                dataIndex: 'ringRatio',
                render: text => {
                    if (text > 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{text}%</span>
                                <img className="tip-icon" src={riseIcon} alt="" />
                            </div>
                        );
                    }
                    else if (text < 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{Math.abs(text)}%</span>
                                <img className="tip-icon" src={declineIcon} alt="" />
                            </div>
                        );
                    }
                    return <div>0%</div>;
                },
            },
        ];
    }
    else if (rightType === 'B') {
        HistoryColumns = [
            {
                title: '序号',
                dataIndex: 'order',
                key: 'order',
                render: (text, record, index) => {
                    const order = (pageParams.pageNo - 1) * pageParams.pageSize + (index + 1);
                    return <span>{order < 10 ? '0' + order : order}</span>;
                },
                width: 80,
            },
            ...nameColumn,
            {
                title: '方向',
                dataIndex: 'roadDirNo',
                key: 'roadDirNo',
                render: text => DIRECTION.get(text),
            },
            ...timeColumn,
            {
                title: '事件数量',
                key: 'eventCnt',
                dataIndex: 'eventCnt',
            },
            {
                title: '环比变化',
                key: 'ringRatio',
                dataIndex: 'ringRatio',
                render: text => {
                    if (text > 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{text}%</span>
                                <img className="tip-icon" src={riseIcon} alt="" />
                            </div>
                        );
                    }
                    else if (text < 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{Math.abs(text)}%</span>
                                <img className="tip-icon" src={declineIcon} alt="" />
                            </div>
                        );
                    }
                    return <div>0%</div>;
                },
            },
        ];
    }
    else if (rightType === 'E') {
        HistoryColumns = [
            {
                title: '序号',
                dataIndex: 'order',
                key: 'order',
                render: (text, record, index) => {
                    const order = (pageParams.pageNo - 1) * pageParams.pageSize + (index + 1);
                    return <span>{order < 10 ? '0' + order : order}</span>;
                },
                width: 80,
            },
            {
                title: '名称',
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
            ...timeColumn,
            {
                title: '事件数量',
                key: 'eventCnt',
                dataIndex: 'eventCnt',
            },
            {
                title: '环比变化',
                key: 'ringRatio',
                dataIndex: 'ringRatio',
                render: text => {
                    if (text > 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{text}%</span>
                                <img className="tip-icon" src={riseIcon} alt="" />
                            </div>
                        );
                    }
                    else if (text < 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{Math.abs(text)}%</span>
                                <img className="tip-icon" src={declineIcon} alt="" />
                            </div>
                        );
                    }
                    return <div>0%</div>;
                },
            },
        ];
    } else if (rightType === 'F') {
        HistoryColumns = [
            {
                title: '序号',
                dataIndex: 'order',
                key: 'order',
                render: (text, record, index) => {
                    const order = (pageParams.pageNo - 1) * pageParams.pageSize + (index + 1);
                    return <span>{order < 10 ? '0' + order : order}</span>;
                },
            },
            {
                title: '名称',
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
            ...timeColumn,
            {
                title: '事件数量',
                key: 'eventCnt',
                dataIndex: 'eventCnt',
            },
            {
                title: '环比变化',
                key: 'ringRatio',
                dataIndex: 'ringRatio',
                render: text => {
                    if (text > 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{text}%</span>
                                <img className="tip-icon" src={riseIcon} alt="" />
                            </div>
                        );
                    }
                    else if (text < 0) {
                        return (
                            <div style={{ display: 'flex' }}>
                                <span>{Math.abs(text)}%</span>
                                <img className="tip-icon" src={declineIcon} alt="" />
                            </div>
                        );
                    }
                    return <div>0%</div>;
                },
            },
        ];
    }
    const paganationProps = {
        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
        showQuickJumper: true,
    };
    const transformTime = val => {
        const res = Array.from(TIME_RANGE).filter(item => item[0] === val);
        if (res) {
            return res[0][1];
        }
    };
    const rightTitle = () => {
        const { record } = detail;
        if (!record) {
            return;
        }
        if (rightType === 'C') {
            const { record } = detailC;
            if (!record) {
                return '暂无数据';
            }
            switch (detail.spaceType) {
                case -1:
                    return record.roadName ? `${record.roadName}拥堵指数历史折线图` : '暂无数据';
                case 1:
                    return record.startStake ? `${record.startStake}-${record.endStake}拥堵指数历史折线图` : '暂无数据';
                case 2:
                    return record.stakeCode ? `${record.stakeCode}拥堵指数历史折线图` : '暂无数据';
            }
        } else if (rightType === 'D') {
            const { record } = detailD;
            if (!record) {
                return '暂无数据';
            }
            return record.stepIndex ? `${record.roadName} ${transformTime(record.stepIndex)}拥堵指数历史折线图` : '暂无数据';
        } else if (rightType === 'A') {
            const { record } = detailA;
            if (!record) {
                return '暂无数据';
            }
            return record.roadName ? `${record.roadName} ${record.week}拥堵指数历史折线图` : '暂无数据';
        } else if (rightType === 'B') {
            const { record } = detailB;
            if (!record) {
                return '暂无数据';
            }
            switch (detailB.spaceType) {
                case -1:
                    return record.roadName ? `${record.roadName}${record.type}历史折线图` : '暂无数据';
                case 1:
                    return record.startStake ? `${record.startStake}-${record.endStake}${record.type}历史折线图` : '暂无数据';
                case 2:
                    return record.stakeCode ? `${record.stakeCode}${record.type}历史折线图` : '暂无数据';
            }
        } else if (rightType === 'E') {
            const { record } = detailE;
            if (!record) {
                return '暂无数据';
            }
            return record.roadName
                ? `${record.roadName} ${transformTime(record.stepIndex)}${detail.type}历史折线图` : '暂无数据';
        } else if (rightType === 'F') {
            const { record } = detailF;
            if (!record) {
                return '暂无数据';
            }
            return record.roadName ? `${record.roadName} ${detail.type}历史折线图` : '暂无数据';
        }
    };
    const yName = () => {
        if (rightType === 'C' || rightType === 'A' || rightType === 'D') {
            return '拥堵指数';
        }
        return '事件数量';
    };
    let xName = '';
    if (rightType === 'A') {
        xName = '月份';
    }
    if (detail.timeLevel === -1) {
        xName = '月份';
    } else if (detail.timeLevel === 1) {
        xName = '日期';
    } else if (detail.timeLevel === 2) {
        xName = '时间';
    }
    let BrokenLineOptions = {
        legend: {
            show: false,
            right: '10%',
            top: '10%',
            itemGap: 20,
            itemWidth: 15,
            itemHeight: 10,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                label: {
                    show: false,
                },
                lineStyle: {
                    width: 0,
                },
            },
            backgroundColor: '#2C78C8',
            textStyle: {
                color: '#A5C7FF',
                padding: 10,
            },
            formatter: '{b0}<br />{a}: {c}',
        },
        grid: {
            top: '15%',
        },
        xAxis: [
            {
                type: 'category',
                name: `${xName}`,
                nameTextStyle: {
                    color: '#334B78',
                    fontSize: 14,
                },
                data: xData,
                axisLine: {
                    lineStyle: {
                        color: '#1F2B42',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#7B97CB',
                    },
                    // 默认x轴字体大小
                    fontSize: 14,
                    align: 'left',
                    // margin:文字到x轴的距离
                },
                boundaryGap: false,
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#1F2B42',
                    },
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
                name: `${yName()}`,
                scale: true,
                nameTextStyle: {
                    color: '#334B78',
                    fontSize: 14,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#1F2B42',
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: '#7B97CB',
                    },
                    fontSize: 16,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'solid',
                        color: '#1F2B42',
                    },
                },
            },
        ],
        series: [
            {
                name: `${yName()}`,
                type: 'line',
                data: yData,
                symbolSize: 1,
                symbol: 'emptyCircle',
                smooth: true,
                yAxisIndex: 0,
                showSymbol: false,
                lineStyle: {
                    width: 1.4,
                    color: '#00FFDA',
                },
                itemStyle: {
                    normal: {
                        color: '#00FFDA',
                        borderColor: '#00FFDA',
                    },
                },
                areaStyle: {
                    normal: {
                        color: new $echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: 'rgba(0,255,218,1)',
                                },
                                {
                                    offset: 0.24,
                                    color: 'rgba(0,255,218,0.24)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(0,255,218,0)',
                                },
                            ],
                            false
                        ),
                    },
                },
            },
        ],
    };
    const getPage = val => {
        setPageParams(val);
    };
    // 由于右侧图表和历史数据表格更新机制不同， 需要调用详情接口两次（后续优化）
    const getHistoryData = params => {
        jamPlaceInfo(params).then(res => {
            console.log(res);
            let result = res.data ? res.data.list : [];
            if (params.time === 2) {
                result = res.data ? res.data.list.sort((a, b) => a.stepIndex - b.stepIndex) : [];
            }
            setTotal(res.data.total);
            const cloneData = [...result];
            setHistoryData(cloneData);
        }).catch(error => {
            if (error) {
                console.log(error);
                setTotal(0);
                setHistoryData([]);
            }
        });
    };
    const getChartData = params => {
        jamPlaceInfo(params).then(res => {
            let result = res.data ? res.data.list : [];
            let xData = result.map(item => item.datetime.slice(5)).sort((a, b) => a - b);
            let yData = result.map(item => item.jamIndex);
            if (params.time === 2) {
                xData = result.map(item => item.datetime.slice(5) + '\n' + transformTime(item.stepIndex));
            }
            setXdata(xData);
            setYdata(yData);
        }).catch(error => {
            if (error) {
                setXdata([]);
                setYdata([]);
            }
        });
    };
    const getHistoryDataD = params => {
        jamDatetimeInfo(params).then(res => {
            let result = res.data ? res.data.list : [];
            const cloneData = [...result];
            setHistoryData(cloneData);
            setTotal(res.data.total);
        }).catch(error => {
            setHistoryData([]);
            setTotal(0);
        });
    };
    const getChartDataD = params => {
        jamDatetimeInfo(params).then(res => {
            let result = res.data ? res.data.list : [];
            let xData = result.map(item => item.datetime.slice(5));
            let yData = result.map(item => item.jamIndex);
            setXdata(xData);
            setYdata(yData);
        }).catch(error => {
            setXdata([]);
            setYdata([]);
        });
    };
    const getHistoryDataA = params => {
        jamWeekInfo(params).then(res => {
            console.log(res, 'A');
            let result = res.data ? res.data.list : [];
            const cloneData = [...result];
            setHistoryData(cloneData);
            setTotal(res.data.total);
        }).catch(error => {
            setHistoryData([]);
            setTotal(0);
        });
    };
    const getChartDataA = params => {
        jamWeekInfo(params).then(res => {
            console.log(res, 'A');
            let result = res.data ? res.data.list : [];
            let xData = result.map(item => item.datetime.slice(5));
            let yData = result.map(item => item.jamIndex);
            setXdata(xData);
            setYdata(yData);
        }).catch(error => {
            setXdata([]);
            setYdata([]);
        });
    };
    const getHistoryDataB = params => {
        eventPlaceInfo(params).then(res => {
            let result = res.data ? res.data.list : [];
            if (params.time === 2) {
                result = res.data ? res.data.list.sort((a, b) => a.stepIndex - b.stepIndex) : [];
            }
            setTotal(res.data.total);
            const cloneData = [...result];
            setHistoryData(cloneData);
        }).catch(error => {
            setTotal(0);
            setHistoryData([]);
        });
    };
    const getChartDataB = params => {
        eventPlaceInfo(params).then(res => {
            let result = res.data ? res.data.list : [];
            let xData = result.map(item => item.datetime.slice(5));
            let yData = result.map(item => item.eventCnt);
            if (params.time === 2) {
                xData = result.map(item => item.datetime.slice(5) + '\n' + transformTime(item.stepIndex));
            }
            setXdata(xData);
            setYdata(yData);
        }).catch(error => {
            setXdata([]);
            setYdata([]);
        });
    };
    const getHistoryDataE = params => {
        eventDatetimeInfo(params).then(res => {
            let result = res.data ? res.data.list : [];
            const cloneData = [...result];
            setHistoryData(cloneData);
            setTotal(res.data.total);
        }).catch(error => {
            setHistoryData([]);
            setTotal(0);
        });
    };
    const getChartDataE = params => {
        eventDatetimeInfo(params).then(res => {
            let result = res.data ? res.data.list : [];
            let xData = result.map(item => item.datetime.slice(5));
            let yData = result.map(item => item.eventCnt);
            setXdata(xData);
            setYdata(yData);
        }).catch(error => {
            setXdata([]);
            setYdata([]);
        });
    };
    const getHistoryDataF = params => {
        eventTypeInfo(params).then(res => {
            console.log(res);
            let result = res.data ? res.data.list : [];
            const cloneData = [...result];
            setHistoryData(cloneData);
            setTotal(res.data.total);
        }).catch(error => {
            setHistoryData([]);
            setTotal(0);
        });
    };
    const getChartDataF = params => {
        eventTypeInfo(params).then(res => {
            console.log(res);
            let result = res.data ? res.data.list : [];
            let xData = result.map(item => item.datetime.slice(5));
            let yData = result.map(item => item.eventCnt);
            setXdata(xData);
            setYdata(yData);
        }).catch(error => {
            setXdata([]);
            setYdata([]);
        });
    };
    const getRightType = val => {
        console.log(val, 'right');
        setRightType(val);
    };
    const getChildB = val => {
        console.log(val);
        setDetailData(val);
        setDetailB(val);
        // if (rightType === 'C') {
        //     setDetailData(val);
        // }
        // if (val.level) {
        //     setCardType(val.level);
        // }
    };
    const getChildD = val => {
        console.log(val, rightType, 'val');
        setDetailData(val);
        setDetailD(val);
    };
    // useEffect(() => {

    // }, [rightType]);
    const getChildA = val => {
        console.log(val);
        setDetailData(val);
        setDetailA(val);
    };
    const getChildE = val => {
        setDetailData(val);
        setDetailE(val);
    };
    const getChildF = val => {
        setDetailData(val);
        setDetailF(val);
    };
    const getChildC = val => {
        console.log(val);
        setDetailData(val);
        if (rightType === 'C') {
            setDetailC(val);
        }
    };
    const getDefaultData = val => {
        // setCardType(val.level);
        setDetailData(val);
        setDetailC(val);
    };
    useEffect(() => {
        setBrokenLineOptions(BrokenLineOptions);
        console.log(xName);
    }, [detail, rightType, xData, yData]);
    // useEffect(() => {
    //     setBrokenLineOptions(BrokenLineOptions);
    //     console.log(xName);
    // }, [detailD, rightType, xData, yData]);
    // useEffect(() => {
    //     setBrokenLineOptions(BrokenLineOptions);
    //     console.log(xName);
    // }, [detailA, rightType, xData, yData]);
    // useEffect(() => {
    //     setBrokenLineOptions(BrokenLineOptions);
    //     console.log(xName);
    // }, [detailB, rightType, xData, yData]);
    // useEffect(() => {
    //     setBrokenLineOptions(BrokenLineOptions);
    //     console.log(xName);
    // }, [detailE, rightType, xData, yData]);
    // useEffect(() => {
    //     setBrokenLineOptions(BrokenLineOptions);
    //     console.log(xName);
    // }, [detailF, rightType, xData, yData]);
    useEffect(() => {
        if (!detailD.record) {
            return;
        }
        const { timeLevel, datetime } = detailD;
        const { roadDirNo, roadName, stepIndex } = detailD.record;
        if (rightType === 'D') {
            getHistoryDataD({
                time: timeLevel,
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime: datetime,
                stepIndex: stepIndex,
                ...pageParams,
                sort: -1,
            });
        }
    }, [pageParams, detailD]);
    useEffect(() => {
        if (!detailA.record) {
            return;
        }
        const { datetime } = detailA;
        const { roadDirNo, roadName } = detailA.record;
        if (rightType === 'A') {
            getHistoryDataA({
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime,
                ...pageParams,
                sort: -1,
            });
        }
    }, [pageParams, detailA]);
    useEffect(() => {
        if (!detailB.record) {
            return;
        }
        const { spaceType, timeLevel, datetime, timeRange } = detailB;
        const { roadDirNo, roadName, startStake, endStake, stakeCode, stepIndex, type } = detailB.record;
        if (rightType === 'B') {
            const params = {
                space: spaceType,
                time: timeLevel,
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime: datetime,
                startStake: startStake,
                endStake: endStake,
                stakeCode: stakeCode,
                type: type,
                stepIndex: timeRange,
            };
            getHistoryDataB({
                ...params,
                ...pageParams,
                sort: -1,
            });
        }
    }, [pageParams, detailB]);
    useEffect(() => {
        if (!detailE.record) {
            return;
        }
        const { timeLevel, datetime } = detailE;
        const { roadDirNo, roadName, stepIndex } = detailE.record;
        if (rightType === 'E') {
            getHistoryDataE({
                time: timeLevel,
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime: datetime,
                stepIndex: stepIndex,
                type: detail.type,
                ...pageParams,
                sort: -1,
            });
        }
    }, [pageParams, detailE]);
    useEffect(() => {
        if (!detailC.record) {
            return;
        }
        const { spaceType, timeLevel, datetime } = detailC;
        const { roadDirNo, roadName, startStake, endStake, stakeCode } = detailC.record;
        if (rightType === 'C') {
            const params = {
                space: spaceType,
                time: timeLevel,
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime: datetime,
                startStake: startStake,
                endStake: endStake,
                stakeCode: stakeCode,

            };
            getHistoryData({
                ...params,
                ...pageParams,
                sort: -1,
            });
        }
    }, [pageParams, detailC]);
    useEffect(() => {
        if (!detailF.record) {
            return;
        }
        const { timeLevel, datetime } = detailF;
        const { roadDirNo, roadName } = detailF.record;
        if (rightType === 'F') {
            getHistoryDataF({
                time: timeLevel,
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime: datetime,
                type: detail.type,
                ...pageParams,
                sort: -1,
            });
        }
    }, [pageParams, detailF]);
    useEffect(() => {
        if (!detailC.record) {
            return;
        }
        const { spaceType, timeLevel, datetime } = detailC;
        const { roadDirNo, roadName, startStake, endStake, stakeCode } = detailC.record;
        if (rightType === 'C') {
            const params = {
                space: spaceType,
                time: timeLevel,
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime: datetime,
                startStake: startStake,
                endStake: endStake,
                stakeCode: stakeCode,
            };
            getChartData({
                ...params,
                pageNo: 1,
                pageSize: 30,
                sort: 1,
            });
        }

    }, [detailC]);
    useEffect(() => {
        if (!detailD.record) {
            return;
        }
        const { timeLevel, datetime } = detailD;
        const { roadDirNo, roadName, stepIndex } = detailD.record;
        if (rightType === 'D') {
            getChartDataD({
                time: timeLevel,
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime: datetime,
                stepIndex: stepIndex,
                pageNo: 1,
                pageSize: 30,
                sort: 1,
            });
        }

    }, [detailD]);
    useEffect(() => {
        if (!detailA.record) {
            return;
        }
        const { datetime } = detailA;
        const { roadDirNo, roadName } = detailA.record;
        if (rightType === 'A') {
            getChartDataA({
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime,
                pageNo: 1,
                pageSize: 30,
                sort: 1,
            });
        }
    }, [detailA]);
    useEffect(() => {
        if (!detailB.record) {
            return;
        }
        const { spaceType, timeLevel, datetime, timeRange } = detailB;
        const { roadDirNo, roadName, startStake, endStake, stakeCode, stepIndex, type } = detailB.record;
        if (rightType === 'B') {
            getChartDataB({
                space: spaceType,
                time: timeLevel,
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime: datetime,
                startStake: startStake,
                endStake: endStake,
                stakeCode: stakeCode,
                type: type,
                stepIndex: timeRange,
                pageNo: 1,
                pageSize: 30,
                sort: 1,
            });
        }

    }, [detailB]);
    useEffect(() => {
        if (!detailE.record) {
            return;
        }
        const { timeLevel, datetime } = detailE;
        const { roadDirNo, roadName, stepIndex } = detailE.record;
        if (rightType === 'E') {
            getChartDataE({
                time: timeLevel,
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime: datetime,
                stepIndex: stepIndex,
                type: detail.type,
                pageNo: 1,
                pageSize: 30,
                sort: 1,
            });
        }

    }, [detailE]);
    useEffect(() => {
        if (!detailF.record) {
            return;
        }
        const { timeLevel, datetime } = detailF;
        const { roadDirNo, roadName } = detailF.record;
        if (rightType === 'F') {
            getChartDataF({
                time: timeLevel,
                roadDirNo: roadDirNo,
                roadName: roadName,
                datetime: datetime,
                type: detail.type,
                pageNo: 1,
                pageSize: 30,
                sort: 1,
            });
        }

    }, [detailF]);
    return (
        <div className={Styles.content}>
            <div className={Styles.ContentLeft}>
                <JamPlace getChild={getChildC} getDefaultData={getDefaultData} getRightType={getRightType} />
                <JamTime getChild={getChildD} getRightType={getRightType} />
                <JamWeek getChild={getChildA} getRightType={getRightType} />
                <EventPlace getChild={getChildB} getRightType={getRightType} />
                <EventTime getChild={getChildE} getRightType={getRightType} />
                <EventTypeC getChild={getChildF} getRightType={getRightType} />
            </div>
            {
                rightType === 'C'
                && (
                    <div className={Styles.ContentRight}>
                        <div className={Styles.right}>
                            <span className={Styles.TitleLeft}></span>
                            <span className={Styles.TitleText}>{rightTitle()}</span>
                        </div>
                        <div className={Styles.charts}>
                            <EchartsC options={BrokenLineOptions} />
                        </div>
                        <div className={Styles.RightTableBox}>
                            <div className={Styles.TableTitle}>
                                <span className={Styles.TitleLeft}></span>
                                <span className={Styles.TitleText}>历史数据</span>
                            </div>
                            <div className={Styles.table}>
                                <BaseTable
                                    columns={HistoryColumns}
                                    data={historyData}
                                    paganationProps={paganationProps}
                                    total={total}
                                    pageParams={pageParams}
                                    getPage={getPage}
                                    scroll={{ x: 1099, y: 370 }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                rightType === 'D'
                && (
                    <div className={Styles.ContentRight}>
                        <div className={Styles.right}>
                            <span className={Styles.TitleLeft}></span>
                            <span className={Styles.TitleText}>{rightTitle()}</span>
                        </div>
                        <div className={Styles.charts}>
                            <EchartsC options={BrokenLineOptions} />
                        </div>
                        <div className={Styles.RightTableBox}>
                            <div className={Styles.TableTitle}>
                                <span className={Styles.TitleLeft}></span>
                                <span className={Styles.TitleText}>历史数据</span>
                            </div>
                            <div className={Styles.table}>
                                <BaseTable
                                    columns={HistoryColumns}
                                    data={historyData}
                                    paganationProps={paganationProps}
                                    total={total}
                                    pageParams={pageParams}
                                    getPage={getPage}
                                    scroll={{ x: 1099, y: 370 }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                rightType === 'A'
                && (
                    <div className={Styles.ContentRight}>
                        <div className={Styles.right}>
                            <span className={Styles.TitleLeft}></span>
                            <span className={Styles.TitleText}>{rightTitle()}</span>
                        </div>
                        <div className={Styles.charts}>
                            <EchartsC options={BrokenLineOptions} />
                        </div>
                        <div className={Styles.RightTableBox}>
                            <div className={Styles.TableTitle}>
                                <span className={Styles.TitleLeft}></span>
                                <span className={Styles.TitleText}>历史数据</span>
                            </div>
                            <div className={Styles.table}>
                                <BaseTable
                                    columns={HistoryColumns}
                                    data={historyData}
                                    paganationProps={paganationProps}
                                    total={total}
                                    pageParams={pageParams}
                                    getPage={getPage}
                                    scroll={{ x: 1099, y: 370 }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                rightType === 'B'
                && (
                    <div className={Styles.ContentRight}>
                        <div className={Styles.right}>
                            <span className={Styles.TitleLeft}></span>
                            <span className={Styles.TitleText}>{rightTitle()}</span>
                        </div>
                        <div className={Styles.charts}>
                            <EchartsC options={BrokenLineOptions} />
                        </div>
                        <div className={Styles.RightTableBox}>
                            <div className={Styles.TableTitle}>
                                <span className={Styles.TitleLeft}></span>
                                <span className={Styles.TitleText}>历史数据</span>
                            </div>
                            <div className={Styles.table}>
                                <BaseTable
                                    columns={HistoryColumns}
                                    data={historyData}
                                    paganationProps={paganationProps}
                                    total={total}
                                    pageParams={pageParams}
                                    getPage={getPage}
                                    scroll={{ x: 1099, y: 370 }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                rightType === 'E'
                && (
                    <div className={Styles.ContentRight}>
                        <div className={Styles.right}>
                            <span className={Styles.TitleLeft}></span>
                            <span className={Styles.TitleText}>{rightTitle()}</span>
                        </div>
                        <div className={Styles.charts}>
                            <EchartsC options={BrokenLineOptions} />
                        </div>
                        <div className={Styles.RightTableBox}>
                            <div className={Styles.TableTitle}>
                                <span className={Styles.TitleLeft}></span>
                                <span className={Styles.TitleText}>历史数据</span>
                            </div>
                            <div className={Styles.table}>
                                <BaseTable
                                    columns={HistoryColumns}
                                    data={historyData}
                                    paganationProps={paganationProps}
                                    total={total}
                                    pageParams={pageParams}
                                    getPage={getPage}
                                    scroll={{ x: 1099, y: 370 }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            {
                rightType === 'F'
                && (
                    <div className={Styles.ContentRight}>
                        <div className={Styles.right}>
                            <span className={Styles.TitleLeft}></span>
                            <span className={Styles.TitleText}>{rightTitle()}</span>
                        </div>
                        <div className={Styles.charts}>
                            <EchartsC options={BrokenLineOptions} />
                        </div>
                        <div className={Styles.RightTableBox}>
                            <div className={Styles.TableTitle}>
                                <span className={Styles.TitleLeft}></span>
                                <span className={Styles.TitleText}>历史数据</span>
                            </div>
                            <div className={Styles.table}>
                                <BaseTable
                                    columns={HistoryColumns}
                                    data={historyData}
                                    paganationProps={paganationProps}
                                    total={total}
                                    pageParams={pageParams}
                                    getPage={getPage}
                                    scroll={{ x: 1099, y: 370 }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default React.memo(RankLinkageQuery);
