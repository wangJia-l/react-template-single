import createAction from 'src/common/redux/actionCreator';
import { createBEAsyncAction } from 'src/common/redux/asyncActionCreator';
import * as api from './api';

export const queryCardList = createBEAsyncAction(
    api.queryCardList
);

export const updateLayoutBatch = createBEAsyncAction(
    api.updateLayoutBatch
);

export const restoreDefaultLayout = createBEAsyncAction(
    api.restoreDefaultLayout
);

export const updateTableInfo = createBEAsyncAction(
    api.updateTableInfo
);

export const updateCardName = createBEAsyncAction(
    api.updateCardName
);

export const exportExcel = createBEAsyncAction(
    api.exportExcel
);

export const exportTXT = createBEAsyncAction(
    api.exportTXT
);

export const exportCSV = createBEAsyncAction(
    api.exportCSV
);