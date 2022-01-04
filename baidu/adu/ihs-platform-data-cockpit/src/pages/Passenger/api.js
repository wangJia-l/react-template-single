import { get } from 'src/common/request';

// 查询指定主题下所有卡片信息
export function queryCardList(params) {
    const path = '/analysis/BdaCardInfo/queryBdaCardInfoBySubject';

    return get(
        path,
        params
    );
}

