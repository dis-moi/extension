import { connect } from 'react-redux';
import { SettingsState } from '../../store/reducers';
import {
  getContributorsSuggestions,
  makeGetNContributorsSuggestions
} from '../../store/selectors/contributors.selectors';

const get6Suggestions = makeGetNContributorsSuggestions(6);

const mapStateToProps = (state: SettingsState) => ({
  suggestions: getContributorsSuggestions(state),
  suggestions6: get6Suggestions(state)
});

export default connect(mapStateToProps);
