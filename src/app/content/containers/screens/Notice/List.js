import { connect } from 'react-redux';

import List from '../../../components/screens/Notice/List';
import { getFilteredNotices } from '../../../selectors';
import { dismissNotice } from '../../../actions/recommendations';
import { close } from '../../../actions/ui';

const mapStateToProps = state => ({
  notices: getFilteredNotices(state),
});

const mapDispatchToProps = {
  dismiss: dismissNotice,
  close,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
