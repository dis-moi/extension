import { connect } from 'react-redux';
import { removeUITitle, setUITitle } from '../../actions/ui/title';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setUITitle,
  removeUITitle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
