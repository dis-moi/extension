import { connect } from 'react-redux';

import Alternative from '../components/Alternatives';
import * as alternativesActions from '../actions/alternatives';

function mapStateToProps(state) {
  return { state: state };
}

const mapDispatchToProps = alternativesActions; // { ...counterActions, ...};

export default connect(mapStateToProps, mapDispatchToProps)(Alternative);
