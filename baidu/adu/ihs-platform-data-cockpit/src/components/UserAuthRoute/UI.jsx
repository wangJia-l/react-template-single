/**
 * @file UserAuthRoute UI
 * @author zhaoyadong
 */
import React from 'react';
import AuthRoute from 'src/components/AuthRoute';
import { USER_ROLE } from 'src/store/model/user/config';

export default function UserAuthRoute(props) {
    return (
        <AuthRoute
            {...{
                ...props,
                getIsAuth(userRole) {
                    return userRole === USER_ROLE.user || userRole === USER_ROLE.admin;
                },
            }}
        />
    );
}
