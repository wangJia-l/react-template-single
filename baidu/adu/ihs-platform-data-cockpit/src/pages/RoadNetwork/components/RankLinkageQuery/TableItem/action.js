import createAction from 'src/common/redux/actionCreator';
import { createBEAsyncAction } from 'src/common/redux/asyncActionCreator';
import * as api from './api';

export const jamPlaceList = createBEAsyncAction(
    api.jamPlaceList
);

export const jamWeekList = createBEAsyncAction(
    api.jamWeekList
);

export const jamDateTime = createBEAsyncAction(
    api.jamDateTime
);

export const eventPlaceList = createBEAsyncAction(
    api.eventPlaceList
);

export const eventTypeList = createBEAsyncAction(
    api.eventTypeList
);

export const eventDateTime = createBEAsyncAction(
    api.eventDateTime
);

