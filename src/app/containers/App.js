import { connect } from 'react-redux';

import Alternative from '../components/Alternatives';
import uiActions from '../content/actions/ui.js';

import { IMAGES_URL, CONTRIBUTOR_IMAGES_URL } from '../constants/assetsUrls';
import portCommunication from 'app/content/portCommunication';

const { reduce, extend, deactivate, togglePrefPanel, reactivateWebsite } = uiActions(portCommunication);

function mapStateToProps(state) {
  return {
    recommendation: state.get('alternative') && state.alternative.matchingOffers[0].recommendation,
    imagesUrl: IMAGES_URL,
    contributorUrl: CONTRIBUTOR_IMAGES_URL,
    reduced: state.get('reduced'),
    preferencePanelOpen: state.get('preferencePanelOpen'),
    deactivatedWebsites: state.get('deactivatedWebsites')
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onReduce(){ dispatch(reduce()) },
    onExtend(){ dispatch(extend()) },
    onDeactivate(details){ dispatch(deactivate(details)) },
    togglePrefPanel(){ dispatch(togglePrefPanel()) },
    onReactivateWebsite(s){
      dispatch(reactivateWebsite(s))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alternative);
