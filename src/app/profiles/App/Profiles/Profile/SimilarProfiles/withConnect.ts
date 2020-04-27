import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { StatefulContributor } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import { areContributorsLoading } from 'app/profiles/store/selectors/contributors';
import { ProfilesState } from 'app/profiles/store/reducers';
import {
  getStatefulContributors,
  getSimilarProfiles,
  getSubscribedContributors
} from 'app/profiles/store/selectors';
import createMessageSender from 'app/profiles/createMessageSender';
import extensionId from 'app/profiles/extensionId';

const mapStateToProps = (state: ProfilesState) => ({
  loading: areContributorsLoading(state),
  allContributors: getStatefulContributors(state),
  suggestions: getSimilarProfiles(state).slice(0, 5),
  subscriptions: getSubscribedContributors(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const receiver = createMessageSender({ id: extensionId });
  return {
    subscribe: (contributor: StatefulContributor) => () =>
      dispatch(subscribe(contributor.id, { receiver })),
    unsubscribe: (contributor: StatefulContributor) => () =>
      dispatch(unsubscribe(contributor.id, { receiver })),
    seeMore: () => dispatch(push('/les-contributeurs'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
