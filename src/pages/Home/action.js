// import createAction from 'src/common/redux/actionCreator';
import { createBEAsyncAction } from 'src/common/redux/asyncActionCreator';
import * as api from './api';

export const fetchSlider = createBEAsyncAction(
    api.fetchSlider
);
