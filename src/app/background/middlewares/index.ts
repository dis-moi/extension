import thunk from 'redux-thunk';
import sendFeedback from './sendFeedback';
import analytics from './analytics';
import sagaMiddleware from './saga';
import track from '../../analytics/trackEvents';

export { sagaMiddleware };

export default [thunk, analytics(track), sendFeedback, sagaMiddleware];
