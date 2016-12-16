import { connect } from 'react-redux';

import Recommendations from '../components/Recommendations';
import prepareUIActions from '../content/actions/ui.js';
import prepareRecoActions from '../content/actions/recommendations.js';

import { IMAGES_URL } from '../constants/assetsUrls';
import portCommunication from '../content/portCommunication';

const {
  reduce,
  extend,
  deactivate,
  closePrefScreen,
  openPrefScreen,
  checkOutResource,
  checkOutAlternative,
  checkOutEditor
} = prepareUIActions(portCommunication);

const {
  dismissReco,
  approveReco,
  reportReco
} = prepareRecoActions(portCommunication);

function mapStateToProps(state) {
  return {
    recommendations: state.get('recommendations'),
    imagesUrl: IMAGES_URL,
    reduced: state.get('reduced'),
    preferenceScreenPanel: state.get('preferenceScreenPanel')
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onReduce() { dispatch(reduce()); },
    onExtend() { dispatch(extend()); },
    onDeactivate(details) { dispatch(deactivate(details)); },
    closePrefScreen() { dispatch(closePrefScreen()); },
    openPrefScreen(panel) { dispatch(openPrefScreen(panel)); },
    onCheckOutResource(r) { dispatch(checkOutResource(r)); },
    onCheckOutAlternative(a) { dispatch(checkOutAlternative(a)); },
    onCheckOutEditor(e) { dispatch(checkOutEditor(e)); },
    dismissReco(id) { dispatch(dismissReco(id)); },
    approveReco(id) { dispatch(approveReco(id)); },
    reportReco(id) { dispatch(reportReco(id)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);
