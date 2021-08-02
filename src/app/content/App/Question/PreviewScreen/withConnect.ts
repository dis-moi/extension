import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { getQuestion } from 'app/content/store/selectors';
import { ContentState } from 'app/content/store/reducers';
import { close } from 'libs/store/actions/ui';
import { submitContribution } from 'libs/store/actions/contribution';

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
