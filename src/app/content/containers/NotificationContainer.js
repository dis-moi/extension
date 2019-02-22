import { connect } from 'react-redux';

import { isOpen } from '../selectors';
import { NotificationContainer } from '../../../components/atoms';

const mapStateToProps = state => ({
  open: isOpen(state),
});

export default connect(mapStateToProps)(NotificationContainer);
