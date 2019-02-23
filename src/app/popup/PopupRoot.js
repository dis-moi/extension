import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';

import PopupScreen from './PopupScreen';
import { openPrefScreen, popupClick } from '../content/actions/ui';

import { IMAGES_URL } from '../constants/assetsUrls';
import {
  PREFERENCE_SCREEN_PANEL_ABOUT,
  PREFERENCE_SCREEN_PANEL_SOURCES,
} from '../constants/ui';

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

const PopupRoot = ({ store, theme }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Popup />
    </ThemeProvider>
  </Provider>
);

PopupRoot.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line
  theme: PropTypes.object.isRequired, // eslint-disable-line
};

export default hot(module)(PopupRoot);
