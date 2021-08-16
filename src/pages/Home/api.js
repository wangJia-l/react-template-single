import { get } from 'src/common/request';

// 查询首页的轮播图数据
export function fetchSlider(params) {
    const path = '/nxt_market/api_store/slider';

    const result = get(
        path,
        params
    );

    return result;
}
