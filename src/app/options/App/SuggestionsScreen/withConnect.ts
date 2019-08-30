import { connect } from 'react-redux';
import { OptionsState } from '../../store/reducers';
import {
  getContributorsSuggestions,
  makeGetNContributorsSuggestions
} from '../../store/selectors/contributors.selectors';
import { Dispatch } from 'redux';
import { StatefulContributor } from '../../../lmem/contributor';
import { subscribe, unsubscribe } from '../../../actions/subscription';

const get6Suggestions = makeGetNContributorsSuggestions(6);

const mapStateToProps = (state: OptionsState) => ({
  suggestions: getContributorsSuggestions(state),
  suggestions6: get6Suggestions(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  subscribe: (contributor: StatefulContributor) => () =>
    dispatch(subscribe(contributor, { sendToBackground: true })),
  unsubscribe: (contributor: StatefulContributor) => () =>
    dispatch(unsubscribe(contributor, { sendToBackground: true }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
