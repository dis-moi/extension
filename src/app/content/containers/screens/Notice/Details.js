import { connect } from 'react-redux';

import Details from '../../../components/screens/Notice/Details';
import { getNoticeById } from '../../../selectors';
import { approveReco, unapproveReco } from '../../../actions/recommendations';
import { close } from '../../../actions/ui';

const mapStateToProps = (state, props) => ({
  notice: getNoticeById(state, props),
});

const mapDispatchToProps = {
  approve: approveReco,
  disapprove: unapproveReco,
  close,
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
