import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { ContentState } from 'apps/content/src/store';
import { getQuestion } from 'apps/content/src/store/selectors';
import { close } from '../../../../../../libs/store/actions/ui';
import { submitContribution } from '../../../../../../libs/store/actions/contribution';

const mapDispatchToProps = {
  close,
  modify: goBack,
  publish: submitContribution
};

export default connect(
  (state: ContentState) => ({
    question: getQuestion(state)
  }),
  mapDispatchToProps
);
