import React, { useEffect, useState, useRef } from 'react';
import TitleA from '@/components/TitleA';
import TitleB from '@/components/TitleB';
import * as $echarts from 'echarts';
import { CHART_TYPE, BASE_COLOR } from './config';
import { Select } from 'antd';
const { Option } = Select;

import Styles from './UI.module.less';

function ClassH(props) {
    const { titleName, chartData, config, icon = '' } = props;
    const { cardTag, id, updateDataByChild } = config;
    const ClassHRef = useRef(null);
    const [chartType, setChartType] = useState('1');

    const drewLineChart = () => {
        const series = chartData.map((item, i) => {
            const { name, data } = item;
            const { color, areaColor, shadowColor } = BASE_COLOR[i];
            return {
                name,
                type: 'line',
                showAllSymbol: true,
                symbolSize: 0,
                smooth: true,
                itemStyle: {
                    borderWidth: 2,
                    normal: {
                        color,
                    },
                },
                areaStyle: chartType === '2' ? {
                    normal: {
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, areaColor, false),
                        shadowColor,
                        shadowBlur: 20,
                    },
                } : null,
                data,
            };
        });
        const grid = config.theme === 1 ? {
            left: '30',
            right: '80',
            bottom: '20',
            top: '30',
        } : {
            left: '5%',
            right: '8%',
            bottom: '15%',
            top: '10%',
        };
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            grid: {
                ...grid,
                containLabel: true,
            },
            xAxis: {
                name: '亿元',
                nameTextStyle: {
                    color: '#8CA1CB',
                    fontSize: 14,
                    fontWeight: 600,
                    verticalAlign: 'top',
                    align: 'left',
                },
                type: 'category',
                data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
                axisLine: {
                    lineStyle: {
                        color: '#152E58',

                    },
                },
                axisLabel: {
                    textStyle: {
                        fontFamily: 'Microsoft YaHei',
                        color: '#B6CDE5',
                        fontSize: '14',
                    },
                },
                axisTick: {
                    show: false,
                },
            },
            yAxis: {
                name: '亿元',
                nameTextStyle: {
                    color: '#8CA1CB',
                    fontSize: 14,
                    fontWeight: 600,
                    verticalAlign: 'bottom',
                    align: 'right',
                },
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#152E58',
                    },
                },
                axisLabel: {
                    textStyle: {
                        fontFamily: 'Microsoft YaHei',
                        color: '#B6CDE5',
                        fontSize: '14',
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(33,70,134,0.5)',
                        width: 1,
                    },
                },
            },
            series,
        };
        let myChart = $echarts.init(ClassHRef.current);
        myChart.setOption(option);
    };

    const drewBarChart = () => {
        const series = chartData.map((item, i) => {
            const { name, data } = item;
            const { color } = BASE_COLOR[i];
            return {
                name,
                type: 'bar',
                barWidth: 8,
                showAllSymbol: true,
                symbolSize: 0,
                smooth: true,
                itemStyle: {
                    borderWidth: 2,
                    normal: {
                        color,
                    },
                },
                data,
            };
        });
        const grid = config.theme === 1 ? {
            left: '30',
            right: '80',
            bottom: '30',
            top: '30',
        } : {
            left: '5%',
            right: '8%',
            bottom: '15%',
            top: '10%',
        };
        const option = {
            legend: {
                icon: 'roundRect',
                bottom: '5',
                orient: 'horizontal',
                data: chartData.map(item => item.name),
                align: 'right',
                textStyle: {
                    color: '#8CA1CB',
                },
                itemGap: 20,
                itemWidth: 10,
                itemHeight: 10,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            grid: {
                ...grid,
                containLabel: true,
            },
            xAxis: {
                name: '亿元',
                nameTextStyle: {
                    color: '#8CA1CB',
                    fontSize: 14,
                    fontWeight: 600,
                    verticalAlign: 'top',
                    align: 'left',
                },
                type: 'category',
                data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
                axisLine: {
                    lineStyle: {
                        color: '#152E58',

                    },
                },
                axisLabel: {
                    textStyle: {
                        fontFamily: 'Microsoft YaHei',
                        color: '#B6CDE5',
                        fontSize: '14',
                    },
                },
                axisTick: {
                    show: false,
                },
            },
            yAxis: {
                name: '亿元',
                nameTextStyle: {
                    color: '#8CA1CB',
                    fontSize: 14,
                    fontWeight: 600,
                    verticalAlign: 'bottom',
                    align: 'right',
                },
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#152E58',
                    },
                },
                axisLabel: {
                    textStyle: {
                        fontFamily: 'Microsoft YaHei',
                        color: '#B6CDE5',
                        fontSize: '14',
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(33,70,134,0.5)',
                        width: 1,
                    },
                },
            },
            series,
        };
        let myChart = $echarts.init(ClassHRef.current);
        myChart.setOption(option);
    };

    const onDataChange = () => { };
    const onChartChange = value => {
        setChartType(value);
    };

    useEffect(() => {
        $echarts.dispose(ClassHRef.current);
        switch (chartType) {
            case '1':
            case '2':
                drewLineChart();
                break;
            case '3':
                drewBarChart();
                break;

            default:
                drewLineChart();
                break;
        }
    }, [chartType]);

    useEffect(() => {
        drewLineChart();
    }, []);

    return (
        <div className={Styles.ClassH}>
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
                <Select
                    style={{ width: `${config.theme === 1 ? '140px' : '170px'}` }}
                    placeholder="请选择数据内容"
                    onChange={onDataChange}
                >
                    {[].map(item => (
                        <Option key={item}>{item}</Option>
                    ))}
                </Select>
            </div>
            <div className={`selectNextToTheme${config.theme}`}>
                <Select
                    style={{ width: `${config.theme === 1 ? '140px' : '170px'}` }}
                    placeholder="请选择样式"
                    onChange={onChartChange}
                    value={chartType}
                >
                    {CHART_TYPE.map(item => (
                        <Option key={item.id}>{item.label}</Option>
                    ))}
                </Select>
                <Select
                    style={{ width: `${config.theme === 1 ? '140px' : '170px'}`, marginLeft: '20px' }}
                    placeholder="请选择地点"
                    onChange={onDataChange}
                >
                    {[].map(item => (
                        <Option key={item}>{item}</Option>
                    ))}
                </Select>
            </div>
            <div
                className={'chart'}
                style={{ height: `${config.theme === 1 ? 'calc(100% - 90px)' : 'calc(100% - 120px)'}` }}
                ref={ClassHRef}
            >
            </div>
        </div>
    );
}

export default React.memo(ClassH);
