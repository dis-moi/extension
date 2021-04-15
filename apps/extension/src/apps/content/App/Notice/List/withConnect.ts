import { connect } from 'react-redux';
import {
  dismissNotice as dismiss,
  undismissNotice as undismiss,
  confirmDismissNotice as confirmDismiss
} from '../../../../../../../../libs/store/actions/notices';
import onContributorClick from 'apps/extension/src/apps/content/actions/goToContributor';
import { getNoticesToDisplay } from 'apps/extension/src/apps/content/selectors';
import { ContentState } from 'apps/extension/src/apps/content/store';

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
