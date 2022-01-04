import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getUser,
} from 'src/store/model/user/selector';
import { roadNameList, intelligentReportInfo, addRedisMsg, queryRedisMsg, exportWord } from './action';
import UI from './UI';

function mapStateToProps(state) {
    return {
        userInfo: getUser(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            roadNameList,
            intelligentReportInfo,
            addRedisMsg,
            queryRedisMsg,
            exportWord,
        }, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UI);
