import { connect } from 'react-redux';
import { optionsRequested } from 'app/actions/options';
import { ContentState } from '../../store';
import {
  getNbSubscribedContributors,
  getNbTotalContributors
} from '../../selectors/contributors.selectors';

const mapStateToProps = (state: ContentState) => ({
  nbTotalContributors: getNbTotalContributors(state),
  nbSubscribedContributors: getNbSubscribedContributors(state)
});

const mapDispatchToProps = {
  optionsRequested: optionsRequested
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
