import {
    createBEAsyncAction,
} from 'src/common/redux/asyncActionCreator';

import * as api from './api';

export const RECEIVE_USER = 'RECEIVE_USER';

export const fetchUser = createBEAsyncAction(
    api.getUser,
    RECEIVE_USER
);
