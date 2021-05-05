import { compose } from 'redux';
import withTitle from './withTitle';
import withConnect from './withConnect';
import PreviewScreen from './PreviewScreen';

export default compose(withConnect, withTitle)(PreviewScreen);
