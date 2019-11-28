import { compose } from 'redux';
import withConnect from './withConnect';
import ContributorScreen from './ContributorScreen';

export default compose(withConnect)(ContributorScreen);
