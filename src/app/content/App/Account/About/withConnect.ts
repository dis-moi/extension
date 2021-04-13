import { connect } from 'react-redux';
import { ContentState } from '../../../store';
import { version } from 'app/../../package.json';
import { getExtensionInstallationDate } from 'app/content/selectors';

export interface AboutConnectedProps {
  installationDate?: Date;
  extensionVersion: string;
}

const mapStateToProps = (state: ContentState): AboutConnectedProps => ({
  extensionVersion: version,
  installationDate: getExtensionInstallationDate(state)
});

export default connect(mapStateToProps);
