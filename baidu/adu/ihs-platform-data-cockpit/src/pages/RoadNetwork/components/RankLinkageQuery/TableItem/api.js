import { get, post } from 'src/common/request';

// 拥堵高发地点排名
export function jamPlaceList(params) {
    const path = '/analysis/rankAndLinkage/jamPlace';

    return post(path, params);
}

// 拥堵高发周排名

export function jamWeekList(params) {
    const path = '/analysis/rankAndLinkage/jamWeek';

    return post(path, params);
}

// 拥堵高发时段排名

export function jamDateTime(params) {
    const path = '/analysis/rankAndLinkage/jamDatetime';

    return post(path, params);
}

// 事件高发地排名

export function eventPlaceList(params) {
    const path = '/analysis/rankAndLinkage/eventPlace';

    return post(path, params);
}

// 事件高发类型排名

export function eventTypeList(params) {
    const path = '/analysis/rankAndLinkage/eventType';

    return post(path, params);
}

// 事件高发时段排名

export function eventDateTime(params) {
    const path = '/analysis/rankAndLinkage/eventDatetime';

    return post(path, params);
}