import { connect } from 'react-redux';
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

const mapDispatchToProps = {
  subscribe,
  unsubscribe
};

export default connect(mapStateToProps, mapDispatchToProps);
