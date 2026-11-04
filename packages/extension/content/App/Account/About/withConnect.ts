import { connect } from 'react-redux';
import { getExtensionInstallationDate } from 'app/content/store/selectors';
import { ContentState } from 'app/content/store/reducers';

const version = process.env.APP_VERSION ?? 'unknown';

export interface AboutConnectedProps {
  installationDate?: Date;
  extensionVersion: string;
}

const mapStateToProps = (state: ContentState): AboutConnectedProps => ({
  extensionVersion: version,
  installationDate: getExtensionInstallationDate(state),
});

export default connect(mapStateToProps);
