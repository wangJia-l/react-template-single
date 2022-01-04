import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import qs from 'qs';
import { loginBaseURL } from 'src/env';
import TitleA from '@/components/TitleA';
import TitleB from '@/components/TitleB';
import NoData from '@/components/NoData';
import * as $echarts from 'echarts';
import {
    BASE_COLOR,
    DATA_ZOOM, XAXIS,
    YAXIS,
    LEGEND_BASE,
    GRIDCONFIG1,
    GRIDCONFIG2,
    getRADAR,
} from '@/common/config';
import {
    DEFAULT_CONFIG,
    DEFAULT_CHART_OPTIONS,
    DEFAULT_PARMAS,
    DEFAULT_PICKER,
} from './config';
import { Select, DatePicker } from 'antd';
const { Option } = Select;

import Styles from './UI.module.less';
import { flatten } from 'lodash';

function ClassE(props) {
    const { titleName, config = DEFAULT_CONFIG, icon = '' } = props;
    const { theme, defaultStyleId, cardTag, id, updateDataByChild } = config;
    const ClassERef = useRef(null);
    const [tableNameVal, setTableNameVal] = useState(null);
    const [paramsObj, setParamsObj] = useState(DEFAULT_PARMAS);
    const [chartTypeDic, setChartTypeDic] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [tableNameDic, setTableNameDic] = useState([]);
    const [positionDic, setPositionDic] = useState([]);
    const [chartOptions, setChartOptions] = useState(DEFAULT_CHART_OPTIONS);
    const [pickerOption, setPickerOption] = useState(DEFAULT_PICKER);
    const [urlObj, setUrlObj] = useState({});
    const [ifShow, setIfShow] = useState(false);

    const drewLineChart = () => {
        const { xAxisName, yAxisName, xAxisUnit, yAxisUnit, name } = chartOptions;
        const { data = [], xaxis = [] } = chartData;
        const BASE_COLOR_LEN = BASE_COLOR.length;
        const series = data.map((item, i) => {
            const { type, yaxis } = item;
            const { color, areaColor, shadowColor } = BASE_COLOR[i % BASE_COLOR_LEN];
            return {
                name: type,
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
                areaStyle: paramsObj.chartType === '4' ? {
                    normal: {
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, areaColor, false),
                        shadowColor,
                        shadowBlur: 20,
                    },
                } : null,
                data: yaxis,
            };
        });
        const legend = {
            ...LEGEND_BASE,
            show: !(data.map(item => item.type).length > 4),
            bottom: theme === 1 ? 10 : 15,
            data: data.map(item => item.type),
        };
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
        const option = {
            legend,
            dataZoom: dataZoom,
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    const axisValue = params && params[0] ? params[0].axisValue : name;
                    let result = `${axisValue}`;
                    params.forEach(param => {
                        const { value, seriesName } = param;
                        result += `<br/> ${seriesName}：${value}${yAxisUnit ? `（${yAxisUnit}）` : ''}`;
                    });
                    return result;
                },
            },
            grid: theme === 1 ? GRIDCONFIG1 : GRIDCONFIG2,
            xAxis: xAxisConfig,
            yAxis: yAxisConfig,
            series,
        };
        let myChart = $echarts.init(ClassERef.current);
        myChart.setOption(option);
    };

    const drewBarChart = () => {
        const { xAxisName, yAxisName, xAxisUnit, yAxisUnit, name } = chartOptions;
        const { data = [], xaxis = [] } = chartData;
        const BASE_COLOR_LEN = BASE_COLOR.length;
        const series = data.map((item, i) => {
            const { type, yaxis } = item;
            const { color } = BASE_COLOR[i % BASE_COLOR_LEN];
            return {
                name: type,
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
            };
        });
        const legend = {
            ...LEGEND_BASE,
            show: !(data.map(item => item.type).length > 4),
            bottom: theme === 1 ? 10 : 15,
            data: data.map(item => item.type),
        };
        let dataZoom = {
            show: false,
        };
        const ZOOM_MAX = theme === 1 ? 3 : 5;
        if (xaxis && xaxis.length > ZOOM_MAX) {
            const end = (ZOOM_MAX / xaxis.length) * 100;
            dataZoom = paramsObj.chartType === '5' ? {
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
        const option = {
            dataZoom,
            legend,
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    const axisValue = params && params[0] ? params[0].axisValue : name;
                    let result = `${axisValue}`;
                    params.forEach(param => {
                        const { seriesName, value, axisValue } = param;
                        result += `<br/> ${seriesName}：${value}${yAxisUnit ? `（${yAxisUnit}）` : ''}`;
                    });
                    return result;
                },
            },
            grid: theme === 1 ? GRIDCONFIG1 : GRIDCONFIG2,
            xAxis: paramsObj.chartType === '5' ? yAxisConfig : xAxisConfig,
            yAxis: paramsObj.chartType === '5' ? xAxisConfig : yAxisConfig,
            series,
        };
        let myChart = $echarts.init(ClassERef.current);
        myChart.setOption(option);
    };

    const drewScatterChart = () => {
        const { data = [], xaxis = [] } = chartData;
        const { xAxisName, yAxisName, xAxisUnit, yAxisUnit, name } = chartOptions;
        const BASE_COLOR_LEN = BASE_COLOR.length;
        const MAX = Math.max(...flatten(data.map(i => i.yaxis)));
        const series = data.map((item, i) => {
            const { type, yaxis } = item;
            const { color } = BASE_COLOR[i % BASE_COLOR_LEN];
            const SIZE = theme === 1 ? 25 : 50;
            return {
                name: type,
                type: 'scatter',
                symbol: 'circle',
                symbolSize: function (data) {
                    return data / MAX * SIZE;
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
            };
        });

        const legend = {
            ...LEGEND_BASE,
            show: !(data.map(item => item.type).length > 4),
            bottom: theme === 1 ? 10 : 15,
            data: data.map(item => item.type),
        };

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

        const option = {
            dataZoom,
            legend,
            tooltip: {
                trigger: 'axis',
                formatter(params) {
                    let result = `${name}`;
                    params.forEach(param => {
                        const { value, seriesName } = param;
                        result += `<br/> ${seriesName}：${value}${yAxisUnit ? `（${yAxisUnit}）` : ''}`;
                    });
                    return result;
                },
            },
            grid: theme === 1 ? GRIDCONFIG1 : GRIDCONFIG2,
            xAxis: xAxisConfig,
            yAxis: yAxisConfig,
            series,
        };

        let myChart = $echarts.init(ClassERef.current);
        myChart.setOption(option);
    };

    const drewRadarChart = () => {
        const { data = [], xaxis = [] } = chartData;
        const { xAxisName, yAxisName, xAxisUnit, yAxisUnit, name } = chartOptions;
        const BASE_COLOR_LEN = BASE_COLOR.length;
        const MAX = Math.max(...flatten(data.map(i => i.yaxis)));
        const color = BASE_COLOR.map(i => i.color);
        const indicator = Array.from(new Set(xaxis)).map(name => {
            return {
                name,
                max: MAX,
            };
        });

        const legend = {
            ...LEGEND_BASE,
            show: !(data.map(item => item.type).length > 4),
            bottom: theme === 1 ? 10 : 15,
            data: data.map(item => item.type),
        };

        const seriesData = data.map((item, i) => {
            return {
                value: item.yaxis,
                name: item.type,
                areaStyle: {
                    normal: {
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: BASE_COLOR[i % BASE_COLOR_LEN].areaColor,
                            global: false, // 缺省为 false
                        },
                    },
                },
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 1,
                        },
                        opacity: 0.3,
                    },
                    emphasis: {
                        lineStyle: {
                            width: 5,
                        },
                        opacity: 0,
                    },
                },
            };
        });
        const option = {
            tooltip: {
                trigger: 'item',
            },
            color,
            legend,
            radar: {
                ...getRADAR(Number(theme)),
                indicator,
            },
            series: [
                {
                    type: 'radar',
                    symbolSize: 5,
                    data: seriesData,
                },
            ],
        };

        let myChart = $echarts.init(ClassERef.current);
        myChart.setOption(option);
    };

    const paramsObjChange = (key, value) => {
        if (key === 'tableNameVal') {
            setTableNameVal(value);
            setParamsObj({
                ...paramsObj,
                position: null,
            });
            return;
        }
        const result = {
            ...paramsObj,
        };
        result[key] = value;
        setParamsObj(result);
    };

    const getOptionsByTableName = () => {
        const tableItem = tableNameDic.find(i => i.tableName === tableNameVal);
        const {
            bdaDataStyleEntityList,
            xaxisDescribe,
            yaxisDescribe,
            tableDescribe,
            yaxisCompany,
            xaxisCompany,
            batchLength,
            obtainFieldUrl,
            queryUrl,
        } = tableItem ? tableItem : {};
        setChartTypeDic(bdaDataStyleEntityList ? bdaDataStyleEntityList : []);
        setChartOptions({
            xAxisName: xaxisDescribe,
            yAxisName: yaxisDescribe,
            yAxisUnit: yaxisCompany,
            xAxisUnit: xaxisCompany,
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
        setParamsObj({
            ...paramsObj,
            time: moment(new Date(defaultTime), defaultFormat),
        });

        // url
        setUrlObj({
            obtainFieldUrl,
            queryUrl,
        });
    };

    const chooseChart = () => {
        if (ClassERef && ClassERef.current) {
            $echarts.dispose(ClassERef.current);
        }
        switch (paramsObj.chartType) {
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

    const getPositionDic = () => {
        // 清除已选项
        setParamsObj({
            ...paramsObj,
            position: null,
        });
        const { obtainFieldUrl } = urlObj;
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
            batch: moment(paramsObj.time).format(formatType),
        };
        if (!obtainFieldUrl) {
            return;
        }
        axios.get(`${loginBaseURL}${obtainFieldUrl}?${qs.stringify(params, { indices: false })}`)
            .then(function (response) {
                const { data, status } = response;
                const { code } = data;
                if (status === 200 && code === 0) {
                    const dicData = data.data ? data.data : [];
                    setPositionDic(dicData);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const formateChartData = data => {
        if (!data || !data.length) {
            return [];
        }
        let xaxis = [];

        const chartData = data.map((item, index) => {
            const { dataList = [], type } = item;
            const yaxis = dataList.map(i => i.y_axis);
            if (index === 0) {
                xaxis = dataList.map(i => i.x_axis);
            }
            return {
                type,
                yaxis,
            };
        });

        return {
            xaxis,
            data: chartData,
        };

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
            batch: moment(paramsObj.time).format(formatType),
            type: paramsObj.position,
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
                    const result = formateChartData(chartDataRes);
                    setIfShow(data.data && data.data.length);
                    setChartData(result);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        const { tableName, bdaTableInfoEntityList, theme } = config;
        setTableNameVal(tableName);
        setTableNameDic(bdaTableInfoEntityList ? bdaTableInfoEntityList : []);
    }, [config]);

    useEffect(() => {
        tableNameVal && getOptionsByTableName();
    }, [tableNameVal]);

    // 设置默认样式
    useEffect(() => {
        setParamsObj({
            ...paramsObj,
            chartType: defaultStyleId ? defaultStyleId.toString() : null,
        });
    }, [chartTypeDic]);

    useEffect(async () => {
        // 根据时间获取地点字典
        const { obtainFieldUrl } = urlObj;
        if (!(paramsObj.time && obtainFieldUrl)) {
            return;
        }
        getPositionDic();
        getChartData();
    }, [paramsObj.time, urlObj]);

    useEffect(() => {
        getChartData();
    }, [paramsObj.position]);

    useEffect(() => {
        if (chartData) {
            chooseChart();
            // drewScatterChart();
        }
    }, [paramsObj.chartType, chartOptions, chartData]);

    useEffect(() => {
    }, [paramsObj]);

    return (
        <div className={Styles.ClassE}>
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
                    onChange={value => paramsObjChange('tableNameVal', value)}
                    value={tableNameVal}
                >
                    {tableNameDic.map(item => (
                        <Option key={item.tableName}>{item.tableDescribe}</Option>
                    ))}
                </Select>
            </div>
            <div className={`selectNextToTheme${theme}`}>
                <Select
                    style={{ width: `${theme === 1 ? '115px' : '170px'}` }}
                    placeholder="请选择样式"
                    onChange={value => paramsObjChange('chartType', value)}
                    value={paramsObj.chartType}
                >
                    {chartTypeDic.map(item => (
                        <Option key={item.styleCode}>{item.styleName}</Option>
                    ))}
                </Select>
                <DatePicker
                    value={paramsObj.time}
                    onChange={value => paramsObjChange('time', value)}
                    picker={pickerOption.picker}
                    format={pickerOption.format}
                    style={{ width: `${theme === 1 ? '120px' : '170px'}`, marginLeft: '10px' }}
                />
                <Select
                    value={paramsObj.position}
                    style={{ width: `${theme === 1 ? '115px' : '170px'}`, marginLeft: '10px' }}
                    placeholder="请选择地点"
                    allowClear
                    onChange={value => paramsObjChange('position', value)}
                >
                    {positionDic.map(item => (
                        <Option key={item}>{item}</Option>
                    ))}
                </Select>
            </div>
            <div className={'content'}>
                <div
                    style={{ visibility: `${ifShow ? 'inherit' : 'hidden'}` }}
                    className={'chart'}
                    ref={ClassERef}
                >
                </div>
                {
                    !ifShow && <NoData />
                }
            </div>
        </div>
    );
}

export default React.memo(ClassE);
