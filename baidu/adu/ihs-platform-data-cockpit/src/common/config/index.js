/**
 * @file common config
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */

/**
 * 一分钟的毫秒值 60000 = 60 * 1000
 */
export const MILLISECONDS_MIN = 60000;
/**
  * 一小时的毫秒值 3600000 = 60 * 60 * 1000
  */
export const MILLISECONDS_HOUR = MILLISECONDS_MIN * 60;
/**
  * 一天的毫秒值 86400000 = 24 * 60 * 60 * 1000
  */
export const MILLISECONDS_DAY = MILLISECONDS_HOUR * 24;
/**
  * 一分钟的秒值 60
  */
export const SECONDS_MIN = 60;
/**
  * 一小时的秒值 3600 = 60 * 60
  */
export const SECONDS_HOUR = SECONDS_MIN * 60;
/**
  * 一天的秒值 86400 = 24 * 60 * 60
  */
export const SECONDS_DAY = SECONDS_HOUR * 24;

/**
 * 图表样式字典
 */

export const CHART_TYPE = [
    {
        id: '1',
        label: '饼状图',
    },
    {
        id: '2',
        label: '柱状图',
    },
    {
        id: '3',
        label: '折线图',
    },
    {
        id: '4',
        label: '面积图',
    },
    {
        id: '5',
        label: '条形图',
    },
    {
        id: '6',
        label: '圆环图',
    },
    {
        id: '7',
        label: '联合图',
    },
    {
        id: '8',
        label: '双Y轴图',
    },
    {
        id: '9',
        label: '油量图',
    },
    {
        id: '10',
        label: '散点图',
    },
    {
        id: '11',
        label: '气泡图',
    },
    {
        id: '12',
        label: '雷达图',
    },
    {
        id: '13',
        label: '容器图',
    },
    {
        id: '14',
        label: '温度计',
    },
    {
        id: '15',
        label: '进度条',
    },
    {
        id: '16',
        label: '红绿灯',
    },
    {
        id: '17',
        label: '地图',
    },
    {
        id: '18',
        label: '列表',
    },
];


/**
 * 卡片样式字典
 */

export const CARD_TYPE = [
    {
        id: 1,
        label: 'A',
    },
    {
        id: 2,
        label: 'B',
    },
    {
        id: 3,
        label: 'C',
    },
    {
        id: 4,
        label: 'D',
    },
    {
        id: 5,
        label: 'E',
    },
    {
        id: 6,
        label: 'F',
    },
    {
        id: 7,
        label: 'G',
    },
    {
        id: 8,
        label: 'H',
    },
    {
        id: 9,
        label: 'I',
    },
    {
        id: 10,
        label: 'J',
    },
    {
        id: 11,
        label: 'K',
    },
];

/**
 * 图表颜色
 */
export const BASE_COLOR = [
    {
        color: '#18BAB0',
        areaColor: [{
            offset: 0,
            color: '#18BAB0',
        },
        {
            offset: 0.5,
            color: 'rgba(24,186,176,0.2)',
        },
        {
            offset: 1,
            color: 'rgba(38,232,220,0)',
        }],
        shadowColor: 'rgba(24,186,176,0.5)',
    },
    {
        color: '#196EED',
        areaColor: [{
            offset: 0,
            color: '#196EED',


        },
        {
            offset: 0.5,
            color: 'rgba(25,110,237,0.2)',
        },
        {
            offset: 1,
            color: 'rgba(38,232,220,0)',
        }],
        shadowColor: 'rgba(25,110,237,0.5)',
    },
    {
        color: '#5C42F2',
        areaColor: [{
            offset: 0,
            color: '#5C42F2',


        },
        {
            offset: 0.5,
            color: 'rgba(92,66,242,0.2)',
        },
        {
            offset: 1,
            color: 'rgba(38,232,220,0)',
        }],
        shadowColor: 'rgba(92,66,242,0.5)',
    },
    {
        color: '#FF8779',
        areaColor: [{
            offset: 0,
            color: '#FF8779',


        },
        {
            offset: 0.5,
            color: 'rgba(255,135,121,0.2)',
        },
        {
            offset: 1,
            color: 'rgba(38,232,220,0)',
        }],
        shadowColor: 'rgba(255,135,121,0.5)',
    },
    {
        color: '#FF5561',
        areaColor: [{
            offset: 0,
            color: '#FF5561',


        },
        {
            offset: 0.5,
            color: 'rgba(255,85,97,0.2)',
        },
        {
            offset: 1,
            color: 'rgba(38,232,220,0)',
        }],
        shadowColor: 'rgba(255,85,97,0.5)',
    },
    {
        color: '#E99E52',
        areaColor: [{
            offset: 0,
            color: '#E99E52',


        },
        {
            offset: 0.5,
            color: 'rgba(233,158,82,0.2)',
        },
        {
            offset: 1,
            color: 'rgba(38,232,220,0)',
        }],
        shadowColor: 'rgba(233,158,82,0.5)',
    },
];

