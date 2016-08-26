import { connect } from 'react-redux';

import Alternative from '../components/Alternatives';
import uiActions from '../content/actions/ui.js';

import { IMAGES_URL, CONTRIBUTOR_IMAGES_URL } from '../constants/assetsUrls';
import portCommunication from '../content/portCommunication';

const {
  reduce, extend, deactivate, closePrefScreen, openPrefScreen, reactivateWebsite
} = uiActions(portCommunication);

function mapStateToProps(state) {
  return {
    recommendations: state.get('recommendations'),
    imagesUrl: IMAGES_URL,
    reduced: state.get('reduced'),
    preferenceScreenPanel: state.get('preferenceScreenPanel'),
    deactivatedWebsites: state.get('deactivatedWebsites'),
    onInstalledDetails: state.get('onInstalledDetails')
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onReduce(){ dispatch(reduce()); },
    onExtend(){ dispatch(extend()); },
    onDeactivate(details){ dispatch(deactivate(details)); },
    closePrefScreen(){ dispatch(closePrefScreen()); },
    openPrefScreen(panel){ dispatch(openPrefScreen(panel)); },
    onReactivateWebsite(s){
      dispatch(reactivateWebsite(s));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alternative);
