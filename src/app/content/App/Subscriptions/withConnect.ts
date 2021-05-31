import { connect } from 'react-redux';
import i18n from 'i18next';
import { optionsRequested } from 'libs/store/actions/options';
import {
  getNbTotalContributors,
  getSubscriptions
} from 'libs/store/selectors/contributors.selectors';
import { ContentState } from 'app/content/store/reducers';
import onContributorClick from '../../store/actions/goToContributor';

const openSubscriptions = () =>
  optionsRequested({ pathname: i18n.t('path.profiles.contributors') });

const mapStateToProps = (state: ContentState) => ({
  nbTotalContributors: getNbTotalContributors(state),
  subscribedContributors: getSubscriptions(state)
});

const mapDispatchToProps = {
  openSubscriptions,
  onContributorClick
};

export default connect(mapStateToProps, mapDispatchToProps);
