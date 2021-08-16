import React from 'react';
import {
    Route,
} from 'react-router-dom';

export default function AuthRoute({
    component: Component,
    isAuth,
    redirect,
    authedPath,
    ...restProps
}) {
    if (!isAuth) {
        // prevent 'update during an existing state transition (such as within `render`)'
        setTimeout(() => {
            redirect(authedPath);
            // redirect('/noauth');
        }, 0);
        return null;
    }

    return (
        <Route
            {...restProps}
            render={props => (isAuth
                ? (
                    <Component
                        {...props}
                    />
                )
                : null)}
        />
    );
}
