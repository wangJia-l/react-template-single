import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import { getSpaceTime } from './api';
import Styles from './UI.module.less';
import moment from 'moment';
import imgTime from '@/assets/icon/icon-time.png';
import imgtype from '@/assets/icon/icon-typeT.png';


const Chartthreed = props => {
    const ClassARef = useRef(null);
    const [chartData, setChartData] = useState([]);
    const [flag, setFlag] = useState(false);
    const boxDtile = useRef(null);
    const [offerX, setofferX] = useState(0);
    const [offerY, setofferY] = useState(0);
    const [flagtime, setFlagTime] = useState(-1);
    const [addrse, setaddrse] = useState('');
    const [paramsdata, setParamsData] = useState([]);
    const [payload, setPayload] = useState({});
    const [spaceS, setspaceS] = useState(-1);
    const [initdays, setdays] = useState(['2017', '2018', '2019', '2020', '2021']);
    const [bordList, setbordList] = useState(0);
    const [maxEvtCnt, setmaxEvtCnt] = useState(0);

    const drewRadarChart = () => {
        const days = [];
        const hours = [];
        const dataList = [];
        chartData.forEach(item => {
            if (item.stepIndex) {
                days.push(item.stepIndex);
            }
            else {
                days.push(item.datetime);
            }
            if (item.roadName === null) {
                hours.push(item.stakeCode);
                dataList.push([item.stakeCode, !item.stepIndex
                    ? item.datetime : item.stepIndex, item.eventCnt]);
            }
            else {
                hours.push(item.roadName);
                dataList.push([item.roadName, !item.stepIndex ? item.datetime : item.stepIndex, item.eventCnt]);
            }

        });
        const option = {
            color: [
                '#313695',
                '#4575b4',
                '#74add1',
                '#abd9e9',
                '#e0f3f8',
                '#ffffbf',
                '#fee090',
                '#fdae61',
                '#f46d43',
                '#d73027',
                '#a50026',
            ],
            tooltip: {
                enterable: true,
                // 触发方式 mousemove, click, none, mousemove|click
                triggerOn: 'mousemove',
                // item 图形触发， axis 坐标轴触发， none 不触发
                trigger: 'item',
                // 浮层隐藏的延迟
                hideDelay: 800,
                // 背景色
                backgroundColor: '#fff',
                formatter: function (params) {
                    return `<div className=chartLabel>
                        <p>空间：${params.data[0]}</p>
                        <p>时间：${params.data[1]}</p>
                        <p>事件数：${params.data[2]}</p>
                    </div>`;
                },

            },

            visualMap: {
                max: maxEvtCnt,
                textStyle: {
                    color: '#fff',
                },
                inRange: {
                    color: [
                        '#313695',
                        '#4575b4',
                        '#74add1',
                        '#abd9e9',
                        '#e0f3f8',
                        '#ffffbf',
                        '#fee090',
                        '#fdae61',
                        '#f46d43',
                        '#d73027',
                        '#a50026',
                    ],
                },

            },
            xAxis3D: {
                name: '',
                type: 'category',
                data: Array.from(new Set(hours)),
                axisLabel: {
                    interval: 'auto', // 0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                    rotate: -90, // -30度角倾斜显示
                    // margin: 34,
                },
                axisLine: {
                    lineStyle: {
                        color: '#4C649E',
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#4C649E'], // 网格线
                        width: 1,
                    },
                },
            },
            yAxis3D: {
                name: '',
                type: 'category',
                // data: Array.from(new Set(days)),
                // data: days,
                data: bordList === 1 ? Array.from(new Set(days)) : initdays,
                axisLabel: {
                    interval: 'auto', // 0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
                    rotate: -90, // -30度角倾斜显示
                    // margin: 34,
                },
                axisLine: {
                    lineStyle: {
                        color: '#4C649E',
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#4C649E'], // 网格线
                        width: 1,
                    },
                },
                itemStyle: {
                    normal: {
                        color: '#4C649E',
                    },
                },
            },
            zAxis3D: {
                name: '事件数量',
                type: 'value',
                // axisLabel: {
                //     interval: 0,
                //     textStyle: {
                //         fontFamily: 'Microsoft YaHei',
                //         color: '#4C649E',
                //         fontSize: '14',
                //     },
                //     rotate: 0,
                // },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#4C649E'], // 网格线
                        width: 1,
                    },
                },
                axisLine: {
                    lineStyle: {
                        color: '#4C649E',
                    },
                },
                itemStyle: {
                    normal: {
                        color: '#4C649E',
                    },
                },

            },
            grid3D: {
                boxWidth: 200,
                boxDepth: 80,
                viewControl: {
                    projection: 'orthographic',
                },
                light: {
                    main: {
                        intensity: 1.2,
                        shadow: true,
                    },
                    ambient: {
                        intensity: 0.3,
                    },
                },
            },
            series: [
                {
                    type: 'bar3D',
                    // selectedMode: 'multiple',
                    data: dataList,
                    shading: 'lambert',
                    // label: {
                    //     fontSize: 16,
                    //     borderWidth: 1,
                    // },
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'top',
                                color: '#fff',
                                textStyle: {
                                    fontWeight: 'bolder',
                                    fontSize: '12',
                                    color: '#4C649E',
                                },

                            },
                        },
                    },
                    label: {
                        show: true, // 开启显示
                        position: 'top', // 在上方显示
                        textStyle: { // 数值样式
                            color: 'black',
                            fontSize: 16,
                        },
                    },
                    emphasis: {
                        label: {
                            fontSize: 20,
                            color: '#900',

                        },
                        itemStyle: {
                            color: '#900',
                        },
                    },
                },
            ],
        };
        let myChart = echarts.init(ClassARef.current);

        myChart.on('click', function (params) {
            window.localStorage.removeItem('params');
            setFlag(true);
            setofferX(params.event.offsetX);
            setofferY(params.event.offsetY);
            setParamsData(params.data);
            let newTime = -1;
            if (params.data[1] === moment(payload[1]).format('YYYY')) {
                newTime = 0;
            }
            else if (params.data[1] === moment(payload[1]).format('YYYY-MM')) {
                newTime = 1;
            }
            else if (params.data[1] === moment(payload[1]).format('YYYY-MM-DD')) {
                newTime = 2;
            }
            setPayload({
                datetime: params.data[1],
                roadName: params.data[0],
                time: newTime,
                space: spaceS,
            });

        });
        myChart.setOption(option);
    };
    const getList = async i => {
        const params = {
            space: -1,
            time: -1,
            roadDirNo: props.roadDirNo === '北京方向' ? 1 : 2,
            roadName: '雄安-容城东',
            datetime: '2020',
            stepIndex: 1,
        };
        const { data } = await getSpaceTime(params);
        setChartData(data.list);
        setmaxEvtCnt(data.maxEvtCnt);
    };

    const handClick = useCallback(async i => {
        // setbordList(1);
        let newTime = '';
        let spaceshow = -1;
        let datetimes = '';
        let borList = 0;
        if (props.updill === '下钻' && i === '时间') {
            borList = 1;
            if (moment(paramsdata[1]).format('YYYY') === paramsdata[1]) {
                newTime = 0;
                spaceshow = !Number(window.localStorage.getItem('space')) ? spaceshow
                    : Number(window.localStorage.getItem('space'));
            }
            else if (moment(paramsdata[1]).format('YYYY-MM') === paramsdata[1]) {
                newTime = 1;
                spaceshow = !Number(window.localStorage.getItem('space')) ? spaceshow
                    : Number(window.localStorage.getItem('space'));
            }
            else if (moment(paramsdata[1]).format('YYYY-MM-DD') === paramsdata[1]) {
                newTime = 2;
                spaceshow = !Number(window.localStorage.getItem('space')) ? spaceshow
                    : Number(window.localStorage.getItem('space'));
            }
        }
        else if (props.updill === '上钻' && i === '时间') {
            if (moment(paramsdata[1]).format('YYYY') === paramsdata[1]) {
                newTime = -1;
                spaceshow = !Number(window.localStorage.getItem('space')) ? spaceshow
                    : Number(window.localStorage.getItem('space'));
                borList = 1;
            }
            else if (moment(paramsdata[1]).format('YYYY-MM') === paramsdata[1]) {
                spaceshow = !Number(window.localStorage.getItem('space')) ? spaceshow
                    : Number(window.localStorage.getItem('space'));

                newTime = -1;
                borList = 0;
            }
            else if (moment(paramsdata[1]).format('YYYY-MM-DD') === paramsdata[1]) {
                spaceshow = !Number(window.localStorage.getItem('space')) ? spaceshow
                    : Number(window.localStorage.getItem('space'));
                datetimes = paramsdata[1].split('-')[0];

                newTime = 0;
                borList = 1;
            }
            else {
                spaceshow = !Number(window.localStorage.getItem('space')) ? spaceshow
                    : Number(window.localStorage.getItem('space'));
                newTime = 1;
                datetimes = paramsdata[1].slice(0, 7);
                borList = 1;
            }
        }
        if (i === '空间' && props.updill === '下钻') {
            window.localStorage.setItem('space', 2);
            spaceshow = 2;
            if (moment(paramsdata[1]).format('YYYY') === paramsdata[1]) {
                newTime = -1;
                borList = 0;
            }
            else if (moment(paramsdata[1]).format('YYYY-MM') === paramsdata[1]) {
                newTime = 0;
                borList = 1;
                datetimes = paramsdata[1].split('-')[0];
            }
            else if (moment(paramsdata[1]).format('YYYY-MM-DD') === paramsdata[1]) {
                newTime = 1;
                borList = 1;
                datetimes = paramsdata[1].slice(0, 7);
            }
            else {
                newTime = 1;
                borList = 1;
                datetimes = paramsdata[1].slice(0, 7);
            }
        }
        if (i === '空间' && props.updill === '上钻') {
            window.localStorage.setItem('space', -1);
            // borList = 0;
            spaceshow = -1;
            if (moment(paramsdata[1]).format('YYYY') === paramsdata[1]) {
                borList = 0;
                newTime = -1;
            }
            else if (moment(paramsdata[1]).format('YYYY-MM') === paramsdata[1]) {
                newTime = -1;
                borList = 0;
            }
            else if (moment(paramsdata[1]).format('YYYY-MM-DD') === paramsdata[1]) {
                borList = 1;
                newTime = 0;
            }
            else {
                borList = 1;
                newTime = 2;
                datetimes = paramsdata[1].slice(0, 10);
            }
        }
        setFlagTime(newTime);
        setspaceS(spaceshow);
        setbordList(borList);
        const params = {
            ...payload,
            time: newTime,
            space: !Number(window.localStorage.getItem('space')) ? spaceshow
                : Number(window.localStorage.getItem('space')),
            roadDirNo: props.roadDirNo === '北京方向' ? 1 : 2,
            road: addrse,
            datetime: !datetimes ? payload.datetime : datetimes,
        };
        const { data } = await getSpaceTime(params);
        setFlag(false);
        setChartData(data.list);
        setmaxEvtCnt(data.maxEvtCnt);
        setaddrse(data.list[0]?.road);
        console.log(params, 'params');
        props.paramsChange(Object.assign({}, params, {
            roadName: params?.road || params.roadName,
        }));
    }, [payload]);

    useEffect(() => {
        drewRadarChart();
    }, [chartData, maxEvtCnt]);
    useEffect(() => {
        getList();
        setspaceS(-1);
        props.paramsChange(Object.assign({}, {
            datetime: '2021',
            road: '',
            roadDirNo: props?.roadDirNo,
            roadName: '',
            space: -1,
            time: -1,
        }));
        setFlag(false);
    }, [props?.roadDirNo]);

    useEffect(() => {
        // let days = 0;
        // const year = moment().format('YYYY');
        // for (let i = 0; i < 5; i++) {
        //     days += Number(year) - i;
        // }
        window.localStorage.removeItem('space');

    }, []);
    const lodingClick = useCallback(() => {
        setFlag(false);
    }, [props.updill]);
    return (
        <div style={{ position: 'relative', marginTop: 20 }}>
            <div
                // style={{ visibility: `${ifShow ? 'inherit' : 'hidden'}` }}
                style={{ width: '100%', height: '700px', position: flag ? 'relative' : '' }}
                ref={ClassARef}
                className={'chart'}
            >

            </div>
            <div
                className={Styles.lodingbox}
                style={{
                    position: 'absolute',
                    left: offerX,
                    top: offerY - 70,
                    display: !!flag || props.floding ? 'block' : 'none',
                }}
            >
                <p id='box-title'>{props.updill}
                    <span onClick={() => lodingClick()} style={{ marginLeft: '40px' }}>
                        X
                    </span>
                </p>
                <div
                    onClick={() => handClick('时间')}
                    style={{
                        display: flagtime === -1 && props.updill === '上钻'
                            || flagtime === 2 && props.updill === '下钻'
                            ? 'none' : 'block',
                    }}
                >
                    <img src={imgTime} alt="" />
                    <span>时间</span>
                </div>
                <br />
                <div
                    onClick={() => handClick('空间')}
                    style={{
                        display: spaceS === 2 && props.updill === '下钻'
                            || spaceS === -1 && props.updill === '上钻' ? 'none' : 'block',
                    }}
                >
                    <img src={imgtype} alt="" />
                    <span>空间</span>
                </div>
            </div>
        </div>


    );
};
export default React.memo(Chartthreed);