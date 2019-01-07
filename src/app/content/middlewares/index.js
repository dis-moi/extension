import backgroundPublisher from './backgroundPublisher';
import portCommunication from '../portCommunication';

export default [backgroundPublisher(portCommunication), require('redux-logger').createLogger({ level: 'info', collapsed: true, stateTransformer: state => state.toJS() })];
