/**
 * @file 绑定账号 - 登录账号 - api
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */

import { post } from 'src/common/request';

export function setSettings(params) {
    const path = '/setSettings';
    return post(
        path,
        params
    );
}
