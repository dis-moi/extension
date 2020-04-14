import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StatefulContributor } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  areContributorsLoading,
  getContributors
} from 'app/profiles/store/selectors';
import { ProfilesState } from 'app/profiles/store/reducers';

const mapStateToProps = (state: ProfilesState) => ({
  loading: areContributorsLoading(state),
  contributors: getContributors(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribe: (contributor: StatefulContributor) => () =>
    dispatch(subscribe(contributor, { sendToBackground: true })),
  unsubscribe: (contributor: StatefulContributor) => () =>
    dispatch(unsubscribe(contributor, { sendToBackground: true }))
});

export default connect(mapStateToProps, mapDispatchToProps);
