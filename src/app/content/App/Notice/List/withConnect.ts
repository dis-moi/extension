import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
  dismissNotice as dismiss,
  undismissNotice as undismiss,
  confirmDismissNotice as confirmDismiss
} from 'app/actions/notices';
import { getNoticesToDisplay } from 'app/content/selectors';
import { ContentState } from 'app/content/store';

const mapStateToProps = (state: ContentState) => ({
  notices: getNoticesToDisplay(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dismiss: (id: number) => dispatch(dismiss(id)),
  undismiss: (id: number) => dispatch(undismiss(id)),
  confirmDismiss: (id: number) => dispatch(confirmDismiss(id)),
  clickContributor: (id: number) => dispatch(push(`/contributor/${id}`))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
