import { combineReducers } from 'redux';
import offers from './offers';
import alternatives from './alternatives'
import counter from './counter';
import extension from './extension';

export default combineReducers({ counter, extension, offers, alternatives});
