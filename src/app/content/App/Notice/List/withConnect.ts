import { connect } from 'react-redux';
import {
  dismissNotice as dismiss,
  undismissNotice as undismiss,
  confirmDismissNotice as confirmDismiss
} from 'app/actions/notices';
import clickContributor from 'app/content/actions/goToContributor';
import { getNoticesToDisplay } from 'app/content/selectors';
import { ContentState } from 'app/content/store';

const mapStateToProps = (state: ContentState) => ({
  notices: getNoticesToDisplay(state)
});

const mapDispatchToProps = {
  dismiss,
  undismiss,
  confirmDismiss,
  clickContributor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
