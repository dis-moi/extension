import { connect } from 'react-redux';

import ContributionSubmittedScreen from './ContributionSubmittedScreen';
import { history, State } from 'app/content/store';
import { close } from 'app/actions/ui';
import { getContribution } from 'app/content/selectors';
import { go, replace } from 'connected-react-router';

const mapDispatchToProps = {
  close,
  goBack: () => replace('/')
};

export default connect(
  (state: State) => ({
    contribution: getContribution(state)
  }),
  mapDispatchToProps
)(ContributionSubmittedScreen);
