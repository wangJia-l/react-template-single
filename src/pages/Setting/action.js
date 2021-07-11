/**
* @file 更新配置 - action
* @author zhaoyadong (zhaoyadong@baidu.com)
*/
import createAction from 'src/common/redux/actionCreator';
import { createBEAsyncAction } from 'src/common/redux/asyncActionCreator';
import * as api from './api';

export const SET_SETTINGS = 'SET_SETTINGS';
export const setSettings = createBEAsyncAction(
    api.setSettings,
    SET_SETTINGS
);

export const RESET_SETTINGS = 'RESET_SETTINGS';
export const resetSettings = createAction(RESET_SETTINGS);
