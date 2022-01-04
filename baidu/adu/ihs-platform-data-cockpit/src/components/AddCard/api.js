import { get } from 'src/common/request';

// 根据类ID查询表信息
export function getTableDicByClass(params) {
    const path = '/analysis/BdaTableInfo/queryBdaTableInfoByStyleGroupId';

    return get(
        path,
        params
    );
}

// 根据类ID查询数据样式
export function getDataDicByClass(params) {
    const path = '/analysis/BdaDataStyle/queryBdaDataStyleByStyleGroupId';

    return get(
        path,
        params
    );
}

