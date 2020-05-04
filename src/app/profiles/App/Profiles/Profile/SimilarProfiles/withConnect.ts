import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { StatefulContributor } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  areContributorsLoading,
  getContributors
} from 'app/profiles/store/selectors';
import { ProfilesState } from 'app/profiles/store/reducers';

const mapStateToProps = (state: ProfilesState) => ({
  loading: areContributorsLoading(state),
  allContributors: getContributors(state),
  suggestions: getContributors(state),
  subscriptions: []
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribe: (contributor: StatefulContributor) => () =>
    dispatch(subscribe(contributor, { sendToBackground: true })),
  unsubscribe: (contributor: StatefulContributor) => () =>
    dispatch(unsubscribe(contributor, { sendToBackground: true })),
  seeMore: () => dispatch(push('/les-contributeurs'))
});

export default connect(mapStateToProps, mapDispatchToProps);
