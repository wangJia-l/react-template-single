import {request} from '@/utils/network-helper/index.js';
// 查询列表
export const deviceList = async payload => {
    const {data, code} = await request.post('/ihs/monitor/device/list/new', payload);
    if (+code === 0 && data) {
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

// 侧边栏字典
export const sideBar = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/device/side/bar', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};

// 下拉字典-集合
export const pullDics = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/device/pull/dow', payload);
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

// 设置列表字典
export const setListDic = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/device/set/list', payload);
    if (+code === 0 && data) {
        return data;
    }
    return [];
};

// 报废处置-提交
export const scrapDisposal = async (payload = {}) => {
    const {code, msg, data} = await request.post('/ihs/monitor/device/statistics/scrapDisposal', payload);
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

export const getModletypeById = async (payload = {}) => {
    const {data, code} = await request.get('/ihs/monitor/device/query/type', payload);
    if (+code === 0 && data) {
        return data;
    }
    return {};
};
