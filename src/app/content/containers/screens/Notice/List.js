import { connect } from 'react-redux';

import List from '../../../components/screens/Notice/List';
import { getFilteredNotices } from '../../../selectors';
import { dismissNotice, undismissNotice } from '../../../actions/recommendations';
import { close } from '../../../actions/ui';

const mapStateToProps = state => ({
  notices: getFilteredNotices(state),
});

const mapDispatchToProps = {
  dismiss: dismissNotice,
  undismiss: undismissNotice,
  close,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
