import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import PopupScreen from './PopupScreen';
import uiActions from '../content/actions/ui.js';

import { IMAGES_URL } from '../constants/assetsUrls';
import {
  PREFERENCE_SCREEN_PANEL_ABOUT,
  PREFERENCE_SCREEN_PANEL_SOURCES,
} from '../constants/ui';

const {
  openPrefScreen,
  popupClick,
} = uiActions();


function mapStateToProps(state) {
  return {
    imagesUrl: IMAGES_URL,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openPrefScreenAbout() { dispatch(openPrefScreen(PREFERENCE_SCREEN_PANEL_ABOUT)); },
    // FIXME there is no reducer on this action, 'panel' is not used
    openPrefScreenSources() { dispatch(openPrefScreen(PREFERENCE_SCREEN_PANEL_SOURCES)); },
    onClick(target) { dispatch(popupClick(target)); },
  };
}

const Popup = connect(mapStateToProps, mapDispatchToProps)(PopupScreen);

const PopupRoot = ({ store }) => (
  <Provider store={store}>
    <Popup />
  </Provider>
);

PopupRoot.propTypes = {
  store: PropTypes.object.isRequired
};

export default hot(module)(PopupRoot);
