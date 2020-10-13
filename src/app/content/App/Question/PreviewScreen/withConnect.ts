import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { ContentState } from 'app/content/store';
import { getQuestion } from 'app/content/selectors';
import { close } from 'app/actions/ui';
import { submitQuestion } from 'app/actions/question';

const mapDispatchToProps = {
  close,
  modify: goBack,
  publish: submitQuestion
};

export default connect(
  (state: ContentState) => ({
    question: getQuestion(state)
  }),
  mapDispatchToProps
);
