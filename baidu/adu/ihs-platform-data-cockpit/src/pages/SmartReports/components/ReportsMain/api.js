import { get, post } from 'src/common/request';

// 查询指定所有主题下卡片信息
export function queryCardsList(params) {
    const path = '/analysis/BdaCardInfo/queryCardAllGroupSubject';

    return get(
        path,
        params
    );
}

// 更新卡片备注文案
export function updateCardWords(params) {
    const path = '/analysis/BdaCardInfo/modifyCardExplain';

    return post(
        path,
        params
    );
}