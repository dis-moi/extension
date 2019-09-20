import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { OptionsState } from 'app/options/store/reducers';
import { getSubscriptions } from 'app/options/store/selectors/contributors.selectors';
import { isAnUpdateFromLmem } from 'app/background/selectors';
import { StatefulContributor } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions';

const mapStateToProps = (state: OptionsState) => ({
  suggestions: getSubscriptions(state),
  updatedFromLmem: isAnUpdateFromLmem(state)
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
