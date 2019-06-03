import { connect } from 'react-redux';
import {
  dismissNotice as dismiss,
  undismissNotice as undismiss,
  confirmDismissNotice as confirmDismiss
} from 'app/actions/notices';
import { getNoticesToDisplay } from '../../../selectors';
import { State } from '../../../store';
import { removeUITitle, setUITitle } from '../../../actions/ui/title';

const mapStateToProps = (state: State) => ({
  notices: getNoticesToDisplay(state)
});

const mapDispatchToProps = {
  dismiss,
  undismiss,
  confirmDismiss,
  setUITitle,
  removeUITitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
