import { connect } from 'react-redux';
import { OptionsState } from '../../store/reducers';
import {
  getSubscriptions,
  makeGetNContributorsSuggestions
} from '../../store/selectors/contributors.selectors';

const get6Suggestions = makeGetNContributorsSuggestions(6);

const mapStateToProps = (state: OptionsState) => ({
  subscriptions: getSubscriptions(state),
  suggestions6: get6Suggestions(state)
});

export default connect(mapStateToProps);
