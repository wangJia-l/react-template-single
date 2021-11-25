/* eslint-disable camelcase */
export const INIT_TYPE = {
    '1': '运行中',
    '2': '故障中',
};

export const DEVICE_TYPE = [
    {
        label: '云台摄像机',
        value: 1,
    },
    {
        label: '全景摄像机',
        value: 2,
    },
    {
        label: '车载移动视频',
        value: 3,
    },
    {
        label: 'AI摄像机',
        value: 4,
    },
    {
        label: '抓拍卡口',
        value: 5,
    },
    {
        label: '智慧服务区卡口',
        value: 6,
    },
    {
        label: '可变信息标志',
        value: 7,
    },
    {
        label: '灯杆显示屏',
        value: 8,
    },
    {
        label: '气象检测器',
        value: 9,
    },
    {
        label: '能见度检测器',
        value: 10,
    },
    {
        label: '智慧机箱',
        value: 11,
    },
    {
        label: '防雷',
        value: 12,
    },
    {
        label: '智慧服务区显示屏',
        value: 13,
    },
    {
        label: '车检器',
        value: 14,
    },
    {
        label: '大屏',
        value: 15,
    },
    {
        label: '智慧井盖',
        value: 16,
    },
    {
        label: '收费广场摄像机',
        value: 17,
    },
    {
        label: '收费车道摄像机',
        value: 18,
    },
    {
        label: '照明',
        value: 19,
    },
    {
        label: '服务器',
        value: 20,
    },
    {
        label: '车道控制器',
        value: 21,
    },
    {
        label: '其他',
        value: 99,
    },
];

export const SYSTEM_TYPE = [
    {
        label: '监控',
        value: 1,
    },
    {
        label: '收费',
        value: 2,
    },
    {
        label: '通信',
        value: 3,
    },
    {
        label: '照明',
        value: 4,
    },
    {
        label: '监控中心',
        value: 5,
    },
];

export const BRAND = [
    {
        label: '大华',
        value: 1,
    },
    {
        label: '宇视',
        value: 2,
    },
    {
        label: '海康',
        value: 3,
    },
    {
        label: '三思',
        value: 4,
    },
    {
        label: '百度',
        value: 5,
    },
    {
        label: '曼德克',
        value: 6,
    },
    {
        label: '禾嘉科技',
        value: 7,
    },
    {
        label: '易龙',
        value: 8,
    },
    {
        label: '显科',
        value: 9,
    },
    {
        label: '因泰利',
        value: 10,
    },
    {
        label: '宣能电气',
        value: 11,
    },
    {
        label: '中兴克拉',
        value: 12,
    },
    {
        label: '融智通科技',
        value: 13,
    },
    {
        label: '比丽普',
        value: 14,
    },
    {
        label: '阳明科技',
        value: 15,
    },
    {
        label: '高路易航',
        value: 16,
    },
    {
        label: '魅视',
        value: 17,
    },
    {
        label: '其他',
        value: 99,
    },
];

export const STATUS = [
    {
        label: '正常运行中',
        value: 1,
    },
    {
        label: '故障中',
        value: 2,
    },
    {
        label: '维修中',
        value: 3,
    },
    {
        label: '已停用',
        value: 4,
    },
    {
        label: '已移除',
        value: 5,
    },
    {
        label: '其他',
        value: 99,
    },
];

export const DEVICE_LOCATION = [
    {
        label: '雄安方向',
        value: 1,
    },
    {
        label: '北京方向',
        value: 2,
    },
    {
        label: '中央分隔带',
        value: 3,
    },
    {
        label: '机房',
        value: 4,
    },
    {
        label: '匝道',
        value: 5,
    },
    {
        label: '其他',
        value: 99,
    },
];

export const BID_SECTION = [
    {
        label: 'JD1',
        value: 1,
    },
    {
        label: 'JD2',
        value: 2,
    },
    {
        label: 'JD3',
        value: 3,
    },
    {
        label: 'JD4',
        value: 4,
    },
    {
        label: 'JD5',
        value: 5,
    },
    {
        label: 'JD6',
        value: 6,
    },
    {
        label: 'JD7',
        value: 7,
    },
    {
        label: 'JD8',
        value: 8,
    },
];

export const CONTROL = [
    {
        label: '从中分带左起第1车道',
        value: 1,
    },
    {
        label: '从中分带左起第2车道',
        value: 2,
    },
    {
        label: '从中分带左起第3车道',
        value: 3,
    },
    {
        label: '从中分带左起第4车道',
        value: 4,
    },
    {
        label: '从中分带左起第5车道',
        value: 5,
    },
    {
        label: '其他',
        value: 99,
    },
];

export const BAR = [
    {
        label: 'F型',
        value: 1,
    },
    {
        label: 'L型',
        value: 2,
    },
    {
        label: '龙门架',
        value: 3,
    },
    {
        label: '竖型',
        value: 4,
    },
    {
        label: '其他',
        value: 99,
    },
];

