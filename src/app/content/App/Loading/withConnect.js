import { connect } from 'react-redux';
import { close } from '../../actions/ui';

const mapDispatchToProps = {
  close,
};

export default connect(null, mapDispatchToProps);
