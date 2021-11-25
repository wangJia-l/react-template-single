import {request} from '@/utils/network-helper/index.js';
// 查询列表
export const faultList = async payload => {
    const {data, code} = await request.post('/ihs/monitor/device/statistics/getFaultAlarmList', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

export const exportList = async payload => {
    const {data, code} = await request.post('/ihs/monitor/device/statistics/exportFaultAlarmList', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

export const pulleList = async payload => {
    const {data, code} = await request.get('ihs/monitor/device/query/type', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};
