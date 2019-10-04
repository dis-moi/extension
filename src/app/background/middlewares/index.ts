import thunk from 'redux-thunk';
import sendFeedback from './sendFeedback';
import sagaMiddleware from './saga';

export { sagaMiddleware };

export default [thunk, sendFeedback, sagaMiddleware];
