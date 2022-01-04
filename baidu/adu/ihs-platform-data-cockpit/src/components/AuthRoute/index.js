/**
 * @file AuthRoute index
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */

import {
    connect,
} from 'react-redux';

import {
    push, replace,
} from 'connected-react-router';

import {
    getUserRole,
    getAuthedPath,
} from 'src/store/model/user/selector';

import UI from './UI';

function mapStateToProps(state, ownProps) {
    const userRole = getUserRole(state);
    const isAuth = ownProps.getIsAuth(userRole);

    const authedPath = getAuthedPath(state);

    return {
        isAuth,
        authedPath,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        redirect(path) {
            dispatch(push(path));
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UI);
