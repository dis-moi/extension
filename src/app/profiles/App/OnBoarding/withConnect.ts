import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ProfilesState } from '../../store/reducers';

const SEARCH_PATH = '?pk_campaign=installed';

const mapStateToProps = (state: ProfilesState) => ({
  isOnBoarding: state.router.location.search === SEARCH_PATH
});

export type TriggerWelcomeBulle = () => void;
const mapDispatchToProps = {
  triggerWelcomeBulle: () => push(SEARCH_PATH + '-contributors-list')
};

export default connect(mapStateToProps, mapDispatchToProps);
