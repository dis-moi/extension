import thunk from 'redux-thunk';
import sagaMiddleware from './saga';

export { sagaMiddleware };

export default [thunk, sagaMiddleware];
