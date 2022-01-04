import { get, post } from 'src/common/request';

// 查看登录的用户信息及权限
export const myInfo = () => {
    const path = '/analysis/auth/myInfo';

    const result = post(
        path,
        {}
    );

    return result;
};

// 账号退出
export const logout = () => {
    const path = '/analysis/account/logout';

    const result = post(
        path,
        {}
    );

    return result;
};