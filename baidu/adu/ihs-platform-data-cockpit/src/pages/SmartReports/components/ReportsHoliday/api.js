import { get, post } from 'src/common/request';

// 路段名称 - 字典
export function roadNameList(params) {
    const path = '/analysis/intelligentReport/roadNameList';

    return get(
        path,
        params
    );
}

// 智能报表-车流量信息管理
export function intelligentReportInfo(params) {
    const path = '/analysis/intelligentReport/intelligentReportInfo';

    return post(
        path,
        params
    );
}

// 备注缓存
export function addRedisMsg(params) {
    const path = '/analysis/ServiceArea/addRedisMsg';

    return post(
        path,
        params
    );
}

// 备注缓存
export function queryRedisMsg(params) {
    const path = '/analysis/ServiceArea/queryRedisMsg';

    return get(
        path,
        params
    );
}

// 导出word
export function exportWord(params) {
    const path = '/analysis/intelligentReport/export';

    return get(
        path,
        params
        // {
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //     },
        // }
    );
}
