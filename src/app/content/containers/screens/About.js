import { connect } from 'react-redux';

import About from '../../components/screens/About';
import { close } from '../../actions/ui';
import { EXTENSION_VERSION } from '../../../constants/ui';
import { getInstallationDate } from '../../selectors';

const mapStateToProps = state => ({
  extensionVersion: EXTENSION_VERSION,
  installationDate: getInstallationDate(state)
});

const mapDispatchToProps = {
  close,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
