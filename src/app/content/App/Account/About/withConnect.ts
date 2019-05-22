import { connect } from 'react-redux';
import { version } from 'app/../../package.json';
import { close } from 'app/actions/ui';
import { removeUITitle, setUITitle } from '../../../actions/ui/title';
import { getExtensionInstallationDate } from 'app/content/selectors';
import { State } from '../../../store';

const mapStateToProps = (state: State) => ({
  extensionVersion: version,
  installationDate: getExtensionInstallationDate(state)
});

const mapDispatchToProps = {
  close,
  setUITitle,
  removeUITitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
