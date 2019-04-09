import { connect } from 'react-redux';
import { EXTENSION_VERSION } from 'app/constants/ui';
import { close } from 'app/content/actions/ui';
import { getInstallationDate } from 'app/content/selectors';

const mapStateToProps = state => ({
  extensionVersion: EXTENSION_VERSION,
  installationDate: getInstallationDate(state)
});

const mapDispatchToProps = {
  close,
};

export default connect(mapStateToProps, mapDispatchToProps);
