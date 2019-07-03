import { connect } from 'react-redux';
import { settingsRequested } from 'app/actions/settings';

const mapDispatchToProps = {
  settingsRequested
};

export default connect(
  null,
  mapDispatchToProps
);
