import { connect } from 'react-redux';
import { ProfilesState } from 'app/profiles/store/reducers';
import { isConnected } from '../../store/selectors/connection';

const mapStateToProps = (state: ProfilesState) => ({
  connected: isConnected(state)
});

export default connect(mapStateToProps);
