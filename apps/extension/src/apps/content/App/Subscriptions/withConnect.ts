import { connect } from 'react-redux';
import { optionsRequested } from '../../../../../../../libs/store/actions/options';
import onContributorClick from '../../actions/goToContributor';
import { ContentState } from '../../store';
import {
  getNbTotalContributors,
  getSubscriptions
} from 'libs/store/selectors/contributors.selectors';
import i18n from 'i18next';

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
