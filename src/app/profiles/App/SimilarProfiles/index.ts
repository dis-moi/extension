import { withRouter } from 'react-router';
import SimilarProfiles from './SimilarProfiles';
import withConnect from './withConnect';

export default withRouter(withConnect(SimilarProfiles));
