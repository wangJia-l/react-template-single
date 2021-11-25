import {request} from '@/utils/network-helper/index.js';

export const deviceEditList = async payload => {
    const data = await request.post('/ihs/monitor/device/update', payload);
    if (data) {
        return data;
    }
    return {};
};

export const deviceViewList = async payload => {
    const {data, code} = await request.get('/ihs/monitor/device/info', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};
