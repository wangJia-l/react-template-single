import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    getUser,
} from 'src/store/model/user/selector';
import {
    queryCardList,
    exportExcel,
    exportTXT,
    exportCSV,
} from 'src/common/request/common/action';
import UI from './UI';

function mapStateToProps(state) {
    return {
        userInfo: getUser(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({
            queryCardList,
            exportExcel,
            exportTXT,
            exportCSV,
        }, dispatch),
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UI);
