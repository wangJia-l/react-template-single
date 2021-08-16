import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminAuthRoute from 'src/components/AdminAuthRoute';
import UserAuthRoute from 'src/components/UserAuthRoute';
import App from 'src/layouts/App';
import Home from 'src/pages/Home';
import List from 'src/pages/List';
import Setting from 'src/pages/Setting';
import Admin from 'src/pages/Admin';
import NoAuth from 'src/pages/NoAuth';
import history from './history';

const BasicRoute = () => (
    <App component={App} history={history}>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/list" component={List} />
            <Route exact path="/noauth" component={NoAuth} />

            <UserAuthRoute
                {...{
                    path: '/setting',
                    component: Setting,
                }}
            />
            <AdminAuthRoute
                {...{
                    path: '/admin',
                    component: Admin,
                }}
            />
            {/* <Redirect path="/*" to="/404" /> */}
        </Switch>
    </App>
);

export default BasicRoute;
