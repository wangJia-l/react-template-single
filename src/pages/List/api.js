/**
 * @file List api
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */

import { get } from 'src/common/request';

// 获取API列表
export function fetchList(params) {
    const path = `/nxt_market/web/list/products/${params.cid}`;
    delete params.cid;

    return get(
        path,
        params
    );
}
