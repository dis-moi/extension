import { connect } from 'react-redux';
import { removeUITitle, setUITitle } from '../../actions/ui/title';

const mapDispatchToProps = {
  setUITitle,
  removeUITitle
};

export default connect(
  null,
  mapDispatchToProps
);
