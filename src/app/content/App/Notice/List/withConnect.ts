import { connect } from 'react-redux';
import { dismissNotice, undismissNotice } from 'app/actions/recommendations';
import { close } from 'app/actions/ui';
import { getFilteredNotices } from '../../../selectors';
import { State } from '../../../store';

const mapStateToProps = (state: State) => ({
  notices: getFilteredNotices(state)
});

const mapDispatchToProps = {
  dismiss: dismissNotice,
  undismiss: undismissNotice,
  close
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