export const SYSTEM_TYPR = [
    {
        label: '监控',
        value: 1,
    },
    {
        label: '收费',
        value: 2,
    },
    {
        label: '通信',
        value: 3,
    },
    {
        label: '照明',
        value: 4,
    },
    {
        label: '监控中心',
        value: 5,
    },
];

export const validateSn = (rule, value, callback) => {
    if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
        callback(new Error('sn号不能包含中文'));
    }
    else if (value.split('')[0] === ' ' || value.split('')[`${value}`.length - 1] === ' ') {
        callback(new Error('sn号首尾不能包含空字符'));
    }
    else {
        callback();
    }
};

export const validateLongLat = (rule, value, callback) => {
    const [long, lat] = value && value.includes(',') ? value.split(',') : [null, null];
    if (
        long.split('')[0] === ' '
        || long.split('')[`${long}`.length - 1] === ' '
        || lat.split('')[0] === ' '
        || lat.split('')[`${lat}`.length - 1] === ' '
    ) {
        callback(new Error('设备经/纬度首尾不能包含空字符'));
    }
    else if (Number(long >= -180 && long <= 180 && Number(lat) >= -90 && Number(lat) <= 90)) {
        callback();
    }
    else {
        callback(new Error('内容有误'));
    }
};

export const validateSpace = (rule, value, callback) => {
    value = String(value);
    if (value.split('')[0] === ' ' || value.split('')[`${value}`.length - 1] === ' ') {
        callback(new Error('首尾不能包含空字符'));
    }
    else {
        callback();
    }
};

export const validatorMax32 = (rule, value, callback) => {
    if (value && `${value}`.length > 32) {
        callback(new Error('长度小于32个字符'));
    }
    else {
        callback();
    }
};

export const validatorMax64 = (rule, value, callback) => {
    if (value && `${value}`.length > 64) {
        callback(new Error('长度小于64个字符'));
    }
    else {
        callback();
    }
};

export const validatorMax250 = (rule, value, callback) => {
    if (value && `${value}`.length > 250) {
        callback(new Error('长度小于250个字符'));
    }
    else {
        callback();
    }
};

export const inputNumber = (rule, value, callback) => {
    let patrn = /[^\d]/g;

    if (patrn.test(value)) {
        return callback(new Error('只允许输入数字'));
    }
    callback();

};

export const propNameMap = {
    sn: 'SN号',
    ip: '设备IP',
    device_name: '设备名称',
    device_type: '设备类型',
    bar: '杆件类型',
    control: '管控车道',
    system_type: '系统类型',
    longLatItude: '设备经/纬度',
    device_location: '设备位置',
    status: '使用状态',
    bid_section: '建设标段',
    brand: '品牌',
    use_time: '投入使用时间',
    end_time: '预计报废时间',
    stake_number: '设备桩号',
    asset_code: '资产编码',
    device_no: '机电设备编码',
    device_model: '设备型号',
    detail_location: '设备详细位置',
    road_section: '所属路段',
    unit_price: '单价',
    spare_parts: '是否为备件',
    remarks: '备注',
    device_picture_url: '添加图片',
};

export const defaultTableTitleList = ['device_name', 'stake_number', 'ip', 'brand', 'status', 'use_time', 'end_time'];

export const specialcharacters = (rule, value, callback) => {
    const patrn = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
    const patrn2Str = `[\\uD83C|\\uD83D|\\uD83E][\\uDC00-\\uDFFF][\\u200D|\\uFE0F]|
        [\\uD83C|\\uD83D|\\uD83E][\\uDC00-\\uDFFF]|[0-9|*|#]\\uFE0F\\u20E3|[0-9|#]\\u20E3|[\\u203C-\\u3299]
        \\uFE0F\\u200D|[\\u203C-\\u3299]\\uFE0F|[\\u2122-\\u2B55]|\\u303D|[\\A9|\\AE]\\u3030|\\uA9|\\uAE|\\u3030`;
    const patrn2 = new RegExp(patrn2Str, 'gi');
    if (patrn.test(value) || patrn2.test(value)) {
        return callback(new Error('不允许输入特殊字符及表情'));
    }
    callback();
};

export const validateStakeNumber = (rule, value, callback) => {
    const [kxxx, yyy] = value.split('+');
    let xxx = null;
    if (kxxx && kxxx.includes('k')) {
        xxx = kxxx.split('k')[1];
    }
    if (kxxx && kxxx.includes('K')) {
        xxx = kxxx.split('K')[1];
    }
    if (!kxxx || !yyy || !xxx || Number(xxx) > 1000 || Number(xxx) < 0 || Number(yyy) > 1000 || Number(yyy) < 0) {
        callback(new Error('请输入正确的设备桩号'));
    }
    callback();
};
