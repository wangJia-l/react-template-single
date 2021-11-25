import {request} from '@/utils/network-helper/index.js';

// 查看登录的用户信息及权限
export const getMyInfo = async (payload = {}) => {
    const {data, code, msg} = await request.post('/ihs/admin/auth/myInfo', payload);
    if (+code === 0 && data) {
        return data;
    }
    return msg;
};

// 设备信息总览
export const deviceStaInfo = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/dynamic/statistics', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

// 查询收费站与服务区信息
export const stationAndServiceinfo = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/dynamic/station/service', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

// 使用时长统计
export const useTimeInfo = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/dynamic/use/time', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

// 设备分布情况
export const deviceDistriInfo = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/dynamic/distribution', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

// 设备改造情况
export const deviceReformInfo = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/dynamic/reform', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

// 7日故障数据分析
export const dataAnalysisInfo = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/dynamic/data/analysis', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

// 7日故障类型统计
export const typeAnalysisInfo = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/dynamic/fault', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

// 查询设备信息 - id
export const deviceInfo = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/device/info', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

// 查询设备信息 - uid
export const deviceInfoByUid = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/device/info/uid', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

// 编辑设备信息
export const deviceUpdate = async (payload = {}) => {
    const {data, code, msg} = await request.post('/ihs/monitor/device/update', payload);
    if (+code === 0 && data) {
        return {
            flag: true,
        };
    }
    return {
        flag: false,
        msg,
    };
};

// 7日故障类型统计
export const deletePicture = async (payload = {}) => {
    const {data, code, msg} = await request.get('/device/delete/picture', payload);
    if (+code === 0 && data) {
        return {
            flag: true,
        };
    }
    return {
        flag: false,
        msg,
    };
};

// 收费站与服务区编辑
export const staAndSerUpdate = async (payload = {}) => {
    const {data, code, msg} = await request.post('/ihs/monitor/dynamic/station/service/update', payload);
    if (+code === 0 && data) {
        return {
            flag: true,
        };
    }
    return {
        flag: false,
        msg,
    };
};

// 修改设备信息
export const deviceUpdateForMap = async params => {
    const {Code, Msg} = await request.post('/dataserver/device/update', params);
    if (Code === 200) {
        return {
            flag: true,
        };
    }
    return {
        flag: false,
        msg: Msg,
    };
};

// 根据系统获取设备信息
export const getDeviceCountBySystem = async params => {
    const {data, code} = await request.get('/ihs/monitor/device/get/count', params);
    if (code === 0) {
        return data;
    }
    return {};
};

// 获取设备的使用时常
export const getDeviceUseTime = async params => {
    const {data, code} = await request.get('/ihs/monitor/device/line', params);
    if (code === 0) {
        return data;
    }
    return {};
};

// 设备空间分布数量
export const getDeviceSpace = async params => {
    const {data, code} = await request.get('/ihs/monitor/device/space', params);
    if (code === 0) {
        return data;
    }
    return {};
};

// 设备故障率分布区间
export const getFaultSpaceDistribution = async params => {
    const {data, code} = await request.get('ihs/monitor/device/statistics/getFaultSpaceDistribution', params);
    if (code === 0) {
        return data;
    }
    return {};
};

// 设备年度维修次数年份
export const getDeviceRepairStatisticsYear = async params => {
    const {data, code} = await request.get('/ihs/monitor/device/statistics/getDeviceRepairStatisticsYear', params);
    if (code === 0) {
        return data;
    }
    return {};
};

// 设备维修次数
export const getDeviceRepairCount = async params => {
    const {data, code} = await request.get('/ihs/monitor/device/statistics/getDeviceRepairCount', params);
    if (code === 0) {
        return data;
    }
    return {};
};

// 设备品牌列表
export const getDeviceBrandStatistics = async params => {
    const {data, code} = await request.get('/ihs/monitor/device/statistics/getDeviceBrandStatistics', params);
    if (code === 0) {
        return data;
    }
    return {};
};

// 通过系统查询设备类型
export const getDeviceTypeBySystem = async params => {
    const {data, code} = await request.get('/ihs/monitor/device/type', params);
    if (code === 0) {
        return data;
    }
    return {};
};

// 删除设备
export const deleteDevice = async (payload = {}) => {
    const {data, code, msg} = await request.get('/ihs/monitor/device/delete', payload);
    if (+code === 0 && data) {
        return {
            flag: true,
        };
    }
    return {
        flag: false,
        msg,
    };
};
