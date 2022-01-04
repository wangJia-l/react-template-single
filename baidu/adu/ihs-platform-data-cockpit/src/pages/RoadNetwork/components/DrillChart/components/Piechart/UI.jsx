import React, { useEffect, useRef, useState } from 'react';
import * as $echarts from 'echarts';
import { getSpaceType } from './api';
import Styles from './UI.module.less';
// import { DatePicker } from 'antd';
import moment from 'moment';

const Piechart = props => {
    const ClassARef = useRef(null);
    const [totalCnt, settotalCnt] = useState('');
    const [dataName, setdataName] = useState([]);
    const drewRadarChart = () => {
        const option = {
            tooltip: { // 悬停指示
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)',
            },
            legend: {
                orient: 'vertical',
                // right: 10,
                // top: 30,
                // bottom: 20,
                x: 'left',
                type: 'scroll',
                icon: 'rect',
                left: 350,
                itemGap: 20,
                fontSize: 14,

                // color:'#4C649E',
                // data: data.legendData,

                formatter: function (name) {
                    let target;
                    let eventCnt = 0;
                    for (let i = 0, l = dataName.length; i < l; i++) {
                        if (dataName[i].name === name) {
                            eventCnt = dataName[i]?.eventCnt;
                            target = dataName[i].value;
                        }
                    }
                    return name + '   ' + target + '%' + '   ' + eventCnt;
                },
                textStyle: {
                    color: '#7B97CB',
                    fontSize: 14,
                },
            },
            title: {
                zlevel: 0,
                text: [
                    '{value|' + totalCnt + '}',
                    '{name|事件总数}',
                ].join('\n'),
                rich: {
                    name: {
                        color: '#909399',
                        lineHeight: 20,
                    },
                    value: {
                        color: '#FFFFFF',
                        fontSize: 40,
                        fontWeight: 'bold',
                        lineHeight: 40,
                    },
                },
                top: 'center',
                left: '145',
                textAlign: 'center',
                textStyle: {
                    rich: {
                        name: {
                            color: '#909399',
                            lineHeight: 20,
                        },
                        value: {
                            color: '#FFFFFF',
                            fontSize: 40,
                            fontWeight: 'bold',
                            lineHeight: 40,
                        },
                    },
                },
            },
            series: [
                {
                    // name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    center: [150, '50%'],
                    stillShowZeroSum: false,
                    avoidLabelOverlap: false,
                    zlevel: 1,
                    label: {
                        normal: {
                            // padding: [30, 30, 30, 30],
                            // backgroundColor: 'rgba(10,28,53,0.50)',
                            backgroundColor: '#fff',
                            show: false,
                            position: 'center',
                            formatter: [
                                // '{value|{c}}',
                                // '{name|{b}}',
                            ].join('\n'),
                            rich: {
                                value: {
                                    width: 180,
                                    color: '#303133',
                                    fontSize: 40,
                                    fontWeight: 'bold',
                                    lineHeight: 40,
                                },
                                name: {
                                    color: '#909399',
                                    lineHeight: 20,
                                    width: 100,
                                },
                            },
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold',
                            },
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: dataName,
                },
            ],
        };
        let myChart = $echarts.init(ClassARef.current);
        myChart.setOption(option);
    };
    const getList = async () => {
        const params = {
            space: -1,
            time: -1,
            roadDirNo: props.roadDirNo === '北京方向' ? 1 : 2,
            roadName: !props.parcode.roadName ? '' : props.parcode.roadName,
        };
        const { data } = await getSpaceType(!props.parcode ? params
            : { ...props.parcode, roadDirNo: props.roadDirNo === 0 ? 1 : 2 });

        settotalCnt(data.totalCnt);

        let dataname = [];

        data?.typeList.forEach(item => {
            dataname.push({ value: parseInt(item.ratio * 100, 10), name: item.type, eventCnt: item.eventCnt });
        });
        setdataName(dataname);
        // let dataName = ''
        // if (props.parcode.space === 2) {
        //     dataName =
        // }

    };
    useEffect(async () => {
        const params = {
            space: -1,
            time: -1,
            roadDirNo: props.roadDirNo === 0 ? 1 : 2,
            roadName: !props.parcode.roadName ? '' : props.parcode.roadName,
        };
        const { data } = await getSpaceType(params);

        settotalCnt(data.totalCnt);

        let dataname = [];

        data?.typeList.forEach(item => {
            dataname.push({ value: parseInt(item.ratio * 100, 10), name: item.type, eventCnt: item.eventCnt });
        });
        setdataName(dataname);

    }, [props.roadDirNo]);
    useEffect(() => {
        getList();
    }, [props?.parcode.time, props?.parcode.space]);

    useEffect(() => {
        drewRadarChart();
    }, [dataName]);
    return (
        <div className={Styles.pie}>
            <div className={Styles.rightTop}>
                <div className={Styles.boTitle}>
                    <div className={Styles.title}>事件类型统计</div>
                    {
                        props.parcode.datetime ? `统计周期：${props.parcode.datetime}` : '统计周期：全部'
                    }
                    {/* {
                        moment(props.parcode.datetime).format('YYYY') === props.parcode.datetime
                            ? props.parcode.datetime + '年'
                            : moment(props.parcode.datetime).format('YYYY-MM') === props.parcode.datetime
                                ? props.parcode.datetime + '月'
                                : moment(props.parcode.datetime).format('YYYY-MM-DD')
                                === props.parcode.datetime ? props.parcode.datetime + '日' : '全部'
                    } */}
                </div>
                <div className={Styles.pieTop}>
                    <div className={Styles.bjPie} style={{ width: '90%', height: '45px', color: '#D4E1FF' }}>
                        {
                            +'  ' + props.parcode.space === 2 ? props.parcode.roadName
                                + `${props.roadDirNo === 0 ? '北京' : '雄安'}` + '方向'
                                : `全道路${props.roadDirNo === 0 ? '北京' : '雄安'}方向`
                        }
                        {/* {
                            props.parcode.road === ''
                            ?props.parcode.roadName + `${props.roadDirNo === 0 ? '北京' : '雄安'}方向`
                            :props.parcode.road+ `${props.roadDirNo === 0 ? '北京' : '雄安'}方向`


                        } */}
                    </div>
                </div>
            </div>
            <div className={Styles.chartbot}>
                <div
                    // style={{ visibility: `${ifShow ? 'inherit' : 'hidden'}` }}
                    style={{ width: '100%', height: '310px' }}
                    ref={ClassARef}
                    className={'chart'}
                >
                </div>
            </div>

        </div>

    );
};
export default React.memo(Piechart);