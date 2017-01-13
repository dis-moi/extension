import { connect } from 'react-redux';

import PreferenceScreen from '../components/PreferenceScreen';
import uiActions from '../content/actions/ui.js';
import filterActions from '../content/actions/filters.js';

import { IMAGES_URL } from '../constants/assetsUrls';
import portCommunication from '../content/portCommunication';

const {
  selectCriterion,
  unselectCriterion,
  excludeEditor,
  includeEditor
} = filterActions(portCommunication);

const {
  closePrefScreen,
  openPrefScreen,
  uninstall,
} = uiActions(portCommunication);

function mapStateToProps(state) {
  return {
    imagesUrl: IMAGES_URL,
    preferenceScreenPanel: state.get('preferenceScreenPanel'),
    onInstalledDetails: state.get('onInstalledDetails'),
    criteria: state.get('criteria'),
    editors: state.get('editors'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openPrefScreen(panel) { dispatch(openPrefScreen(panel)); },
    closePrefScreen() { dispatch(closePrefScreen()); },
    uninstall() { dispatch(uninstall()); },
    selectCriterion(criterion) { dispatch(selectCriterion(criterion)); },
    unselectCriterion(criterion) { dispatch(unselectCriterion(criterion)); },
    excludeEditor(editor) { dispatch(excludeEditor(editor)); },
    includeEditor(editor) { dispatch(includeEditor(editor)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceScreen);