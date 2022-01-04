import createAction from 'src/common/redux/actionCreator';
import { createBEAsyncAction } from 'src/common/redux/asyncActionCreator';
import * as api from './api';

export const exportExcel = createBEAsyncAction(
    api.exportExcel
);

export const exportTXT = createBEAsyncAction(
    api.exportTXT
);

export const exportCSV = createBEAsyncAction(
    api.exportCSV
);
