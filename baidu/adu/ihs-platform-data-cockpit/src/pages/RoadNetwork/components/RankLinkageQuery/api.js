import { get, post } from 'src/common/request';

// 拥堵高发地点的详情查询
export function jamPlaceInfo(params) {
    const path = '/analysis/rankAndLinkage/jamPlaceInfo';

    return post(path, params);
}

// 拥堵高发周详情

export function jamWeekInfo(params) {
    const path = '/analysis/rankAndLinkage/jamWeekInfo';

    return post(path, params);
}

// 拥堵高发时段详情

export function jamDatetimeInfo(params) {
    const path = '/analysis/rankAndLinkage/jamDatetimeInfo';

    return post(path, params);
}

// 事件高发地详情

export function eventPlaceInfo(params) {
    const path = '/analysis/rankAndLinkage/eventPlaceInfo';

    return post(path, params);
}

// 事件高发类型详情

export function eventTypeInfo(params) {
    const path = '/analysis/rankAndLinkage/eventTypeInfo';

    return post(path, params);
}

// 事件高发时段详情

export function eventDatetimeInfo(params) {
    const path = '/analysis/rankAndLinkage/eventDatetimeInfo';

    return post(path, params);
}

