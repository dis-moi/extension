import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';

import OptionScreen from './OptionScreen';
import filterActions from '../content/actions/filters';
import uiActions from '../content/actions/ui';

import { IMAGES_URL } from '../constants/assetsUrls';

const {
  selectCriterion,
  unselectCriterion,
  excludeEditor,
  includeEditor
} = filterActions(undefined);

const {
  uninstall
} = uiActions(undefined);


function mapStateToProps(state) {
  return {
    imagesUrl: IMAGES_URL,
    onInstalledDetails: state.get('prefs').get('onInstalledDetails'),
    criteria: state.get('prefs').get('criteria'),
    editors: state.get('prefs').get('editors'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uninstall() { dispatch(uninstall()); },
    selectCriterion(criterion) { dispatch(selectCriterion(criterion)); },
    unselectCriterion(criterion) { dispatch(unselectCriterion(criterion)); },
    excludeEditor(editor) { dispatch(excludeEditor(editor)); },
    includeEditor(editor) { dispatch(includeEditor(editor)); }
  };
}

const Options = connect(mapStateToProps, mapDispatchToProps)(OptionScreen);

const OptionRoot = ({ store, theme }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Options />
    </ThemeProvider>
  </Provider>
);

OptionRoot.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line
  theme: PropTypes.object.isRequired, // eslint-disable-line
};

export default hot(module)(OptionRoot);
