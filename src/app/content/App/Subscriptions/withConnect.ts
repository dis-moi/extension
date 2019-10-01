import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { optionsRequested } from 'app/actions/options';
import { ContentState } from '../../store';
import {
  getNbSubscribedContributors,
  getNbTotalContributors
} from '../../selectors/contributors.selectors';

const mapStateToProps = (state: ContentState) => ({
  nbTotalContributors: getNbTotalContributors(state),
  nbSubscribedContributors: getNbSubscribedContributors(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openSubscriptions: () => dispatch(optionsRequested('/settings/subscriptions'))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
