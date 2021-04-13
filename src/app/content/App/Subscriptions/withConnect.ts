import { connect } from 'react-redux';
import i18n from 'i18next';
import onContributorClick from '../../actions/goToContributor';
import { ContentState } from '../../store';
import { optionsRequested } from 'app/actions/options';
import {
  getNbTotalContributors,
  getSubscriptions
} from 'app/store/selectors/contributors.selectors';

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
