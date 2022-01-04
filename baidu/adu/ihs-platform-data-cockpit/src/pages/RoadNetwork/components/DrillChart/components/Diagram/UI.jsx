import React, { useEffect, useRef, useState } from 'react';
import * as $echarts from 'echarts';
import { getSpaceDiagram } from './api';
import Styles from './UI.module.less';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
// import { mockList } from './mock';
// import moment from 'moment';

const Piechart = props => {
    const ClassARef = useRef(null);
    const [pieChartList, setpieChartList] = useState([]);
    const [dirdata, setdirdata] = useState([]);
    const [propsonly, setprops] = useState({});
    const drewRadarChart = () => {
        const option = {

            legend: {
                right: 10,
                data: ['11'],
                show: false,
            },
            xAxis: {
                name: '事件数量',
                formatter: '{flow}',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#7B97CB'],
                        width: 1,
                        type: 'solid',
                    },
                },
            },
            yAxis: {
                name: '流量',
                formatter: '{eventCnt}',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#7B97CB'],
                        width: 1,
                        type: 'solid',
                    },
                },
            },

            series: [
                {
                    data: dirdata,
                    type: 'scatter',
                    label: {
                        emphasis: {
                            show: false,
                            // formatter: function (param) {
                            //     return param.seriesName;
                            // },
                            position: 'top',
                        },
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(120, 36, 50, 0.5)',
                            shadowOffsetY: 5,
                            color: new $echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                offset: 0,
                                color: 'rgb(251, 118, 123)',
                            }, {
                                offset: 1,
                                color: 'rgb(204, 46, 72)',
                            }]),
                        },
                    },
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
            roadDirNo: props.roadDirNo === 0 ? 1 : 2,
            roadName: !props.parcode.roadName ? '' : props.parcode.roadName,
        };
        const { data } = await getSpaceDiagram(!props.parcode ? params
            : { ...props.parcode, roadDirNo: props.roadDirNo === 0 ? 1 : 2 });
        const dirdata = data.map(item => {
            return [item.flow, item.eventCnt];
        });
        setpieChartList(data);
        setdirdata(dirdata);
    };
    useEffect(() => {
        getList();
    }, [props.parcode, props.parcode.time, props?.parcode.space]);
    // props?.roadDirNo, props?.parcode.time, props?.parcode.space
    useEffect(async () => {
        const params = {
            space: -1,
            time: -1,
            roadDirNo: props.roadDirNo === 0 ? 1 : 2,
            // roadName: props.parcode.roadName
        };
        const { data } = await getSpaceDiagram(params);
        const dirdata = data.map(item => {
            return [item.flow, item.eventCnt];
        });
        setpieChartList(data);
        setdirdata(dirdata);
        setprops({});
        console.log(propsonly, 'propsonly');

    }, [props.roadDirNo]);
    useEffect(() => {
        drewRadarChart();
    }, [pieChartList, dirdata]);
    return (
        <div className={Styles.rightBottom}>
            <div className={Styles.Buttombox}>
                <div className={Styles.boTitle}>
                    <div className={Styles.title}>事件与流量关联分析</div>
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
                    <div className={Styles.bjPie} style={{ width: '90%', height: '45px' }}>
                        <p>
                            {
                                +'  ' + props.parcode.space === 2 ? props.parcode.roadName
                                + `${props.roadDirNo === 0 ? '北京' : '雄安'}` + '方向'
                                    : `全道路${props.roadDirNo === 0 ? '北京' : '雄安'}方向`
                            }
                        </p>
                        <p>
                            粒度：{props?.parcode.time === -1 ? '天'
                                : props.parcode.time === 0 ? '天'
                                    : props.parcode.time === 1 ? '时'
                                        : props.parcode.time === 2 ? '时' : '天'
                            }
                        </p>
                    </div>
                </div>
            </div>
            <div
                style={{ width: '100%', height: '80%' }}
                ref={ClassARef}
                className={'chart'}
            >
            </div>
        </div>

    );
};
export default React.memo(Piechart);