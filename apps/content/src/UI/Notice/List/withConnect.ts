import { connect } from 'react-redux';
import {
  dismissNotice as dismiss,
  undismissNotice as undismiss,
  confirmDismissNotice as confirmDismiss
} from '../../../../../../libs/store/actions/notices';
import onContributorClick from 'apps/content/src/actions/goToContributor';
import { getNoticesToDisplay } from 'apps/content/src/selectors';
import { ContentState } from 'apps/content/src/store';

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
