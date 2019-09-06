import { connect } from 'react-redux';
import { optionsRequested } from 'app/actions/options';

const mapDispatchToProps = {
  optionsRequested: optionsRequested
};

export default connect(
  null,
  mapDispatchToProps
);
