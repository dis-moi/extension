import { connect } from 'react-redux';

import About from '../../../../components/screens/Help';
import { close } from '../../actions/ui';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  close,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
