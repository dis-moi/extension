import { connect } from 'react-redux';
import { getNoticesToDisplay } from 'app/content/store/selectors';
import {
  dismissNotice as dismiss,
  undismissNotice as undismiss,
  confirmDismissNotice as confirmDismiss
} from 'libs/store/actions/notices';
import onContributorClick from 'app/content/store/actions/goToContributor';
import { ContentState } from 'app/content/store/reducers';

const mapStateToProps = (state: ContentState) => ({
  notices: getNoticesToDisplay(state)
});

const mapDispatchToProps = {
  dismiss,
  undismiss,
  confirmDismiss,
  onContributorClick
};

export default connect(mapStateToProps, mapDispatchToProps);
