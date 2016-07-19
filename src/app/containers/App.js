import { connect } from 'react-redux';

import Alternative from '../components/Alternatives';
import { reduce, extend, deactivate } from '../content/actions/ui.js';

import { IMAGES_URL } from 'app/constants/assetsUrls';
import portCommunication from 'app/content/portCommunication';


function mapStateToProps(state) {
  return {
    recommendation: state.get('alternative') && state.alternative.matchingOffers[0].recommendation,
    imagesUrl: IMAGES_URL,
    reduced: state.get('reduced')
  };
}
function mapDispatchToProps(dispatch){
  return {
    onReduce(){ dispatch(reduce()) },
    onExtend(){ dispatch(extend()) },
    onDeactivate(details){ dispatch(deactivate(portCommunication)(details)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alternative);
