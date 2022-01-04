import { get, post } from 'src/common/request';

// 查询指定主题下所有卡片信息
export function queryCardList(params) {
    const path = '/analysis/BdaCardInfo/queryBdaCardInfoBySubject';

    return get(
        path,
        params
    );
}

// 批量更新指定主题下卡片信息
export function updateLayoutBatch(data) {
    const path = '/analysis/BdaCardInfo/modifyBdaCardLayoutListBySubject';

    return post(
        path,
        data
    );
}

// 恢复指定主题默认卡片
export function restoreDefaultLayout(data) {
    const path = '/analysis/BdaCardInfo/restoreDefaultSubjectLayout';

    return post(
        path,
        data
    );
}

// 修改数据表描述信息
export function updateTableInfo(data) {
    const path = '/analysis/BdaTableInfo/modifyBdaTableInfo';

    return post(
        path,
        data
    );
}

// 修改卡片名称
export function updateCardName(data) {
    const path = '/analysis/BdaCardInfo/modifyCardName';

    return post(
        path,
        data
    );
}

// Excel文件导出
export function exportExcel(params) {
    const path = '/analysis/ServiceArea/subjectDataExportExcel';
    const extraOptions = {
        responseType: 'blob',
    };
    return post(
        path,
        params,
        extraOptions
    );
}

// TXT文件导出
export function exportTXT(params) {
    const path = '/analysis/ServiceArea/subjectDataExportTxt';
    const extraOptions = {
        responseType: 'blob',
    };

    return post(
        path,
        params,
        extraOptions
    );
}

// CSV文件导出
export function exportCSV(params) {
    const path = '/analysis/ServiceArea/subjectDataExportCsv';
    const extraOptions = {
        responseType: 'blob',
    };

    return post(
        path,
        params,
        extraOptions
    );
}