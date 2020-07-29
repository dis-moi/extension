import { connect } from 'react-redux';
import { optionsRequested } from 'app/actions/options';
import onContributorClick from '../../actions/goToContributor';
import { ContentState } from '../../store';
import {
  getNbTotalContributors,
  getSubscriptions
} from 'app/store/selectors/contributors.selectors';

const openSubscriptions = () => optionsRequested();

const mapStateToProps = (state: ContentState) => ({
  nbTotalContributors: getNbTotalContributors(state),
  subscribedContributors: getSubscriptions(state)
});

const mapDispatchToProps = {
  openSubscriptions,
  onContributorClick
};

export default connect(mapStateToProps, mapDispatchToProps);
