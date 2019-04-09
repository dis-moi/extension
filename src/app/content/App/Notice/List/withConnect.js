import { connect } from 'react-redux';
import { dismissNotice, undismissNotice } from '../../../actions/recommendations';
import { close } from '../../../actions/ui';
import { getFilteredNotices } from '../../../selectors';

const mapStateToProps = state => ({
  notices: getFilteredNotices(state),
});

const mapDispatchToProps = {
  dismiss: dismissNotice,
  undismiss: undismissNotice,
  close,
};

export default connect(mapStateToProps, mapDispatchToProps);
