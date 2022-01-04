import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import { loginBaseURL } from 'src/env';
import TitleA from '@/components/TitleA';
import TitleB from '@/components/TitleB';
import NoData from '@/components/NoData';
import * as $echarts from 'echarts';
import { BASE_COLOR, DATA_ZOOM, XAXIS, YAXIS, getRADAR, LEGEND_BASE } from '@/common/config';
import { dataMock,
    DEFAULT_CONFIG,
    DEFAULT_CHART_OPTIONS,
    DEFAULT_PICKER,
    GRIDCONFIG1,
    GRIDCONFIG2 } from './config';
import { Select, DatePicker } from 'antd';
const { Option } = Select;

import Styles from './UI.module.less';

function ClassB(props) {
    const { titleName, config = DEFAULT_CONFIG, icon = '' } = props;
    const { theme, tableName, bdaTableInfoEntityList, cardTag, id, updateDataByChild } = config;
    const ClassBRef = useRef(null);
    const [time, setTime] = useState(null);
    const [chartType, setChartType] = useState('2');
    const [chartTypeDic, setChartTypeDic] = useState([]);
    const [chartData, setChartData] = useState(dataMock);
    const [tableNameValue, setTableNameValue] = useState(null);
    const [tableNameDic, setTableNameDic] = useState([]);
    const [chartOptions, setChartOptions] = useState(DEFAULT_CHART_OPTIONS);
    const [urlObj, setUrlObj] = useState({});
    const [pickerOption, setPickerOption] = useState(DEFAULT_PICKER);
    const [ifShow, setIfShow] = useState(false);
    const [grid, setGrid] = useState(null);

    const drewLineChart = () => {
        const { xaxis, yaxis } = chartData;
        const { xAxisName, xAxisUnit, yAxisName, yAxisUnit, name } = chartOptions;
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
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    let result = `${name}`;
                    params.forEach(param => {
                        const { name, value } = param;
                        result += `<br/> ${name}：${value}${yAxisUnit ? `(${yAxisUnit})` : ''}`;
                    });
                    return result;
                },
            },
            legend,
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
        let myChart = $echarts.init(ClassBRef.current);
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
                        result += `<br/> ${name}：${value}${yAxisUnit ? `(${yAxisUnit})` : ''}`;
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
        let myChart = $echarts.init(ClassBRef.current);
        myChart.setOption(option);
    };

    const drewScatterChart = () => {
        const { xaxis, yaxis } = chartData;
        const { xAxisName, yAxisName, xAxisUnit, yAxisUnit, name } = chartOptions;
        const colorIndex = Math.ceil(Math.random() * 2) ? Math.ceil(Math.random() * 2) - 1 : 0;
        const { color } = BASE_COLOR[colorIndex];
        let dataZoom = {
            show: false,
        };
        const ZOOM_MAX = theme === 1 ? 5 : 10;
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
            legend,
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

        let myChart = $echarts.init(ClassBRef.current);
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

        let myChart = $echarts.init(ClassBRef.current);
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
        const tableItem  = tableNameDic.find(i => i.tableName === tableNameValue);
        const {
            bdaDataStyleEntityList,
            xaxisDescribe,
            yaxisDescribe,
            tableDescribe,
            yaxisCompany,
            obtainFieldUrl,
            queryUrl,
            batchLength,
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

        setUrlObj({
            obtainFieldUrl,
            queryUrl,
        });
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

    const chooseChart = () => {
        if (ClassBRef && ClassBRef.current) {
            $echarts.dispose(ClassBRef.current);
        }
        switch (chartType) {
            case '2':
            case '5':
                drewBarChart();
                break;
            case '3':
            case '4':
                drewLineChart();
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

    useEffect(async () => {
        const { queryUrl } = urlObj;
        if (!(time && queryUrl)) {
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

    useEffect(() => {
        if (chartData) {
            const { xaxis } = chartData;
            setIfShow(xaxis && xaxis.length);
            chooseChart();
            return;
        }
        setIfShow(false);
    }, [chartType, chartOptions, chartData]);


    useEffect(() => {
        drewLineChart();
    }, [chartOptions]);

    return (
        <div className={Styles.ClassB}>
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
            <div className={`selectOneToTheme${theme}`}>
                <Select
                    style={{ width: `${theme === 1 ? '140px' : '170px'}`, display: 'none' }}
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
                <DatePicker
                    onChange={onTimeChange}
                    value={time}
                    picker={pickerOption.picker}
                    format={pickerOption.format}
                    style={{ width: `${theme === 1 ? '100px' : '170px'}`, marginLeft: '10px', zIndex: 999 }}
                />
            </div>
            <div className={'content'}>
                <div
                    style={{ visibility: `${ifShow ? 'inherit' : 'hidden'}` }}
                    className={'chart'}
                    ref={ClassBRef}
                >
                </div>
                {
                    !ifShow && <NoData theme={config.theme} />
                }
            </div>
        </div>
    );
}

export default React.memo(ClassB);
