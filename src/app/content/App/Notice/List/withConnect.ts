import { connect } from 'react-redux';
import { dismissNotice, undismissNotice } from 'app/actions/notices';
import { getNoticesToDisplay } from '../../../selectors';
import { State } from '../../../store';

const mapStateToProps = (state: State) => ({
  notices: getNoticesToDisplay(state)
});

const mapDispatchToProps = {
  dismiss: dismissNotice,
  undismiss: undismissNotice
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
