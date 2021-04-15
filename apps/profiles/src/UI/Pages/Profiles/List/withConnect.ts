import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ContributorId } from 'libs/lmem/contributor';
import { subscribe, unsubscribe } from 'libs/store/actions/subscription';
import { getStatefulContributors } from 'apps/profiles/store/selectors';
import { areContributorsLoading } from 'apps/profiles/src/store/selectors/contributors';
import { isConnected } from 'apps/profiles/src/store/selectors/connection';
import {
  areCategoriesLoading,
  getCategories
} from 'apps/profiles/src/store/selectors/categories';
import { ProfilesState } from 'apps/profiles/store/reducers';
import { extensionMessageSender } from 'apps/profiles/src/extensionId';
import { getSubscriptions } from 'apps/profiles/src/store/selectors/subscriptions';

const mapStateToProps = (state: ProfilesState) => ({
  loading: areContributorsLoading(state),
  contributors: getStatefulContributors(state),
  connected: isConnected(state),
  addToBrowser: clickInstallHandler,
  categories: getCategories(state),
  categoriesLoading: areCategoriesLoading(state),
  subscriptions: getSubscriptions(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const receiver = extensionMessageSender;

  return {
    subscribe: (contributorId: ContributorId) =>
      dispatch(subscribe(contributorId, { receiver })),
    unsubscribe: (contributorId: ContributorId) =>
      dispatch(unsubscribe(contributorId, { receiver }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
