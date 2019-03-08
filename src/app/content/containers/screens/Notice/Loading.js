import { connect } from 'react-redux';
import Loading from '../../../../../components/screens/Loading';
import { close } from '../../../actions/ui';

const mapDispatchToProps = {
  close,
};

export default connect(null, mapDispatchToProps)(Loading);
