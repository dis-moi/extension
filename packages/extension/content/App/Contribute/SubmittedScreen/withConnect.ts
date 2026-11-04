import { connect } from 'react-redux';
import { replace } from 'libs/store/router';
import { close } from 'libs/store/actions/ui';

const mapDispatchToProps = {
  close,
  goBack: () => replace('/'),
};

export default connect(null, mapDispatchToProps);
