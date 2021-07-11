import { createSelector } from 'reselect';
import { USER_ROLE } from './config';

export function getUser(state) {
    // console.log('selector::', state);
    return state.user;
}

export const getUserRole = createSelector(
    getUser,
    user => {
        // 超管
        if (user.role) {
            return user.role;
        }

        // 一般推广帐号
        return '';
    }
);

// 获取当前用户 type 对应的 fallback path，用来在用户访问受限内容时，前端路径进行 redirect
export const getAuthedPath = createSelector(
    getUser,
    user => {
        const userAuth = user.role;

        // 管理员账号
        if (userAuth === USER_ROLE.admin) {
            return '/';
        }

        // 普通用户
        if (userAuth === USER_ROLE.user) {
            return '/setting';
        }

        // 其他情况 fallback 到 noauth
        return '/noauth';
    }
);
