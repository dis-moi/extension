import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import { close } from '../../../../../../../../libs/store/actions/ui';

const mapDispatchToProps = {
  close,
  goBack: () => replace('/')
};

export default connect(null, mapDispatchToProps);
