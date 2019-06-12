import { connect } from 'react-redux';
import { version } from 'app/../../package.json';
import { getExtensionInstallationDate } from 'app/content/selectors';
import { State } from '../../../store';

export interface AboutConnectedProps {
  installationDate?: Date;
  extensionVersion: string;
}

const mapStateToProps = (state: State): AboutConnectedProps => ({
  extensionVersion: version,
  installationDate: getExtensionInstallationDate(state)
});

export default connect(mapStateToProps);
