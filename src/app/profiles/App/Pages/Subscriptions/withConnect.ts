import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ContributorId, findContributorIn } from 'libs/domain/contributor';
import { subscribe, unsubscribe } from 'libs/store/actions/subscription';
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
  subscribedContributors: getSubscribedContributors(state).map(
    findContributorIn(getStatefulContributors(state))
  ),
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
