import { connect } from 'react-redux';
import { getExtensionInstallationDate } from 'app/content/store/selectors';
import { version } from 'app/../../package.json';
import { ContentState } from 'app/content/store/reducers';

export interface AboutConnectedProps {
  installationDate?: Date;
  extensionVersion: string;
}

const mapStateToProps = (state: ContentState): AboutConnectedProps => ({
  extensionVersion: version,
  installationDate: getExtensionInstallationDate(state)
});

export default connect(mapStateToProps);
