import { post } from 'src/common/request';

// 根据类ID查询表信息
export function getSpaceTime(params) {
    const path = '/analysis/eventdrilling/spatiotemporal';

    return post(
        path,
        params
    );
}