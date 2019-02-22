import { connect } from 'react-redux';

import Recommendations from '../components/Recommendations';
import {
  reduce,
  extend,
  deactivate,
  closePrefScreen,
  openPrefScreen,
  checkOutResourceButton,
  checkOutResourceLink,
  checkOutAlternative,
  checkOutEditor
} from '../actions/ui';
import { IMAGES_URL } from '../../constants/assetsUrls';
import { getNotices } from '../selectors';

function mapStateToProps(state) {
  return {
    recommendations: getNotices(state),
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
    onCheckOutResourceButton(r) { dispatch(checkOutResourceButton(r)); },
    onCheckOutResourceLink(r) { dispatch(checkOutResourceLink(r)); },
    onCheckOutAlternative(a) { dispatch(checkOutAlternative(a)); },
    onCheckOutEditor(e) { dispatch(checkOutEditor(e)); },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Recommendations);
