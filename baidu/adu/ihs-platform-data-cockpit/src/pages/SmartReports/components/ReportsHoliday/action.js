import createAction from 'src/common/redux/actionCreator';
import { createBEAsyncAction } from 'src/common/redux/asyncActionCreator';
import * as api from './api';

export const roadNameList = createBEAsyncAction(
    api.roadNameList
);

export const intelligentReportInfo = createBEAsyncAction(
    api.intelligentReportInfo
);

export const addRedisMsg = createBEAsyncAction(
    api.addRedisMsg
);

export const queryRedisMsg = createBEAsyncAction(
    api.queryRedisMsg
);

export const exportWord = createBEAsyncAction(
    api.exportWord
);
