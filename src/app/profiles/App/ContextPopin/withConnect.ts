import { ProfilesState } from '../../store/reducers';
import { getContextPopinContent } from '../../store/selectors/contextPopin';
import { setContextPopin } from '../../store/actions/contextPopin';
import { ContextPopinState } from '../../store/reducers/contextPopin.reducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = (state: ProfilesState) => ({
  contextPopin: getContextPopinContent(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setContextPopin: (payload: ContextPopinState) =>
    dispatch(setContextPopin(payload))
});

export default connect(mapStateToProps, mapDispatchToProps);
