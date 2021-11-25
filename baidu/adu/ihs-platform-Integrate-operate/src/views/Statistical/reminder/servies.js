import {request} from '@/utils/network-helper/index.js';
// 查询列表
export const reminderList = async payload => {
    const {data, code} = await request.post('/ihs/monitor/device/statistics/getMaintenanceRemindList', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

export const reminderExportList = async payload => {
    const {data, code} = await request.post('/ihs/monitor/device/statistics/getFaultAlarmList', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};
