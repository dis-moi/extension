import { connect } from 'react-redux';
import { dismissNotice, undismissNotice } from 'app/actions/notices';
import { getNoticesToDisplay } from '../../../selectors';
import { State } from '../../../store';
import { removeUITitle, setUITitle } from '../../../actions/ui/title';

const mapStateToProps = (state: State) => ({
  notices: getNoticesToDisplay(state)
});

const mapDispatchToProps = {
  dismiss: dismissNotice,
  undismiss: undismissNotice,
  setUITitle,
  removeUITitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
