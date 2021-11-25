import {request} from '@/utils/network-helper/index.js';
export const deviceViewList = async payload => {
    const {data, code} = await request.get('/ihs/monitor/device/info', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};
export const repairTableList = async payload => {
    const {data, code} = await request.post('/ihs/monitor/device/statistics/getRepairRecordList', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};
export const faultList = async payload => {
    const {data, code} = await request.post('/ihs/monitor/device/statistics/getFaultAlarmList', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

export const scrapList = async payload => {
    const {data, code} = await request.post('/ihs/monitor/device/statistics/getScrapRecordList', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

export const scrapLef = async payload => {
    const {data, code} = await request.get('/ihs/monitor/device/statistics/getDeviceLifeCycle', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};


