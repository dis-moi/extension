import { connect } from 'react-redux';

import PreferenceScreen from '../components/PreferenceScreen';
import uiActions from '../content/actions/ui.js';

import { IMAGES_URL } from '../constants/assetsUrls';
import portCommunication from '../content/portCommunication';

const {
  closePrefScreen,
  reactivateWebsite,
} = uiActions(portCommunication);

function mapStateToProps(state) {
  return {
    imagesUrl: IMAGES_URL,
    preferenceScreenPanel: state.get('preferenceScreenPanel'),
    deactivatedWebsites: state.get('deactivatedWebsites'),
    onInstalledDetails: state.get('onInstalledDetails')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closePrefScreen() { dispatch(closePrefScreen()); },
    onReactivateWebsite(s) { dispatch(reactivateWebsite(s)); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceScreen);
