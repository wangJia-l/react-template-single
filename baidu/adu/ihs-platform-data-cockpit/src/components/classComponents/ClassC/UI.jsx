import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import { loginBaseURL } from 'src/env';
import TitleA from '@/components/TitleA';
import TitleB from '@/components/TitleB';
import NoData from '@/components/NoData';
import * as $echarts from 'echarts';
import { BASE_COLOR, DATA_ZOOM, XAXIS, YAXIS, LEGEND_BASE, getRADAR, getRING, getPIE } from '@/common/config';
import { DEFAULT_CONFIG, DEFAULT_CHART_OPTIONS, DEFAULT_PICKER, GRIDCONFIG1, GRIDCONFIG2 } from './config';
import { Select, DatePicker } from 'antd';
const { Option } = Select;

import Styles from './UI.module.less';

function ClassC(props) {
    const { titleName, config = DEFAULT_CONFIG, icon = '' } = props;
    const { theme, tableName, bdaTableInfoEntityList, defaultStyleId, cardTag, id, updateDataByChild } = config;
    const ClassCRef = useRef(null);
    const [time, setTime] = useState(null);
    const [chartType, setChartType] = useState();
    const [chartTypeDic, setChartTypeDic] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [tableNameValue, setTableNameValue] = useState(null);
    const [tableNameDic, setTableNameDic] = useState([]);
    const [chartOptions, setChartOptions] = useState(DEFAULT_CHART_OPTIONS);
    const [pickerOption, setPickerOption] = useState(DEFAULT_PICKER);
    const [urlObj, setUrlObj] = useState({});
    const [ifShow, setIfShow] = useState(false);
    const [grid, setGrid] = useState(null);

    const drewLineChart = () => {
        const { xaxis, yaxis } = chartData;
        const { xAxisName, yAxisName, xAxisUnit, yAxisUnit, name } = chartOptions;
        const colorIndex = Math.ceil(Math.random() * 2) ? Math.ceil(Math.random() * 2) - 1 : 0;
        const { color, areaColor, shadowColor } = BASE_COLOR[colorIndex];
        const areaStyle = chartType === '4' ? {
            normal: {
                color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, areaColor, false),
                shadowColor,
                shadowBlur: 20,
            },
        } : null;
        let dataZoom = {
            show: false,
        };
        const ZOOM_MAX = theme === 1 ? 3 : 5;
        if (xaxis && xaxis.length > ZOOM_MAX) {
            const end = (ZOOM_MAX / xaxis.length) * 100;
            dataZoom = {
                ...DATA_ZOOM,
                end: end,
                height: 6,
                bottom: 10,
            };
        }
        const xAxisConfig = {
            ...XAXIS,
            name: `${xAxisName ? xAxisName : ''}${xAxisUnit ? `（${xAxisUnit}）` : ''}`,
            data: xaxis,
        };
        const yAxisConfig = {
            ...YAXIS,
            name: `${yAxisName ? yAxisName : ''}${yAxisUnit ? `（${yAxisUnit}）` : ''}`,
        };
        const legend = {
            ...LEGEND_BASE,
            bottom: theme === 1 ? 10 : 15,
            data: [name],
        };
        const option = {
            dataZoom,
            legend,
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    let result = `${name}`;
                    params.forEach(param => {
                        const { name, value } = param;
                        result += `<br/> ${name}：${value}${yAxisUnit ? `（${yAxisUnit}）` : ''}`;
                    });
                    return result;
                },
            },
            grid: {
                ...grid,
                containLabel: true,
            },
            xAxis: xAxisConfig,
            yAxis: yAxisConfig,
            series: [{
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
                areaStyle,
                data: yaxis,
            }],
        };
        let myChart = $echarts.init(ClassCRef.current);
        myChart.setOption(option);
    };

    const drewBarChart = () => {
        const { xaxis, yaxis } = chartData;
        const { xAxisName, yAxisName, xAxisUnit, yAxisUnit, name } = chartOptions;
        const colorIndex = Math.ceil(Math.random() * 2) ? Math.ceil(Math.random() * 2) - 1 : 0;
        const { color } = BASE_COLOR[colorIndex];
        let dataZoom = {
            show: false,
        };
        if (xaxis && xaxis.length > 5) {
            const end = (5 / xaxis.length) * 100;
            dataZoom = chartType === '5' ? {
                ...DATA_ZOOM,
                end: end,
                width: 6,
                left: theme === 1 ? 10 : 30,
                bottom: theme === 1 ? 25 : '15%',
                yAxisIndex: 0,
            } : {
                ...DATA_ZOOM,
                end: end,
                height: 6,
                bottom: 10,
            };
        }
        const xAxisConfig = {
            ...XAXIS,
            name: `${xAxisName ? xAxisName : ''}${xAxisUnit ? `（${xAxisUnit}）` : ''}`,
            data: xaxis,
        };
        const yAxisConfig = {
            ...YAXIS,
            name: `${yAxisName ? yAxisName : ''}${xAxisUnit ? `（${yAxisUnit}）` : ''}`,
        };
        const legend = {
            ...LEGEND_BASE,
            bottom: theme === 1 ? 10 : 15,
            data: [name],
        };
        const option = {
            dataZoom,
            legend,
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    let result = `${name}`;
                    params.forEach(param => {
                        const { name, value } = param;
                        result += `<br/> ${name}：${value}${yAxisUnit ? `（${yAxisUnit}）` : ''}`;
                    });
                    return result;
                },
            },
            grid: {
                ...grid,
                containLabel: true,
            },
            xAxis: chartType === '5' ? yAxisConfig : xAxisConfig,
            yAxis: chartType === '5' ? xAxisConfig : yAxisConfig,
            series: [{
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
                data: yaxis,
            }],
        };
        let myChart = $echarts.init(ClassCRef.current);
        myChart.setOption(option);
    };

    const drewPieChart = () => {
        const { xaxis = [], yaxis = [] } = chartData;
        const { name } = chartOptions;

        let color = BASE_COLOR.map(item => item.color);

        let seriesData = xaxis.map((name, i) => {
            return {
                name,
                value: yaxis[i],
            };
        });
        const legend = {
            ...LEGEND_BASE,
            bottom: theme === 1 ? 10 : 15,
            data: [name],
        };
        let option = {
            color: color,
            legend,
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}',
                backgroundColor: 'rgba(0,0,0,0.6)',
                borderColor: 'rgba(0,0,0,0)',
                padding: 10,
                textStyle: {
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: '300',
                },
            },
            series: [{
                ...getPIE(theme),
                name,
                data: seriesData,
            }],
        };
        let myChart = $echarts.init(ClassCRef.current);
        myChart.setOption(option);
    };

    const drewRingChart = () => {
        const { xaxis = [], yaxis = [] } = chartData;
        const { name } = chartOptions;

        let color = BASE_COLOR.map(item => item.color);

        let seriesData = xaxis.map((name, i) => {
            return {
                name,
                value: yaxis[i],
            };
        });
        const legend = {
            ...LEGEND_BASE,
            bottom: theme === 1 ? 10 : 15,
            data: [name],
        };
        let option = {
            color: color,
            grid: {
                left: 0,
                containLabel: true,
            },
            legend,
            series: [{
                ...getRING(theme),
                name,
                data: seriesData,
            }],
        };


        function getDefaultSelected(myChart) {
            let index = 0;
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0,
            });
            myChart.on('mouseover', e => {
                if (e.dataIndex !== index) {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: index,
                    });
                }
            });
            myChart.on('mouseout', e => {
                index = e.dataIndex;
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: e.dataIndex,
                });
            });
        }


        let myChart = $echarts.init(ClassCRef.current);
        myChart.setOption(option);
        getDefaultSelected(myChart);
    };

    const drewScatterChart = () => {
        const { xaxis, yaxis } = chartData;
        const { xAxisName, yAxisName, xAxisUnit, yAxisUnit, name } = chartOptions;
        const colorIndex = Math.ceil(Math.random() * 2) ? Math.ceil(Math.random() * 2) - 1 : 0;
        const { color } = BASE_COLOR[colorIndex];
        let dataZoom = {
            show: false,
        };
        const ZOOM_MAX = theme === 1 ? 3 : 5;
        if (xaxis && xaxis.length > ZOOM_MAX) {
            const end = (ZOOM_MAX / xaxis.length) * 100;
            dataZoom = {
                ...DATA_ZOOM,
                end: end,
                height: 6,
                bottom: 10,
            };
        }
        const xAxisConfig = {
            ...XAXIS,
            name: `${xAxisName ? xAxisName : ''}${xAxisUnit ? `（${xAxisUnit}）` : ''}`,
            data: xaxis,
        };
        const yAxisConfig = {
            ...YAXIS,
            name: `${yAxisName ? yAxisName : ''}${yAxisUnit ? `（${yAxisUnit}）` : ''}`,
        };
        const legend = {
            ...LEGEND_BASE,
            bottom: theme === 1 ? 10 : 15,
            data: [name],
        };
        const option = {
            dataZoom,
            legend,
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    let result = `${name}`;
                    params.forEach(param => {
                        const { name, value } = param;
                        result += `<br/> ${name}：${value}${yAxisUnit ? `（${yAxisUnit}）` : ''}`;
                    });
                    return result;
                },
            },
            grid: {
                show: false,
            },
            xAxis: xAxisConfig,
            yAxis: yAxisConfig,
            series: [
                {
                    name,
                    type: 'scatter',
                    symbol: 'circle',
                    symbolSize: function (data) {
                        const max = Math.max(...yaxis);
                        return data / max * 50;
                    },
                    label: {
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.data[2];
                            },
                            position: 'top',
                        },
                    },
                    itemStyle: {
                        normal: {
                            color,
                        },
                    },
                    data: yaxis,
                },
            ],
        };

        let myChart = $echarts.init(ClassCRef.current);
        myChart.setOption(option);
    };

    const drewRadarChart = () => {
        const { xaxis, yaxis } = chartData;
        const { xAxisName, yAxisName, xAxisUnit, yAxisUnit, name } = chartOptions;
        if (!xaxis || !yaxis) {
            return;
        }
        const max = Math.max(yaxis);
        let stages = xaxis.map(name => {
            return {
                name,
                max,
            };
        });

        let scores = [
            {
                name,
                value: yaxis,
            },
        ];
        function contains(arr, obj) {
            let i = arr.length;
            while (i--) {
                if (arr[i].name === obj) {
                    return i;
                }
            }
            return false;
        }

        const legend = {
            ...LEGEND_BASE,
            bottom: theme === 1 ? 10 : 15,
            data: [name],
        };
        const option = {
            color: [BASE_COLOR[1].color],
            legend,
            radar: {
                ...getRADAR(Number(theme)),
                indicator: stages,
            },
            series: [
                {
                    name,
                    type: 'radar',
                    areaStyle: {
                        normal: {
                            color: new $echarts.graphic.LinearGradient(
                                0,
                                1,
                                0,
                                0,
                                BASE_COLOR[1].areaColor,
                                false
                            ),
                        },
                    },
                    symbolSize: 0,
                    lineStyle: {
                        normal: {
                            color: BASE_COLOR[1].color,
                            width: 1,
                        },
                    },
                    data: [scores[0]],
                },
            ],
        };

        let myChart = $echarts.init(ClassCRef.current);
        myChart.setOption(option);
    };

    const onChartChange = value => {
        setChartType(value);
    };

    const onTimeChange = value => {
        setTime(value);
    };

    const onTableNameChange = value => {
        setTableNameValue(value);
    };

    const getOptionsByTableName = () => {
        const tableItem = tableNameDic.find(i => i.tableName === tableNameValue);
        const {
            bdaDataStyleEntityList,
            xaxisDescribe,
            yaxisDescribe,
            tableDescribe,
            yaxisCompany,
            batchLength,
            obtainFieldUrl,
            queryUrl,
        } = tableItem ? tableItem : {};
        setChartTypeDic(bdaDataStyleEntityList ? bdaDataStyleEntityList : []);
        setChartOptions({
            xAxisName: xaxisDescribe,
            yAxisName: yaxisDescribe,
            yAxisUnit: yaxisCompany,
            name: tableDescribe,
        });

        let defaultFormat = 'YYYY-MM-DD';
        let defaultTime = new Date();
        switch (batchLength) {
            case 8:
                setPickerOption({
                    picker: 'date',
                    format: 'YYYY-MM-DD',
                });
                defaultTime = new Date().setDate(new Date().getDate() - 1);
                defaultFormat = 'YYYY-MM-DD';
                break;
            case 6:
                setPickerOption({
                    ...pickerOption,
                    picker: 'month',
                    format: 'YYYY-MM',
                });
                defaultTime = new Date();
                defaultFormat = 'YYYY-MM';
                break;
            case 4:
                setPickerOption({
                    ...pickerOption,
                    picker: 'year',
                    format: 'YYYY',
                });
                defaultTime = new Date();
                defaultFormat = 'YYYY';
                break;
            default:
                setPickerOption({
                    ...pickerOption,
                    picker: 'date',
                    format: 'YYYY-MM-DD',
                });
                defaultTime = new Date().setDate(new Date().getDate() - 1);
                defaultFormat = 'YYYY-MM-DD';
                break;
        }

        // 设置时间默认值 - 当前时间
        setTime(moment(new Date(defaultTime), defaultFormat));

        // url
        setUrlObj({
            obtainFieldUrl,
            queryUrl,
        });
    };

    const chooseChart = () => {
        if (ClassCRef && ClassCRef.current) {
            $echarts.dispose(ClassCRef.current);
        }
        switch (chartType) {
            case '1':
                drewPieChart();
                break;
            case '2':
            case '5':
                drewBarChart();
                break;
            case '3':
            case '4':
                drewLineChart();
                break;
            case '6':
                drewRingChart();
                break;
            case '10':
                drewScatterChart();
                break;
            case '12':
                drewRadarChart();
                break;
            default:
                break;
        }
    };

    const formateChartData = data => {
        if (!data || !data.length) {
            return [];
        }

        let chartDataObj = {
            xaxis: [],
            yaxis: [],
        };
        data.forEach(item => {
            const { x_axis, y_axis } = item;
            chartDataObj.xaxis.push(x_axis);
            chartDataObj.yaxis.push(y_axis);
        });

        return chartDataObj;
    };

    const getChartData = () => {
        const { queryUrl } = urlObj;
        let formatType = 'YYYYMMDD';
        switch (pickerOption.picker) {
            case 'date':
                formatType = 'YYYYMMDD';
                break;

            case 'month':
                formatType = 'YYYYMM';
                break;
            case 'year':
                formatType = 'YYYY';
                break;

            default:
                break;
        }
        const params = {
            batch: moment(time).format(formatType),
        };
        if (!queryUrl) {
            return;
        }
        axios.get(`${loginBaseURL}${queryUrl}?${qs.stringify(params, { indices: false })}`)
            .then(function (response) {
                const { data, status } = response;
                const { code } = data;
                if (status === 200 && code === 0) {
                    const chartDataRes = data.data ? data.data : [];
                    const list = formateChartData(chartDataRes);
                    setChartData(list);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(async () => {
        const { queryUrl } = urlObj;
        if (!time || !queryUrl) {
            return;
        }
        getChartData();
    }, [time, urlObj]);

    useEffect(() => {
        getOptionsByTableName();
    }, [tableNameValue]);

    useEffect(() => {
        setTableNameValue(tableName ? tableName : null);
        setTableNameDic(bdaTableInfoEntityList ? bdaTableInfoEntityList : []);
        const gridConfig = theme === 1 ? GRIDCONFIG1 : GRIDCONFIG2;
        setGrid(gridConfig);
    }, [config]);

    // 设置默认样式
    useEffect(() => {
        setChartType(defaultStyleId ? defaultStyleId.toString() : null);
    }, [chartTypeDic]);

    useEffect(() => {
        if (chartData) {
            const { xaxis } = chartData;
            setIfShow(xaxis && xaxis.length);
            chooseChart();
            return;
        }
        setIfShow(false);
    }, [chartType, chartOptions, chartData]);

    return (
        <div className={Styles.ClassC}>
            {
                theme === 1 && (<TitleA
                    titleName={titleName}
                    icon={icon}
                    cardTag={cardTag}
                    id={id}
                    updateParentData={updateDataByChild}
                />)
            }
            {
                theme === 2 && (<TitleB
                    titleName={titleName}
                    cardTag={cardTag}
                    id={id}
                    updateParentData={updateDataByChild}
                />)
            }
            <div className={`selectOneToTheme${theme}`} style={{ display: 'none' }}>
                <Select
                    style={{ width: `${theme === 1 ? '140px' : '170px'}` }}
                    placeholder="请选择数据内容"
                    onChange={onTableNameChange}
                    value={tableNameValue}
                >
                    {tableNameDic.map(item => (
                        <Option key={item.tableName}>{item.tableDescribe}</Option>
                    ))}
                </Select>
            </div>
            <div className={`selectNextToTheme${theme}`}>
                <Select
                    style={{ width: `${theme === 1 ? '120px' : '170px'}` }}
                    placeholder="请选择样式"
                    onChange={onChartChange}
                    value={chartType}
                >
                    {chartTypeDic.map(item => (
                        <Option key={item.styleCode}>{item.styleName}</Option>
                    ))}
                </Select>
                {/* picker="month" */}
                <DatePicker
                    value={time}
                    onChange={onTimeChange}
                    picker={pickerOption.picker}
                    format={pickerOption.format}
                    style={{ width: `${theme === 1 ? '100px' : '170px'}`, marginLeft: '10px' }}
                />
            </div>
            <div className={'content'}>
                {
                    <div
                        style={{ visibility: `${ifShow ? 'inherit' : 'hidden'}` }}
                        className={'chart'}
                        ref={ClassCRef}
                    >
                    </div>
                }
                {
                    !ifShow && <NoData />
                }
            </div>
        </div>
    );
}

export default React.memo(ClassC);
