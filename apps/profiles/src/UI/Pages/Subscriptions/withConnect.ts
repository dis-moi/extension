import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ContributorId } from 'libs/lmem/contributor';
import { subscribe, unsubscribe } from 'libs/store/actions/subscription';
import { ProfilesState } from 'apps/profiles/store/reducers';
import {
  getStatefulContributors,
  getSubscribedContributors
} from 'apps/profiles/store/selectors';
import { isConnected } from 'apps/profiles/src/store/selectors/connection';
import {
  areCategoriesLoading,
  getCategories
} from 'apps/profiles/src/store/selectors/categories';
import { extensionMessageSender } from 'apps/profiles/src/extensionId';

const mapStateToProps = (state: ProfilesState) => ({
  subscriptions: getSubscribedContributors(state),
  contributors: getStatefulContributors(state),
  connected: isConnected(state),
  categories: getCategories(state),
  categoriesLoading: areCategoriesLoading(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribe: (contributorId: ContributorId) =>
    dispatch(subscribe(contributorId, { receiver: extensionMessageSender })),
  unsubscribe: (contributorId: ContributorId) =>
    dispatch(unsubscribe(contributorId, { receiver: extensionMessageSender }))
});

export default connect(mapStateToProps, mapDispatchToProps);
