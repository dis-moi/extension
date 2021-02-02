import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ContributorId } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import { getStatefulContributors } from 'app/profiles/store/selectors';
import { areContributorsLoading } from 'app/profiles/store/selectors/contributors';
import { isConnected } from 'app/profiles/store/selectors/connection';
import {
  areCategoriesLoading,
  getCategories
} from 'app/profiles/store/selectors/categories';
import { ProfilesState } from 'app/profiles/store/reducers';
import { extensionMessageSender } from 'app/profiles/extensionId';

const mapStateToProps = (state: ProfilesState) => ({
  loading: areContributorsLoading(state),
  contributors: getStatefulContributors(state),
  connected: isConnected(state),
  addToBrowser:
    typeof clickInstallHandler !== 'undefined'
      ? clickInstallHandler
      : () => null,
  categories: getCategories(state),
  categoriesLoading: areCategoriesLoading(state)
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
