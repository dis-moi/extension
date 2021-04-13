import { connect } from 'react-redux';
import { isConnected } from '../../store/selectors/connection';
import { ProfilesState } from 'app/profiles/store/reducers';

const mapStateToProps = (state: ProfilesState) => ({
  connected: isConnected(state)
});

export default connect(mapStateToProps);
