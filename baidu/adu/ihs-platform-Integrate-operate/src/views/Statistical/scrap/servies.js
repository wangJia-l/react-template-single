import {request} from '@/utils/network-helper/index.js';
// 查询列表
export const scrapList = async payload => {
    const {data, code} = await request.post('/ihs/monitor/device/statistics/getScrapRecordList', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

export const scrapExportList = async payload => {
    const {data, code} = await request.post('/ihs/monitor/device/statistics/getFaultAlarmList', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};
