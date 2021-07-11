/**
 * @file AdminAuthRoute UI
 * @author zhaoyadong
 */
import React from 'react';
import AuthRoute from 'src/components/AuthRoute';
import { USER_ROLE } from 'src/store/model/user/config';

export default function AdminAuthRoute(props) {
    return (
        <AuthRoute
            {
                ...{
                    ...props,
                    getIsAuth(userRole) {
                        return userRole === USER_ROLE.admin;
                    },
                }
            }
        />
    );
}
