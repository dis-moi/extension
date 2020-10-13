import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { change } from 'redux-form';
import { ContentState } from 'app/content/store';
import { getFlatFormErrors } from 'app/content/selectors';
import { form } from './withReduxForm';
import { getContributors } from 'app/store/selectors/contributors.selectors';

export default connect(
  (state: ContentState) => ({
    errors: getFlatFormErrors(form)(state),
    contributors: getContributors(state)
  }),
  {
    onUrlChange: (url: string) => change('question', 'url', url),
    onSubmit: () => push('/question/preview')
  }
);
