import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { optionsRequested } from 'app/actions/options';
import { ContentState } from '../../store';
import {
  getNbTotalContributors,
  getSubscriptions
} from 'app/options/store/selectors/contributors.selectors';
import { push } from 'connected-react-router';

const mapStateToProps = (state: ContentState) => ({
  nbTotalContributors: getNbTotalContributors(state),
  subscribedContributors: getSubscriptions(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  openSubscriptions: () =>
    dispatch(optionsRequested('/settings/subscriptions')),
  clickContributor: (id: number) => dispatch(push(`/contributor/${id}`))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
