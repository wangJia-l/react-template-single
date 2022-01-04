import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    getUser,
} from 'src/store/model/user/selector';
import { } from 'src/store/model/user/action';
import UI from './UI';

function mapStateToProps(state) {
    return {
        userInfo: getUser(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
        }, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UI);