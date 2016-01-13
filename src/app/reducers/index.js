import { combineReducers } from 'redux';
import offers from './offers';
import alternatives from './alternatives'
import counter from './counter';
import extension from './extension';

export default (
  typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id ?
    combineReducers({ counter, offers, alternatives, extension }) :
    combineReducers({ counter, offers, alternatives, })
);