/**
 * dataZoom-baseConfig
 */
export const DATA_ZOOM = {
    show: true,
    tyepe: 'inside',
    zoomOnMouseWheel: true,
    moveOnMouseMove: true,
    start: 0,
    handleIcon:
        'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
    handleSize: '100%',
    handleStyle: {
        color: '#4A94DD',
    },
    textStyle: {
        color: '#fff',
        fontSize: 8,
        fontWeight: 500,
    },
    fillerColor: '#4A94DD',
    borderColor: '#2B374D',
    backgroundColor: '#2B374D',
};

/**
 * xAxis-baseConfig
 */
export const XAXIS = {
    type: 'category',
    // nameRotate: '90',
    nameTextStyle: {
        color: '#8CA1CB',
        fontSize: 14,
        fontWeight: 600,
        verticalAlign: 'top',
        align: 'left',
        lineOverflow: 'truncate',
        overflow: 'truncate',
        ellipsis: '...',
    },
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
        padding: 0,
        interval: 0,
        hideOverlap: true, // 隐藏重叠的标签
    },
    axisTick: {
        show: false,
    },
};

/**
 * yAxis-baseConfig
 */
export const YAXIS = {
    type: 'value',
    nameTextStyle: {
        color: '#8CA1CB',
        fontSize: 14,
        fontWeight: 600,
        verticalAlign: 'bottom',
    },
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
};

/**
 * gridConfig
 */
export const GRIDCONFIG1 = {
    bottom: '40',
    top: '30',
    containLabel: true,
};
export const GRIDCONFIG2 = {
    bottom: '15%',
    top: '40',
    containLabel: true,
};

// 专题字典
export const SUBJECT_DIC = [
    {
        subjectIndex: 0,
        name: '数据总览',
    },
    {
        subjectIndex: 1,
        name: '路网专题',
    },
    {
        subjectIndex: 2,
        name: '智能视频专题',
    },
    {
        subjectIndex: 3,
        name: '客运接驳专题',
    },
    {
        subjectIndex: 4,
        name: '养护专题',
    },
    {
        subjectIndex: 5,
        name: '服务区专题',
    },
    {
        subjectIndex: 7,
        name: '车路协同专题',
    },
];

/**
 * legendConfig
 */
export const LEGEND_BASE = {
    icon: 'roundRect',
    orient: 'horizontal',
    align: 'right',
    textStyle: {
        color: '#8CA1CB',
    },
    itemGap: 20,
    itemWidth: 10,
    itemHeight: 10,
};

export const getRADAR = (theme = 1) => {
    const center = theme === 1 ? ['50%', '30%'] : ['50%', '38%'];
    const radius = theme === 1 ? '45%' : '50%';

    return {
        center, // 外圆的位置
        radius: radius,
        name: {
            textStyle: {
                color: '#fff',
                fontSize: 12,
                fontWeight: 400,
                fontFamily: 'PingFangSC-Regular,PingFang SC',
                fontStyle: 'italic',
            },
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['transparent', 'transparent', 'transparent', 'transparent', 'transparent'],
            },
        },
        axisLine: {
            lineStyle: {
                color: '#292C38',
            },
        },
        splitLine: {
            lineStyle: {
                type: 'solid',
                color: '#292C38',
                width: 1,
            },
        },
    };

};

export const getRING = (theme = 1) => {
    const center = theme === 1 ? ['50%', '30%'] : ['50%', '38%'];
    const radius = theme === 1 ? ['25%', '45%'] : ['35%', '55%'];

    return {
        type: 'pie',
        center,
        radius,
        label: {
            normal: {
                show: false,
                position: 'center',
                formatter: '{value|{c}}\n{label|{b}}',
                rich: {
                    value: {
                        padding: 5,
                        align: 'center',
                        verticalAlign: 'middle',
                        fontSize: 28,
                        color: '#CBE7FF',
                    },
                    label: {
                        align: 'center',
                        verticalAlign: 'middle',
                        fontSize: 16,
                        color: '#689CF8',
                    },
                },
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '12',
                },
            },
        },
        labelLine: {
            show: false,
            length: 0,
            length2: 0,
        },
    };
};

export const getPIE = (theme = 1) => {
    const center = theme === 1 ? ['50%', '30%'] : ['50%', '38%'];
    const radius = theme === 1 ? '45%' : '50%';

    return {
        type: 'pie',
        center,
        radius,
        label: {
            show: true,
            position: 'top',
            formatter: '{label|{b}}',
            rich: {
                label: {
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 400,
                    fontFamily: 'PingFangSC-Regular,PingFang SC',
                    fontStyle: 'italic',
                },
            },
        },
        labelLine: {
            show: false,
            length: 0,
            length2: 0,
        },
    };
};