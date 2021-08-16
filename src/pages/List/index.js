import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getUser,
} from 'src/store/model/user/selector';
import { fetchUser } from 'src/store/model/user/action';
import UI from './UI';
import { fetchList } from './action';

function mapStateToProps(state) {
    return {
        userInfo: getUser(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            fetchUser,
        }, dispatch),

        fetchList(params) {
            return dispatch(fetchList(params));
        },
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UI);
