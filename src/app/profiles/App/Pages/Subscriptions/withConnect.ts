import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ContributorId } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import { ProfilesState } from 'app/profiles/store/reducers';
import {
  getStatefulContributors,
  getSubscribedContributors
} from 'app/profiles/store/selectors';
import { isConnected } from 'app/profiles/store/selectors/connection';
import {
  areCategoriesLoading,
  getCategories
} from 'app/profiles/store/selectors/categories';
import { extensionMessageSender } from 'app/profiles/extensionId';

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
