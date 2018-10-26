import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import OptionScreen from './OptionScreen';
import filterActions from '../content/actions/filters.js';
import uiActions from '../content/actions/ui.js';

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

const OptionRoot = ({ store }) => (
  <Provider store={store}>
    <Options />
  </Provider>
);

OptionRoot.propTypes = {
  store: PropTypes.object.isRequired
};

export default hot(module)(OptionRoot);


