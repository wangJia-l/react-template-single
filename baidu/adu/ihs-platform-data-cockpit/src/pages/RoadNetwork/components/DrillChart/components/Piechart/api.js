import { post } from 'src/common/request';

// 根据类ID查询表信息
export function getSpaceType(params) {
    const path = '/analysis/eventdrilling/type';

    return post(
        path,
        params
    );
}