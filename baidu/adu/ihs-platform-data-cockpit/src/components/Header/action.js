import { createBEAsyncAction } from 'src/common/redux/asyncActionCreator';
import * as api from './api';

export const myInfo = createBEAsyncAction(
    api.myInfo
);

export const logout = createBEAsyncAction(
    api.logout
);
